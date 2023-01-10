import { Router } from "express";
import { getAllPets, getPetsOfUser, getPetById } from "../controllers/pets.controller.js";

const petsRoute = Router();

petsRoute.get("/api/pets", getAllPets);
petsRoute.get("/api/pets/user/:idUser", getPetsOfUser);
petsRoute.get("/api/pets/pet/:idPet", getPetById);

export default petsRoute;
