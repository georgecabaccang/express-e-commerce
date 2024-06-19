import { Model, Schema, model } from "mongoose";

const StringType = {
    type: String,
    required: true,
};

const userSchema = new Schema(
    {
        email: StringType,
        password: StringType,
        cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
export default User;
