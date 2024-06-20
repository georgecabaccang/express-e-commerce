import { Request, Response } from "express";
import Cart from "../models/cartModel";

export const getUserCart = async (request: Request, response: Response) => {
    try {
        const userId = request.params.userId;

        const cart = await Cart.find({ ownerId: userId });

        if (cart) {
            response.status(200).send({ status: 200, message: "cart_retrieved", data: cart });
        } else {
            response.status(404).send({ status: 404, message: "cart_not_found" });
        }
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
