import { getAllPetsDB, getPetByIdDB, getPetsOfUserDB } from "../models/pets.model.js";

export async function getAllPets(req, res) {
  const pets = await getAllPetsDB(); // Método del modelo
  if (pets) {
    res.json(pets); // Si la consulta se ha ejecutado correctamente, devuelve las mascotas
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

export async function getPetsOfUser(req, res) {
  const pets = await getPetsOfUserDB(req.params.idUser);

  if (pets === null) res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
  else if (!pets) res.json({ error: "No existen mascotas para este usuario." });
  else res.json(pets);
}

export async function getPetById(req, res) {
  const pet = await getPetByIdDB(req.params.idPet);

  if (pet === null) res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
  else if (!pet) res.json({ error: "Mascota no encontrada." });
  else res.json(pet);
}
