import { NextFunction, Request, Response } from "express";
import IItem from "../interfaces/IItem";
import Product from "../models/productModel";

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
        const { itemId, quantity } = request.params;
        const cart = request.body.cart;
        const cartItems = cart.items as IItem[];

        const itemIndex = cartItems.findIndex((item) => {
            return itemId === item._id;
        });

        if (itemIndex >= 0)
            return response.status(409).send({ status: 409, message: "item_duplication" });

        const product: IItem | null = await Product.findById(itemId);

        if (product) {
            cartItems.push({
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: +quantity,
                addedOn: new Date(),
            });

            cart.modifiedOn = new Date();
            const updatedCart = await cart.save();

            response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
        }
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
            return item._id === itemId;
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
            return item._id === itemId;
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
