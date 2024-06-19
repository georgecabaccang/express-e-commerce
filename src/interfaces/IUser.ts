import { Schema } from "mongoose";

interface IUser {
    _id?: Schema.Types.ObjectId;
    email: String;
    password: String;
    cartId: Schema.Types.ObjectId | null;
}

export default IUser;
