"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
require("dotenv/config");
const crypto_1 = __importDefault(require("crypto"));
const encrypt = (string) => {
    let cipher = crypto_1.default.createCipheriv(process.env.CIPHER_ALGO, process.env.CIPHER_SECRET, process.env.CIPHER_IV);
    let encrypted = cipher.update(string, "utf-8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
};
exports.encrypt = encrypt;
const decrypt = (string, algo, key, iv) => {
    let decipher = crypto_1.default.createDecipheriv(algo, key, iv);
    let decrypted = decipher.update(string, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};
exports.decrypt = decrypt;
