import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";

export const authentication = async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    const email = request.body.email ? request.body.email : request.params.email;

    const user = await User.findOne({ email: email });

    if (!user) {
        response.status(404).send({ status: 404, message: "user_not_found" });
    } else {
        request.body.user = user;

        if (!userId) return next();
        if (user._id.toString() !== userId) {
            response.status(401).send({ status: 401, message: "invalid_user" });
        } else {
            next();
        }
    }
};
