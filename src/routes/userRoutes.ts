import express from "express";
import { createUser, loginUser } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/sign-up", createUser);
userRoutes.post("/sign-in", loginUser);

export default userRoutes;
