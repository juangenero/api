import { Router } from "express";
import { deleteUser, getUser, getAllUsers, resetUsers, editUser } from "../controllers/users.controller.js";

const usersRoute = Router();

usersRoute.get("/api/users", getAllUsers);
usersRoute.get("/api/user/:id", getUser);
usersRoute.delete("/api/deleteUser/:id", deleteUser);
usersRoute.post("/api/resetUsers", resetUsers);
usersRoute.patch("/api/editUser/:id", editUser);

export default usersRoute;
