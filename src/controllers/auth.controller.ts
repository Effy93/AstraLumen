import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Response, Request } from "express";
import type IUser from "../models/IUser.ts";
import UserRepository from "../repositories/UserRepository.ts";

dotenv.config();

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Vérification si les données sont présentes
      if (!email || !password) {
        return res.status(400).json({ message: "Identifiants requis" });
      }

      // Vérifier si l'email existe
      const userExist = await UserRepository.getUserByEmail(email) as IUser[];

      // Si aucun utilisateur trouvé
      if (!userExist[0]) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }

      // Comparer le mot de passe saisi avec le hash en DB
      const comparedPassword = await bcrypt.compare(
        password,                         
        userExist[0] ? userExist[0].password : "null" 
      );

      if (!comparedPassword) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }

      // Création du token JWT
      const token = jwt.sign(
        {
          user_id: userExist[0] ? userExist[0].id : null,
          user_email: userExist[0] ? userExist[0].email : null,
          role: "user"
        },
        process.env.SECRET_KEY || "secretKey",
        { expiresIn: "8h" }
      );

      // Stockage du token dans les cookies
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });

      return res.status(200).json({ message: "Connexion réussie" });

    } catch (error) {
      console.log("Erreur login :>>", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
}