import { deleteUserDB, getUserByIdDB, getAllUsersDB, resetUsersDB } from "../models/users.model.js";

export async function getAllUsers(req, res) {
  const users = await getAllUsersDB(); // Método del modelo
  res.json(users);
}

export async function getUser(req, res) {
  const user = await getUserByIdDB(req.params.id); // Método del modelo
  if (user) res.json(user);
  else res.json({ error: "Usuario no encontrado" });
}

export async function deleteUser(req, res) {
  const id = req.params.id;
  const result = await deleteUserDB(id);
  res.json(result);
}

export async function resetUsers(req, res) {
  const result = await resetUsersDB();
  res.json(result);
}
