import { Schema } from "mongoose";

interface IUser {
    _id?: Schema.Types.ObjectId;
    email: string;
    password: string;
    cartId: Schema.Types.ObjectId | null;
}

export default IUser;
