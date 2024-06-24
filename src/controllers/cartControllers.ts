import { Request, Response } from "express";
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
        const cartItems = cart.items as IItem[];

        const itemIndex = cartItems.findIndex((item) => {
            return item.id === itemDetails.id;
        });

        if (itemIndex > -1) {
            cartItems[itemIndex].quantity = itemDetails.quantity;
        } else {
            cartItems.push({ ...itemDetails, addedOn: new Date() });
        }

        cart.modifiedOn = new Date();
        const updatedCart = await cart.save();

        response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
