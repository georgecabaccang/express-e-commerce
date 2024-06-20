import express from "express";
import { createUser, loginUser } from "../controllers/userController";
import { authentication } from "../middlewares/authentication";

const userRoutes = express.Router();

userRoutes.post("/sign-up", authentication, createUser);
userRoutes.post("/sign-in", authentication, loginUser);

export default userRoutes;
