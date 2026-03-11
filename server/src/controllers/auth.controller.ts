import bcrypt from "bcrypt";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import type { AuthRequest } from "../middlewares/verifyToken.ts";
import UserRepository from "../repositories/UserRepository.ts";

dotenv.config();

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Identifiants requis" });
      return;
    }

    const users = await UserRepository.getUserByEmail(email);
    const user = users[0];

    if (!user) {
      res.status(401).json({ message: "Identifiants non valides" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ message: "Identifiants non valides" });
      return;
    }

    // Token = carte d'identité
    const token = jwt.sign(
      { user_id: user.id, user_email: user.email, role: "user" },
      process.env.SECRET_KEY || "defaultsecret123!",
      { expiresIn: "8h" },
    );

    // cookie = stockage des infos du token
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000), // 8h
    });
    res.status(200).json({ message: "Connexion réussie" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const me = (req: AuthRequest, res: Response) => {
  res.status(200).json(req.user);
};


const authController = { login, me };

export default authController;
