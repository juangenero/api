import { getAllPetsDB } from "../models/pets.model.js";

export async function getAllPets(req, res) {
  const pets = await getAllPetsDB(); // Método del modelo
  if (pets) {
    res.json(pets); // Si la consulta se ha ejecutado correctamente, devuelve las mascotas
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}
