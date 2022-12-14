import { Router } from "express";
import { login } from "../controllers/login.controller.js";

const loginRoute = Router();

// Ruta para realizar el login
loginRoute.use("/api/login", login);

export default loginRoute;
