import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db";
import type { IArticle } from "../models/IArticle";

export class ArticleRepository {
  // Convertir le createdAt en ISO en tenant compte des différents formats possibles
  private formatArticle(row: any): IArticle {
    const rawCreatedAt = row.created_at;
    let date: Date;

    if (rawCreatedAt instanceof Date) {
      date = rawCreatedAt;
    } else if (typeof rawCreatedAt === "bigint") {
      date = new Date(Number(rawCreatedAt) * 1000);
    } else if (typeof rawCreatedAt === "number") {
      date = new Date(rawCreatedAt > 1_000_000_000_000 ? rawCreatedAt : rawCreatedAt * 1000);
    } else if (typeof rawCreatedAt === "string") {
      const parsed = Date.parse(rawCreatedAt);
      if (!isNaN(parsed)) {
        date = new Date(parsed);
      } else {
        const num = Number(rawCreatedAt);
        date = new Date(num > 1_000_000_000_000 ? num : num * 1000);
      }
    } else {
      date = new Date(rawCreatedAt);
    }

    return {
      id: row.id,
      title: row.title,
      content: row.content,
      createdAt: date.toISOString(),
      userId: row.user_id,
    };
  }

  // Lire tous les articles (non paginés)
  async read(): Promise<IArticle[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM article");
    return (rows as any[]).map(row => this.formatArticle(row));
  }

  // Lire un article par ID
  async readById(id: number): Promise<IArticle | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM article WHERE id = ?", [id]);
    const row = (rows as any[])[0];
    return row ? this.formatArticle(row) : null;
  }

  // Pagination : 1 article par page pour un utilisateur donné
  async readByUserPaginated(userId: number, page = 1, limit = 1): Promise<{ article: IArticle | null; totalPages: number }> {
    const offset = (page - 1) * limit;
    
    // Récupérer le nombre total d'articles
    const [countRows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM article WHERE user_id = ?",
      [userId]
    );
    const totalArticles = (countRows as any[])[0]?.total || 0;
    const totalPages = Math.ceil(totalArticles / limit);
    
    // Récupérer l'article de la page
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM article WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [userId, limit, offset]
    );
    const row = (rows as any[])[0];
    const article = row ? this.formatArticle(row) : null;
    
    return { article, totalPages };
  }

  // Créer un article
  async create(article: Omit<IArticle, "id" | "createdAt">): Promise<number> {
    const { title, content, userId } = article;
    const [result] = await db.query<ResultSetHeader>("INSERT INTO article (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, userId]
    );
    return result.insertId;
  }

  // Mettre à jour un article
  async update(id: number, article: Partial<Omit<IArticle, "id">>): Promise<void> {
    const fields = Object.keys(article)
      .map(key => `${key.replace(/[A-Z]/g, m => "_" + m.toLowerCase())} = ?`)
      .join(", ");
    const values = Object.values(article);
    if (!fields) return;
    await db.query(`UPDATE article SET ${fields} WHERE id = ?`, [...values, id]);
  }

  // Supprimer un article
  async delete(id: number): Promise<void> {
    await db.query("DELETE FROM article WHERE id = ?", [id]);
  }
}