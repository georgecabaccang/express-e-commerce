import express from "express";
import { createUser } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/sign-up", createUser);

export default userRoutes;
