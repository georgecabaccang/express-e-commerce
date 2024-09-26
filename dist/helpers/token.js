"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sign = (data, key, exp) => {
    const token = jsonwebtoken_1.default.sign(data, key, { expiresIn: exp });
    return token;
};
exports.sign = sign;
const verify = (token, key) => {
    const data = jsonwebtoken_1.default.verify(token, key);
    return data;
};
exports.verify = verify;
