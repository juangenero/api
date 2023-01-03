import { getAllVaccinesDB, getVaccineByIdDB, editVaccineDB } from "../models/vaccines.model.js";

export async function getAllVaccines(req, res) {
  const vaccines = await getAllVaccinesDB(); // Método del modelo
  if (vaccines) {
    res.json(vaccines); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

export async function getVaccineById(req, res) {
  const vaccine = await getVaccineByIdDB(req.params.id);

  // Si ha devuelvo alguna vacuna..
  if (vaccine) res.json(vaccine);
  // Si no ha devuelto ninguna vacuna..
  else {
    // Si no se ha encontrado la vacuna
    if (vaccine === false) res.json({ error: "Vacuna no encontrada" });
    // Si ha habido algún error en la consulta
    else res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  }
}

export async function editVaccine(req, res) {
  const result = await editVaccineDB(req.body);

  if (result === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else if (result.error) {
    res.json(result);
  } else {
    res.json(result);
  }
}
