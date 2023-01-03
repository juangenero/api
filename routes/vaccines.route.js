import { Router } from "express";
import { getAllVaccines, getVaccineById, editVaccine } from "../controllers/vaccines.controller.js";

const vaccinesRoute = Router();

vaccinesRoute.get("/api/vaccines", getAllVaccines);
vaccinesRoute.get("/api/vaccines/:id", getVaccineById);
vaccinesRoute.patch("/api/vaccines", editVaccine);

export default vaccinesRoute;
