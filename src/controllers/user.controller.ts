import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository.ts";
import type IUser from "../models/IUser.ts";

export default class UserController {
    static async create(req: Request, res: Response) {
        try {
            const {name, password, email, createdAt} = req.body;
            // verifier si le corps de le requete (req.body) nest pas vide
            if(!name || !email || !password) {
                console.log("Champs manquants")
                return res.status(404).json()
            }

            // Verifier si l'utilisateur n'existe pas déjà (via l'email)
            const [user] = await UserRepository.getUserByEmail(req.body.email) as IUser[]    // recupère l'email
            // Si l'oject a la clé user VIDE alors c'est que l'utilisateur n'existe pas
            if (user && Object.keys(user).length !== 0) {
                return res.status(401).json({message: "Email déjà utilisé"})
            }
            // hasher le MDP
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser: Omit<IUser, "id"> = {
                name,
                email,
                password: hashedPassword,
                createdAt: Date.now()
            };
            const insertId = await UserRepository.create(newUser)
            res.status(201).json({message: "Utilisateur créer"})
        }
        catch(error) {
            res.status(500).json({message: "erreur serveur"})

        }
    }
    static async browse(req: Request, res: Response) {
        try {
            const users = await UserRepository.readAll();
            return res.json(users)
        } catch (error) {
            
        }
    }
}