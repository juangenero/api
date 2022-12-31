import { connection } from "../configs/db.js";

export async function getAllVaccinesDB() {
  try {
    const [rows] = await connection.query("SELECT * from VACUNAS");
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
