import { Request, Response } from "express";
import User from "../models/userModel";
import IUser from "../interfaces/IUser";

export const createUser = async (request: Request, response: Response) => {
    try {
        const userCredentials = request.body;

        const existingUser = await User.findOne({ email: userCredentials.email });

        if (existingUser)
            return response.status(409).send({ status: 409, message: "user_duplication" });

        const newUser = new User<IUser>({
            email: userCredentials.email,
            password: userCredentials.password,
        });

        const user = await newUser.save();
        if (user) {
            response.status(201).send({ status: 201, message: "user_created" });
        } else {
            response.status(500).send({ status: 500, message: "server_side_error" });
        }
    } catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
};
