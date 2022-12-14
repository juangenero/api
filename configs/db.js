import {createPool} from 'mysql2/promise'
import "./env.js";

// CreatePool mantiene las conexiones abiertas para que sean reutilizadas y las cierra automáticamente cuando llevan un tiempo determinado sin ser usadas.
export const conexion = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})