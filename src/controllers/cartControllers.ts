import { NextFunction, Request, Response } from "express";
import axios from "axios";
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

        if (itemIndex > 0) return;

        const { data }: { data: IItem } = await axios.get(
            `https://fakestoreapi.com/products/${itemDetails.id}`
        );

        cartItems.push({ ...itemDetails, price: data.price, addedOn: new Date() });

        cart.modifiedOn = new Date();
        const updatedCart = await cart.save();

        response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};

export const changeItemQuantity = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { itemId, quantity } = request.params;
        const cart = request.body.cart;
        const cartItems = cart.items as IItem[];

        const itemIndex = cartItems.findIndex((item) => {
            return item.id === +itemId;
        });

        if (itemIndex < 0) return next();

        if (+quantity < 1) {
            cartItems[itemIndex].quantity = 1;
        } else if (+quantity > 100) {
            cartItems[itemIndex].quantity = 100;
        } else {
            cartItems[itemIndex].quantity = +quantity;
        }

        cart.modifiedOn = new Date();
        const updatedCart = await cart.save();

        response.status(200).send({
            status: 204,
            message: "item_quantity_updated",
            data: updatedCart.items[itemIndex],
        });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};

export const removeFromCart = async (request: Request, response: Response) => {
    try {
        const itemId = request.params.itemId;
        const cart = request.body.cart;
        const cartItems = cart.items as IItem[];

        const itemIndex = cartItems.findIndex((item) => {
            return item.id === +itemId;
        });

        if (itemIndex < 0) return response.status(404).send("item_not_found_in_cart");

        cartItems.splice(itemIndex, 1);
        cart.modifiedOn = new Date();
        const updatedCart = await cart.save();

        response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
