import { Request, Response } from "express";
import Cart from "../models/cartModel";
import IItem from "../interfaces/IItem";

export const getUserCart = async (request: Request, response: Response) => {
    try {
        const cart = request.body.cart;
        response.status(200).send({ status: 200, message: "cart_retrieved", data: cart });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};

export const addToCart = async (request: Request, response: Response) => {
    try {
        const itemDetails = request.body as IItem;
        const cart = request.body.cart;

        cart.items.push(itemDetails);
        cart.modifiedOn = new Date();
        await cart.save();

        response.status(200).send({ status: 204, message: "cart_updated", data: cart });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
