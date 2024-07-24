import express from "express";
import { createUser, loginUser } from "../controllers/userController";
import { authentication } from "../middlewares/authentication";
import validateEmailAndPassword from "../middlewares/validateEmailAndPassword";

const userRoutes = express.Router();

userRoutes.post("/sign-up", validateEmailAndPassword, createUser);
userRoutes.post("/sign-in", authentication, loginUser);

export default userRoutes;
