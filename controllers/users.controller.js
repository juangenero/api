import { deleteUserDB, getAllUsers, resetUsersDB } from "../models/users.model.js";

export async function getUsers(req, res) {
  const users = await getAllUsers(); // Método del modelo
  res.json(users);
}

export async function deleteUser(req, res) {
  const id = req.body.id
  const result = await deleteUserDB(id);
  res.json(result);
}

export async function resetUsers(req, res){
  const result = await resetUsersDB();
  res.json(result)
}