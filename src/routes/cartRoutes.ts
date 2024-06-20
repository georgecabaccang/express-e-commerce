import express from "express";
import { addToCart, getUserCart } from "../controllers/cartControllers";
import { authentication } from "../middlewares/authentication";
import { getCart } from "../middlewares/getCart";

const cartRoutes = express.Router();

cartRoutes.get("/:email/:userId", authentication, getCart, getUserCart);
cartRoutes.patch("/:email/:userId", authentication, getCart, addToCart);

export default cartRoutes;
