import { Schema } from "mongoose";
import IItem from "./IItem";

interface ICart {
    _id?: Schema.Types.ObjectId;
    ownerId: Schema.Types.ObjectId | null;
    items: IItem[] | [];
}

export default ICart;
