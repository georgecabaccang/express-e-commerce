import { ObjectId } from "mongoose";
import IItem from "./IItem";

interface ICart {
    _id?: ObjectId;
    ownerId: ObjectId;
    items: IItem[] | [];
}

export default ICart;
