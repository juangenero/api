import { Router } from "express";
import { getAllVaccines, getVaccineById, editVaccine, deleteVaccine } from "../controllers/vaccines.controller.js";

const vaccinesRoute = Router();

vaccinesRoute.get("/api/vaccines", getAllVaccines);
vaccinesRoute.get("/api/vaccines/:id", getVaccineById);
vaccinesRoute.patch("/api/vaccines", editVaccine);
vaccinesRoute.delete("/api/vaccines/:id", deleteVaccine);

export default vaccinesRoute;
