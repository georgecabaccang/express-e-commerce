import { Model, Schema, model } from "mongoose";

const StringType = {
    type: String,
    required: true,
};

const userSchema = new Schema(
    {
        email: StringType,
        password: StringType,
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
export default User;
