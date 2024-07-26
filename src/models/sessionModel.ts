import { model, Schema } from "mongoose";
import "dotenv/config";

const sessionSchema = new Schema({
    tokenJ: { type: String, required: true },
    tokenC: { type: String, required: true },
    createdAt: { type: Date, expires: process.env.COOKIE_EXPIRATION!, default: Date.now },
});

const Session = model("Session", sessionSchema);
export default Session;
