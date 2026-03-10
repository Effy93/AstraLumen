import { Router } from "express";

import ArticleController from "./controllers/article.controller.ts";
import UserController  from "./controllers/user.controller.ts";
import AuthController from "./controllers/auth.controller.ts";

const router = Router();


// ARTICLES
router.get("/articles", ArticleController.browse);
router.get("/articles/:id", ArticleController.readOne);
router.post("/articles", ArticleController.add);
router.patch("/articles/:id", ArticleController.modify);
router.delete("/articles/:id", ArticleController.remove);


// USER
router.get("/users", UserController.browse);
router.post("/users", UserController.create);
router.post("/login", AuthController.login);

export default router;