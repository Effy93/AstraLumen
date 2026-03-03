import type { Request, Response } from "express";
import { ArticleRepository } from "../repositories/ArticleRepository.ts";
import type { IArticle } from "../models/IArticle.ts";

const articleRepo = new ArticleRepository();

class ArticleController {
  async browse(req: Request, res: Response): Promise<void> {
    try {
      const articles = await articleRepo.read();
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async readOne(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const article = await articleRepo.readById(id);

      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }

      res.json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async add(req: Request, res: Response): Promise<void> {
    try {
      const article: Omit<IArticle, "id"> = req.body;
      const insertId = await articleRepo.create(article);
      res.status(201).json({ id: insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async modify(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updates: Partial<Omit<IArticle, "id">> = req.body;

      await articleRepo.update(id, updates);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await articleRepo.delete(id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new ArticleController();