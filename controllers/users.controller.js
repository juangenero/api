import {
  getAllUsersDB,
  getUserByIdDB,
  editUsersDB,
  deleteUserDB,
  newUserDB,
  resetUsersDB,
} from "../models/users.model.js";

/**
 * Obtiene todos los usuarios de la base de datos, responde con:
 * - La lista de usuarios
 * - Mensaje de error interno en el servidor
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getAllUsers(req, res) {
  const users = await getAllUsersDB(); // Método del modelo
  if (users) res.json(users); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

/**
 * Obtiene todos los usuarios de la base de datos, responde con:
 * - La lista de usuarios.
 * - Mensaje de error porque el usuario no se ha encontrado.
 * - Mensaje de error interno en el servidor.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getUser(req, res) {
  const user = await getUserByIdDB(req.params.id); // Método del modelo

  // Si ha devuelvo algún usuario..
  if (user) res.json(user);
  // Si no ha devuelto ningún usuario..
  else {
    // Si no se ha encontrado el usuario
    if (user === false) res.json({ error: "Usuario no encontrado" });
    // Si ha habido algún error en la consulta
    else res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  }
}

/**
 * Edita un usuario de la base de datos, responde con:
 * - Mensaje de error interno en el servidor.
 * - Mensaje de error (campos duplicados en la BD)
 * - JSON con la información de la ejecución.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function editUser(req, res) {
  const result = await editUsersDB(req.body);

  if (result === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else if (result.error) {
    res.json(result);
  } else {
    res.json(result);
  }
}

/**
 * Elimina un usuario de la base de datos, responde con:
 * - JSON con la información de la ejecución.
 * - Mensaje de error interno del servidor.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function deleteUser(req, res) {
  const result = await deleteUserDB(req.params.id); // Método del modelo

  // Si se ha ejecutado la consulta
  if (result) res.json(result); // Devuelve información de la ejecución de dicha consulta
  // Si ha habido algún error en la consulta
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}

export async function newUser(req, res) {
  const result = await newUserDB(req.body);
  res.json(result);
}

// Función temporal
export async function resetUsers(req, res) {
  const result = await resetUsersDB();
  res.json(result);
}
