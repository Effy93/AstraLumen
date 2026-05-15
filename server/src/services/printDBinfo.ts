import type { RowDataPacket } from "mysql2";
import { db } from "../db.ts";
import dotenv from "dotenv";
dotenv.config();

export async function printDBInfo() {
    // 🎨 couleurs ANSI simples
const color = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  purple: "\x1b[35m",
  bold: "\x1b[1m",
};
    try {
        await db.query("SELECT 1");
        console.log(`${color.green}🟢 MySQL connecté et opérationnel${color.reset}`);

        // DB active
        const [dbName] = await db.query<RowDataPacket[]>("SELECT DATABASE() AS db");
        const dbActive = (dbName as any[])[0]?.db;
         console.log(
            `${color.yellow}📁 DB_NAME : ${color.bold}${dbActive}${color.reset}`
        );

           // PORT (SQL version)
        const [portRows] = await db.query<RowDataPacket[]>(
      "SHOW VARIABLES LIKE 'port'",
    );
    const dbPort = portRows[0]?.Value;

        // user
        const [userResult] = await db.query<RowDataPacket[]>("SELECT USER() AS user");
        const dbUser = (userResult as any[])[0]?.user;
        console.log(
            `${color.purple} → 🌐 DB_USER : ${color.bold}${color.purple}${dbUser}${color.reset}${color.green}:${dbPort}${color.reset}`
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