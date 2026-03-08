import { db } from "../db.ts";
import type  IUser from "../models/IUser.ts";

export default class UserRepository {

    static async create(user: IUser) {
        try {
            const row = await db.query("INSERT INTO user (name, email, password, created_at) VALUES(?,?,?,?) ",
            [user.name, user.email, user.password, user.createdAt]
        );
            return row
        } catch (error)
        {
            return error
        }
     
    }
    static async readAll() {
        try {
            const [rows] = await db.query("SELECT * FROM user");
            return rows
        } catch (error) {
            
        }
    }
    static async getUserByEmail(email: string) {
        try {
            const [rows] = await db.query("SELECT * FROM user WHERE email=?",
                [email]
            );
            return rows
        }
        catch(error) {
            return error

        }
    }
}