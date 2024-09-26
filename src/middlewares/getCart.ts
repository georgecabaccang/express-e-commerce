import { NextFunction, Request, Response } from "express";
import Cart from "../models/cartModel";

export const getCart = async (request: Request, response: Response, next: NextFunction) => {
    const cart = await Cart.findOne({ ownerId: request.body.user._id });

    if (!cart) return response.status(404).send({ status: 404, message: "cart_not_found" });
    request.body.cart = cart;
    next();
};
