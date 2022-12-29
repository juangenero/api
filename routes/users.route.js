import { Router } from "express";
import { getAllUsers, getUser, editUser, deleteUser, newUser, resetUsers } from "../controllers/users.controller.js";

const usersRoute = Router();

usersRoute.get("/api/users", getAllUsers);
usersRoute.get("/api/users/:id", getUser);
usersRoute.patch("/api/users", editUser);
usersRoute.delete("/api/users/:id", deleteUser);
usersRoute.post("/api/users", newUser);

usersRoute.post("/api/users/reset", resetUsers);

export default usersRoute;
