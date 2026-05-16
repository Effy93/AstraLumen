import { db } from "../db";
import type  IUser from "../models/IUser";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export default class UserRepository {

    static async create(user: IUser) {
        try {
            const row = await db.query<ResultSetHeader>("INSERT INTO user (name, email, password, created_at) VALUES(?,?,?,?) ",
            [user.name, user.email, user.password, user.createdAt]
        );
            return row[0].insertId
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
    static async getUserByEmail(email: string): Promise<IUser[]> { // <-- retourne IUser[]
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM user WHERE email=?",
            [email]
        );
        return rows as IUser[];
    } catch (error) {
        console.error(error);
        return [];
    }
    }
}