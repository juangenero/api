import { Router } from "express";
import { deleteUser, getUser, getAllUsers, resetUsers, editUser } from "../controllers/users.controller.js";

const usersRoute = Router();

usersRoute.get("/api/users", getAllUsers);
usersRoute.get("/api/users/:id", getUser);
usersRoute.delete("/api/users/:id", deleteUser);
usersRoute.post("/api/users/reset", resetUsers);
usersRoute.patch("/api/users", editUser);

export default usersRoute;
