import { Types } from "mongoose";

interface IUser {
    _id?: Types.ObjectId;
    email: String;
    password: String;
}

export default IUser;
