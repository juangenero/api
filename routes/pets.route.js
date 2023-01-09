import { Router } from "express";
import { getAllPets } from "../controllers/pets.controller.js";

const petsRoute = Router();

petsRoute.get("/api/pets", getAllPets);


export default petsRoute;
