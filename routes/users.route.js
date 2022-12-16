import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/users.controller.js";

const usersRoute = Router();

// Ruta para realizar el login
usersRoute.get("/api/users", getUsers);
usersRoute.post("/api/deleteUser", deleteUser);

export default usersRoute;
