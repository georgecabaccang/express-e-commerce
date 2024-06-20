import { Request, Response } from "express";
import Cart from "../models/cartModel";
import IItem from "../interfaces/IItem";

export const getUserCart = async (request: Request, response: Response) => {
    try {
        const userId = request.params.userId;

        const cart = await Cart.findOne({ ownerId: userId });

        if (cart) {
            response.status(200).send({ status: 200, message: "cart_retrieved", data: cart });
        } else {
            response.status(404).send({ status: 404, message: "cart_not_found" });
        }
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};

export const addToCart = async (request: Request, response: Response) => {
    try {
        const userId = request.params.userId;
        const itemDetails = request.body as IItem;

        const cart = await Cart.findOne({ ownerId: userId });

        if (cart) {
            cart.items.push(itemDetails);
            cart.modifiedOn = new Date();
            await cart.save();

            response.status(200).send({ status: 204, message: "cart_updated", data: cart });
        } else {
            response.status(404).send({ status: 404, message: "cart_not_found" });
        }
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
