import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, "schema.sql");

const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema);
const insertConfig = db.prepare(`
    INSERT OR IGNORE INTO config (key, value)
    VALUES (?, ?)
`);

insertConfig.run("maxRetries", "3");
insertConfig.run("pollInterval", "1000");
insertConfig.run("backoffBase", "2");

console.log("✅ Database initialized.");