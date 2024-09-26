"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const refreshTokenSchema = new mongoose_1.Schema({
    refreshToken: { type: String, required: true },
    // set to expire in 10 days
    createdAt: { type: Date, expires: 60 * 60 * 24 * 10, default: Date.now },
});
const RefreshToken = (0, mongoose_1.model)("RefreshToken", refreshTokenSchema);
exports.default = RefreshToken;
