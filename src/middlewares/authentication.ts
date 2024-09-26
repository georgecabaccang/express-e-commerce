import { NextFunction, Request, Response } from "express";

import { verify } from "../helpers/token";
import { JsonWebTokenError } from "jsonwebtoken";
import IUser from "../interfaces/IUser";

export const authentication = async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    const email = request.body.email ? request.body.email : request.params.email;
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) return response.status(403).send("no_token");

    try {
        const decoded = verify(token, process.env.JWT_SECRET!);
        const decodedProps = decoded as IUser;

        if (userId !== decodedProps!._id!.toString() || email !== decodedProps!.email) {
            return response.status(401).send("users_do_not_match");
        }

        request.body.user = { _id: decodedProps!._id, email: decodedProps!.email };
        next();
    } catch (error) {
        const jwtError = error as JsonWebTokenError;
        switch (jwtError.name) {
            case "TokenExpiredError":
                response.status(401).send("expired_token");
                break;
            case "JsonWebTokenError":
                response.status(403).send("invalid_token");
                break;
        }
    }
};
