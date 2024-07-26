import { Request, Response } from "express";
import * as argon2 from "argon2";

import User from "../models/userModel";
import Cart from "../models/cartModel";

import IUser from "../interfaces/IUser";
import ICart from "../interfaces/ICart";
import Session from "../models/sessionModel";
import ISession from "../interfaces/ISession";
import { sign } from "../helpers/token";
import { encrypt } from "../helpers/cipher";

export const createUser = async (request: Request, response: Response) => {
    try {
        const userCredentials = request.body;

        const existingUser = await User.findOne({ email: userCredentials.email });

        if (existingUser)
            return response.status(409).send({ status: 409, message: "user_duplication" });

        const hashedPassowrd = await argon2.hash(userCredentials.password);

        const newUser = new User<IUser>({
            email: userCredentials.email,
            password: hashedPassowrd,
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

        if (await argon2.verify(user.password, password)) {
            // create jwt token
            const jwtToken = sign(
                { _id: user._id, email: user.email },
                process.env.JWT_SECRET!,
                process.env.JWT_EXPIRATION!
            );

            // create session token
            const sessionToken = encrypt(jwtToken);

            // create new session and save to DB
            const newSession = new Session<ISession>({
                tokenJ: jwtToken,
                tokenC: sessionToken,
            });

            const savedSession = await newSession.save();

            // send a cookie with newSession as data, and add an expiration
            response.cookie("sessionId", savedSession, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + +process.env.COOKIE_EXPIRATION!),
                // secure: true, // uncomment for https sites
            });

            return response.status(200).send({
                status: 200,
                message: "login_success",
                data: { _id: user._id, email: user.email, token: jwtToken },
            });
        }
        response.status(401).send({ status: 401, message: "credentials_mismatch" });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
