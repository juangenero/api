import { getAllUsers } from "../models/users.model.js";

export async function getUsers(req, res) {
  const users = await getAllUsers(); // Método del modelo
  res.json(users);
}
