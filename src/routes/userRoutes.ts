import express from "express";
import { createUser, loginUser, logoutUser, refreshTokens } from "../controllers/userController";
import validateEmailAndPassword from "../middlewares/validateEmailAndPassword";

const userRoutes = express.Router();

userRoutes.post("/sign-up", validateEmailAndPassword, createUser);
userRoutes.post("/sign-in", loginUser);
userRoutes.post("/refresh-tokens", refreshTokens);
userRoutes.post("/sign-out", logoutUser);

export default userRoutes;
