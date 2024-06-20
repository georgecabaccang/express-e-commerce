import { Request, Response } from "express";
import User from "../models/userModel";
import Cart from "../models/cartModel";

import IUser from "../interfaces/IUser";
import ICart from "../interfaces/ICart";

export const createUser = async (request: Request, response: Response) => {
    try {
        const userCredentials = request.body;

        const existingUser = await User.findOne({ email: userCredentials.email });

        if (existingUser)
            return response.status(409).send({ status: 409, message: "user_duplication" });

        const newUser = new User<IUser>({
            email: userCredentials.email,
            password: userCredentials.password,
            cartId: null,
        });

        const user = await newUser.save();

        const newCart = new Cart<ICart>({
            ownerId: null,
            items: [],
        });

        const cart = await newCart.save();

        user.cartId = cart._id;
        cart.ownerId = user._id;

        await user.save();
        await cart.save();

        if (user && cart) {
            response.status(201).send({ status: 201, message: "user_created" });
        } else {
            response.status(500).send({ status: 500, message: "server_side_error" });
        }
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};

export const loginUser = async (request: Request, response: Response) => {
    try {
        const user = request.body.user;
        const password = request.body.password;

        if (user.password !== password)
            return response.status(401).send({ status: 401, message: "credentials_mismatch" });

        response.status(200).send({
            status: 200,
            message: "login_success",
            data: { _id: user._id, email: user.email },
        });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
