"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv/config");
const sessionSchema = new mongoose_1.Schema({
    tokenJ: { type: String, required: true },
    tokenC: { type: String, required: true },
    createdAt: { type: Date, expires: process.env.COOKIE_EXPIRATION, default: Date.now },
});
const Session = (0, mongoose_1.model)("Session", sessionSchema);
exports.default = Session;
