import { getAllVaccinesDB } from "../models/vaccines.model.js";

export async function getAllVaccines(req, res) {
  const vaccines = await getAllVaccinesDB(); // Método del modelo
  if (vaccines) {
    res.json(vaccines); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}
