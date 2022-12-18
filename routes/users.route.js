import { Router } from "express";
import { deleteUser, getUsers, resetUsers } from "../controllers/users.controller.js";

const usersRoute = Router();

// Ruta para realizar el login
usersRoute.get("/api/users", getUsers);
usersRoute.post("/api/deleteUser", deleteUser);
usersRoute.post("/api/resetUsers", resetUsers);

export default usersRoute;
