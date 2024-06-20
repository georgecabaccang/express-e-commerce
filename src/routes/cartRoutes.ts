import express from "express";
import { getUserCart } from "../controllers/cartControllers";

const cartRoutes = express.Router();

cartRoutes.get("/:userId", getUserCart);

export default cartRoutes;
