import { Router } from "express";
import { db } from "./db.ts";
import type { RowDataPacket } from "mysql2";
import ArticleController from "./controllers/article.controller.ts";

const router = Router();

// route de test
router.get("/health", async (req, res) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT 1 AS result");

    // Vérification que rows[0] existe
    const firstRow = rows[0];
    if (!firstRow) {
      return res.status(500).json({ success: false, error: "No rows returned" });
    }

    res.json({ success: true, result: firstRow.result });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

// ARTICLES
router.get("/articles", ArticleController.browse);
router.get("/articles/:id", ArticleController.readOne);
router.post("/articles", ArticleController.add);
router.patch("/articles/:id", ArticleController.modify);
router.delete("/articles/:id", ArticleController.remove);

export default router;