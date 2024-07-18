import express from "express";
import { createUser, loginUser } from "../controllers/userController";
import { authentication } from "../middlewares/authentication";
import { sanitizer } from "../middlewares/sanitizer";

const userRoutes = express.Router();

userRoutes.post("/sign-up", sanitizer, createUser);
userRoutes.post("/sign-in", sanitizer, authentication, loginUser);

export default userRoutes;
