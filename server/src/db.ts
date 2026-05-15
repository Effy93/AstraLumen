import mysql2 from "mysql2/promise";
import type { Pool, PoolOptions } from "mysql2/promise";
import type { RowDataPacket } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const config: PoolOptions = {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
};

export const db: Pool = mysql2.createPool(config);


// fonction debug
export async function printDatabaseInfo() {
    // 🎨 couleurs ANSI simples
        const color = {
        reset: "\x1b[0m",
        green: "\x1b[32m",
        blue: "\x1b[34m",
        cyan: "\x1b[36m",
        yellow: "\x1b[33m",
        red: "\x1b[31m",
        bold: "\x1b[1m"
        };
    try {
        await db.query("SELECT 1");
        console.log(`${color.green}🟢 MySQL connecté et opérationnel${color.reset}`);

        // DB active
        const [dbName] = await db.query<RowDataPacket[]>("SELECT DATABASE() AS db");
        const dbActive = (dbName as any[])[0]?.db;
         console.log(
            `${color.yellow}📁 DB active : ${color.bold}${dbActive}${color.reset}`
        );

        // user
        const [userResult] = await db.query<RowDataPacket[]>("SELECT USER() AS user");
        const dbUser = (userResult as any[])[0]?.user;
        console.log(
            `${color.cyan} → 🌐 Utilisateur : ${color.bold}${dbUser}${color.reset}${color.blue}:${config.port}${color.reset}`
        );

        // tables
        const [tables] = await db.query<RowDataPacket[]>("SHOW TABLES");
        const tableList = tables as any[];

        console.log(
            `${color.cyan}📦 Tables disponibles (${tableList.length}) :${color.reset}`
        );

        console.table(tableList);

    } catch (err) {
        console.error(`${color.red}❌ Erreur connexion DB :${color.reset}`, err);
    }
}