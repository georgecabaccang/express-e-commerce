import { model, Schema } from "mongoose";

const refreshTokenSchema = new Schema({
    refreshToken: { type: String, required: true },
    // set to expire in 10 days
    createdAt: { type: Date, expires: 60 * 60 * 24 * 10, default: Date.now },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
