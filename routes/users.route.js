import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";

const usersRoute = Router();

// Ruta para realizar el login
usersRoute.get("/api/users", getUsers);

export default usersRoute;
