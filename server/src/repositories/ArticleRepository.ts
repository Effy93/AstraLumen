import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db.ts";
import type { IArticle } from "../models/IArticle.ts";

export class ArticleRepository {
  // Lire tous les articles (non paginés)
  async read(): Promise<IArticle[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM article");
    return rows as IArticle[];
  }

  // Lire un article par ID
  async readById(id: number): Promise<IArticle | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM article WHERE id = ?", [id]);
    return (rows as IArticle[])[0] || null;
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
    const article = (rows as IArticle[])[0] || null;
    
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