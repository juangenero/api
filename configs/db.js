import { createPool } from "mysql2/promise";
import "./env.js";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "juan";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || "pet_doctor";

console.log("Config DB: "+ DB_HOST + ":" + DB_PORT + "@" + DB_USER + ":" + DB_PASSWORD + "~" + DB_NAME);

// CreatePool mantiene las conexiones abiertas para que sean reutilizadas y las cierra automáticamente cuando llevan un tiempo determinado sin ser usadas.
export const conexion = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
});
