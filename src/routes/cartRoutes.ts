import express from "express";
import {
    addToCart,
    changeItemQuantity,
    getUserCart,
    removeFromCart,
} from "../controllers/cartControllers";
import { authentication } from "../middlewares/authentication";
import { getCart } from "../middlewares/getCart";
import { sanitizer } from "../middlewares/sanitizer";

const cartRoutes = express.Router();

cartRoutes.get("/:email/:userId", authentication, getCart, getUserCart);
cartRoutes.patch("/:email/:userId", authentication, getCart, addToCart);
cartRoutes.patch(
    "/:email/:userId/:itemId/:quantity",
    authentication,
    getCart,
    changeItemQuantity,
    addToCart
);
cartRoutes.patch("/:email/:userId/:itemId", authentication, getCart, removeFromCart);

export default cartRoutes;
