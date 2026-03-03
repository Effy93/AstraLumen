import type { ResultSetHeader } from "mysql2";
import { db } from "../db.ts";
import type { IArticle } from "../models/IArticle.ts";

export class ArticleRepository {
  async read(): Promise<IArticle[]> {
    const [rows] = await db.query("SELECT * FROM article");
    return rows as IArticle[];
  }

  async readById(id: number): Promise<IArticle | null> {
    const [rows] = await db.query("SELECT * FROM article WHERE id = ?", [id]);
    return (rows as IArticle[])[0] || null;
  }

  async create(article: Omit<IArticle, "id">): Promise<number> {
    const { title, content, createdAt, userId } = article;
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO article (title, content, created_at, user_id) VALUES (?, ?, ?, ?)",
      [title, content, createdAt, userId]
    );
    return result.insertId;
  }

  async update(id: number, article: Partial<Omit<IArticle, "id">>): Promise<void> {
    const fields = Object.keys(article).map(key => `${key.replace(/[A-Z]/g, m => "_" + m.toLowerCase())} = ?`).join(", ");
    const values = Object.values(article);
    if (!fields) return;
    await db.query(
      `UPDATE article SET ${fields} WHERE id = ?`,
      [...values, id]
    );
  }

  // Supprimer un article
  async delete(id: number): Promise<void> {
    await db.query("DELETE FROM article WHERE id = ?", [id]);
  }
}