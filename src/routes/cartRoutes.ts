import express from "express";
import { addToCart, getUserCart } from "../controllers/cartControllers";
import { authentication } from "../middlewares/authentication";

const cartRoutes = express.Router();

cartRoutes.get("/:email/:userId", authentication, getUserCart);
cartRoutes.patch("/:email/:userId", authentication, addToCart);

export default cartRoutes;
