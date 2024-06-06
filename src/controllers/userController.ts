import { Request, Response } from "express";
import User from "../models/userModel";
import IUser from "../interfaces/IUser";

export const createUser = async (request: Request, response: Response) => {
    try {
        const userCredentials = request.body;
        const newUser = new User<IUser>({
            email: userCredentials.email,
            password: userCredentials.password,
        });
        response.sendStatus(200);
    } catch (error) {
        response.send(error);
    }
};
