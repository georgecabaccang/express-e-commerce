"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const refreshTokenModel_1 = __importDefault(require("../models/refreshTokenModel"));
function generateTokens(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const refreshTokenInDB = yield refreshTokenModel_1.default.findOne({ refreshToken: refreshToken });
            if (refreshTokenInDB) {
                const decoded = (0, token_1.verify)(refreshTokenInDB.refreshToken, process.env.REFRESH_SECRET);
                const refreshTokenInDBProps = decoded;
                // create jwt token
                const accessToken = (0, token_1.sign)({ _id: refreshTokenInDBProps._id.toString(), email: refreshTokenInDBProps.email }, process.env.JWT_SECRET, process.env.JWT_EXPIRATION);
                // create refresh token
                const refreshToken = (0, token_1.sign)({ _id: refreshTokenInDBProps._id.toString(), email: refreshTokenInDBProps.email }, process.env.REFRESH_SECRET);
                // create copy of accessToken without expiration
                const jwtTwin = (0, token_1.sign)({ _id: refreshTokenInDBProps._id.toString(), email: refreshTokenInDBProps.email }, process.env.JWT_SECRET);
            }
            else {
                return "invalid_refresh_token";
            }
        }
        catch (error) { }
    });
}
exports.default = generateTokens;
