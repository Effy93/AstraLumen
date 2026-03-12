import { Router } from "express";

import ArticleController from "./controllers/article.controller.ts";
import UserController  from "./controllers/user.controller.ts";
import AuthController from "./controllers/auth.controller.ts";
import { verifyToken } from "./middlewares/verifyToken.ts";

const router = Router();

// Route privées avant routes publiques
// ARTICLES 
router.get("/articles/me", verifyToken, ArticleController.readOnePaginated);

// CRUD ARTICLES
router.get("/articles", ArticleController.browse);
router.get("/articles/:id", ArticleController.readOne);
router.post("/articles", ArticleController.add);
router.patch("/articles/:id", ArticleController.modify);
router.delete("/articles/:id", ArticleController.remove);


// USER
router.get("/users", UserController.browse);
router.post("/users", UserController.create);

// LOGIN // PROFILE // LOGOUT
router.post("/login", AuthController.login);
router.get("/me", verifyToken, AuthController.me);
// router.post("/logout", AuthController.logout);


// LOGOUT
// router.post("/logout", (req, res) => {
//   res.clearCookie("access_token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // si HTTPS
//     sameSite: "lax",
//   });
//   res.status(200).json({ message: "Déconnexion réussie" });
// });
export default router;