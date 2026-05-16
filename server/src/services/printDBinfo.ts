import type { RowDataPacket } from "mysql2/promise";
import { db } from "../db";

const DB_CONFIG = {
  previewLimit: 5,
};

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

const icon = {
  user: "👤",
  relation: "🔗",
  default: "📦",
};

const getIcon = (table: string) => {
  if (table === "user") return icon.user;
  if (table.includes("_")) return icon.relation;
  return icon.default;
};

/**
 * ✂️ TRONCAGE DES TEXTES LONGS POUR console.table
 */
const sanitizeRows = (rows: any[], max = 80) => {
  return rows.map((row) => {
    const newRow: any = {};

    for (const key in row) {
      const value = row[key];

      if (typeof value === "string" && value.length > max) {
        newRow[key] = value.slice(0, max) + "...";
      } else {
        newRow[key] = value;
      }
    }

    return newRow;
  });
};

const queryPreview = async (table: string) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM \`${table}\` LIMIT ${DB_CONFIG.previewLimit}`,
    );
    return rows;
  } catch {
    return [];
  }
};

const getTables = async () => {
  const [rows] = await db.query<RowDataPacket[]>("SHOW TABLES");
  return rows.map((r) => Object.values(r)[0] as string);
};

/**
 * =========================
 * 📊 MAIN DASHBOARD
 * =========================
 */
export async function printDBInfo() {
  try {
    await db.query("SELECT 1");

    console.log(`${color.green}🟢 MySQL connecté${color.reset}`);

    // =========================
    // 📁 DB NAME
    // =========================

    const [dbRows] = await db.query<RowDataPacket[]>(
      "SELECT DATABASE() AS db",
    );

    console.log(
      `${color.yellow}📁 DB : ${color.bold}${dbRows[0]?.db}${color.reset}`,
    );

    // =========================
    // 👤 USER + HOST + PORT
    // =========================

    const [userRows] = await db.query<RowDataPacket[]>(
      "SELECT USER() AS user",
    );

    const [portRows] = await db.query<RowDataPacket[]>(
      "SHOW VARIABLES LIKE 'port'",
    );

    const rawUser = userRows[0]?.user ?? "";
    const port = portRows[0]?.Value ?? "";

    const [user, host] = rawUser.split("@");

    console.log(
      `${color.purple}👤 ${user}${color.reset}@${color.cyan}${host}${color.reset}:${color.green}${port}${color.reset}`,
    );

    // =========================
    // 📦 TABLES
    // =========================

    const tables = await getTables();

    console.log(
      `\n${color.cyan}📦 Tables détectées (${tables.length})${color.reset}`,
    );

    // =========================
    // 🔥 DISPLAY TABLES
    // =========================

    for (const table of tables) {
      const rows = await queryPreview(table);

      const iconTable = getIcon(table);

      const labelColor =
        table === "user"
          ? color.blue
          : table.includes("_")
          ? color.purple
          : color.blue;

      console.log(
        `${labelColor}${iconTable} ${table}${color.reset}`,
      );

      if (rows.length) {
        console.table(sanitizeRows(rows));
      } else {
        console.log(`${color.yellow}  (empty)${color.reset}`);
      }
    }
  } catch (err) {
    console.error(`${color.red}❌ DB error${color.reset}`, err);
  }
}