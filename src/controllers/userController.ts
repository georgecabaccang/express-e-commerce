import { Request, Response } from "express";
import * as argon2 from "argon2";

import User from "../models/userModel";
import Cart from "../models/cartModel";

import IUser from "../interfaces/IUser";
import ICart from "../interfaces/ICart";
import Session from "../models/sessionModel";
import ISession from "../interfaces/ISession";
import { sign, verify } from "../helpers/token";
import { encrypt } from "../helpers/cipher";
import generateTokens from "../wrappers/generateTokens";
import RefreshToken from "../models/refreshTokenModel";

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
        const { email, password } = request.body;

        const user = (await User.findOne({ email: email })) as IUser;
        if (!user) return response.status(404).send("user_not_found");

        if (await argon2.verify(user.password, password)) {
            const { accessToken, refreshToken, sessionToken } = generateTokens(user);

            // create new session and save to DB
            const newSession = new Session<ISession>({
                tokenR: refreshToken,
                tokenT: sessionToken,
            });

            const newRefreshToken = new RefreshToken({
                refreshToken: refreshToken,
            });

            const savedSession = await newSession.save();
            await newRefreshToken.save();

            // send a cookie with newSession as data, and add an expiration
            response.cookie("theCookie", savedSession, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + +process.env.COOKIE_EXPIRATION!),
                // secure: true, // uncomment for https sites
            });

            return response.status(200).send({
                status: 200,
                message: "login_success",
                data: { _id: user._id, email: user.email, token: accessToken },
            });
        }
        response.status(401).send({ status: 401, message: "credentials_mismatch" });
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};

export const refreshTokens = async (request: Request, response: Response) => {
    const refreshTokenFromCookie = request.signedCookies.theCookie.tokenR;

    const refreshTokenInDB = await RefreshToken.findOne({ refreshToken: refreshTokenFromCookie });

    if (refreshTokenInDB) {
        const decodedRefreshToken = verify(
            refreshTokenInDB.refreshToken,
            process.env.REFRESH_SECRET!
        ) as IUser;
        const { accessToken, refreshToken, sessionToken } = generateTokens(decodedRefreshToken);
        // create new session and save to DB
        const newSession = new Session<ISession>({
            tokenR: refreshToken,
            tokenT: sessionToken,
        });

        const newRefreshToken = new RefreshToken({
            refreshToken: refreshToken,
        });

        const savedSession = await newSession.save();
        const test = await newRefreshToken.save();

        // remove old refresh token from DB
        await refreshTokenInDB.deleteOne();

        request.body.user = { _id: decodedRefreshToken._id, email: decodedRefreshToken.email };

        // send a cookie with newSession as data, and add an expiration
        response.cookie("theCookie", savedSession, {
            signed: true,
            httpOnly: true,
            expires: new Date(Date.now() + +process.env.COOKIE_EXPIRATION!),
            // secure: true, // uncomment for https sites
        });

        return response.status(200).send({
            status: 200,
            message: "token_refreshed",
            data: {
                _id: decodedRefreshToken._id,
                email: decodedRefreshToken.email,
                token: accessToken,
            },
        });
    }
};

export const logoutUser = async (request: Request, response: Response) => {
    const refreshTokenFromCookie = request.signedCookies.theCookie.tokenR;

    await RefreshToken.deleteOne({ refreshToken: refreshTokenFromCookie });

    response.clearCookie("theCookie");

    response.status(200).send("signed_out");
};
