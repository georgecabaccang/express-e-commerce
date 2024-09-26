import { model, Schema } from "mongoose";
import "dotenv/config";

const sessionSchema = new Schema({
    tokenR: { type: String, required: true },
    tokenT: { type: String, required: true },
    createdAt: { type: Date, expires: process.env.COOKIE_EXPIRATION!, default: Date.now },
});

const Session = model("Session", sessionSchema);
export default Session;
