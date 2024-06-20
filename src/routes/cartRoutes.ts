import express from "express";
import { addToCart, getUserCart } from "../controllers/cartControllers";

const cartRoutes = express.Router();

cartRoutes.get("/:userId", getUserCart);
cartRoutes.patch("/:userId", addToCart);

export default cartRoutes;
