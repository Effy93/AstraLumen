import mysql2 from "mysql2/promise";
import type {Pool, PoolOptions} from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const config: PoolOptions = {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 4001
}
export const db: Pool = mysql2.createPool(config);

