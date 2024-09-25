import { model, Schema } from "mongoose";

const cartModel = new Schema(
    {
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
        items: [
            {
                _id: String,
                title: String,
                price: Number,
                quantity: Number,
                addedOn: Date,
            },
        ],
        modifiedOn: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Cart = model("Cart", cartModel);
export default Cart;
