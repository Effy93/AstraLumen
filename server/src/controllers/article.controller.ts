import type { Request, Response } from "express";
import { ArticleRepository } from "../repositories/ArticleRepository.ts";
import type { AuthRequest } from "../middlewares/verifyToken.ts";
import type { IArticle } from "../models/IArticle.ts";

const articleRepo = new ArticleRepository();

class ArticleController {
  // Récupère tous les articles (non paginés)
  async browse(req: Request, res: Response): Promise<void> {
    try {
      const articles = await articleRepo.read();
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  // Récupère un article par ID
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

// Pagination : 1 article par page pour l'utilisateur connecté
async readOnePaginated(req: AuthRequest, res: Response): Promise<void> {
  try {
    // Forcer userId en number
    const userId = Number(req.user?.id);
    if (!userId) {
      res.status(401).json({ message: "Non autorisé" });
      return;
    }

    // Récupérer le paramètre page et le convertir en nombre
    const pageParam = req.query.page;
    const page = pageParam ? parseInt(pageParam as string, 10) : 1;

    if (isNaN(page) || page < 1) {
      res.status(400).json({ message: "Numéro de page invalide" });
      return;
    }

    // Appel du repo
    const article = await articleRepo.readByUserPaginated(userId, page, 1);

    if (!article) {
      res.status(404).json({ message: "Aucun article trouvé pour cette page" });
      return;
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

  // Ajouter un article
  async add(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId)  res.status(401).json({ message: "Non autorisé" });

      const article: Omit<IArticle, "id"> = { ...req.body, userId };
      const insertId = await articleRepo.create(article);
      res.status(201).json({ id: insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  // Modifier un article
  async modify(req: AuthRequest, res: Response): Promise<void> {
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

  // Supprimer un article
  async remove(req: AuthRequest, res: Response): Promise<void> {
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