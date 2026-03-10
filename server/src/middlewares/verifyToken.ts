import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";

dotenv.config()

export const verifyToken = async (req: Request, res: Response, Next: NextFunction) => {
    try {
        const token = req.cookies.access_token
        if(!token) {
            return res.status(401).json({message: "Action non autorisée"})
        }
    } catch (error) {
        
    }
} 