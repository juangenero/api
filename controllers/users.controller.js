import { deleteUserDB, getAllUsers } from "../models/users.model.js";

export async function getUsers(req, res) {
  const users = await getAllUsers(); // Método del modelo
  res.json(users);
}

export async function deleteUser(req, res) {
  const id = req.body.id
  console.log(req.body)
  const result = await deleteUserDB(id);
  res.json(result);
}
