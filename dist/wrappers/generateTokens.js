"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cipher_1 = require("../helpers/cipher");
const token_1 = require("../helpers/token");
function generateTokens(userData) {
    // create jwt token
    const accessToken = (0, token_1.sign)({ _id: userData._id.toString(), email: userData.email }, process.env.JWT_SECRET, process.env.JWT_EXPIRATION);
    // create refresh token
    const refreshToken = (0, token_1.sign)({ _id: userData._id.toString(), email: userData.email }, process.env.REFRESH_SECRET, "9999999d");
    // create copy of accessToken without expiration
    const jwtTwin = (0, token_1.sign)({ _id: userData._id.toString(), email: userData.email }, process.env.JWT_SECRET, "9999999d");
    // create session token - - - encyprt with crypto
    const sessionToken = (0, cipher_1.encrypt)(jwtTwin);
    return { accessToken, refreshToken, sessionToken };
}
exports.default = generateTokens;
