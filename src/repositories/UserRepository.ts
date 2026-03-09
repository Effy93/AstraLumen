import { db } from "../db.ts";
import type  IUser from "../models/IUser.ts";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export default class UserRepository {

    static async create(user: IUser) {
        try {
            const row = await db.query<ResultSetHeader>("INSERT INTO user (name, email, password, created_at) VALUES(?,?,?,?) ",
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
            const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM user");
            return rows
        } catch (error) {
            
        }
    }
    static async getUserByEmail(email: string) {
        try {
            const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM user WHERE email=?",
                [email]
            );
            return rows
        }
        catch(error) {
            return error

        }
    }
}