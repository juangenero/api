import { Router } from "express";
import { deleteUser, getUser, getAllUsers, resetUsers } from "../controllers/users.controller.js";

const usersRoute = Router();

// Ruta para realizar el login
usersRoute.get("/api/users", getAllUsers);
usersRoute.get("/api/user/:id", getUser);
usersRoute.delete("/api/deleteUser/:id", deleteUser);
usersRoute.post("/api/resetUsers", resetUsers);

export default usersRoute;
