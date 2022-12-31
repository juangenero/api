import { Router } from "express";
import { getAllVaccines } from "../controllers/vaccines.controller.js";

const vaccinesRoute = Router();

vaccinesRoute.get("/api/vaccines", getAllVaccines);

export default vaccinesRoute;
