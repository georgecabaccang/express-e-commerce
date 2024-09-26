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
const token_1 = require("../helpers/token");
const refreshTokenModel_1 = __importDefault(require("../models/refreshTokenModel"));
const generateTokens_1 = __importDefault(require("./generateTokens"));
const sessionModel_1 = __importDefault(require("../models/sessionModel"));
function refreshTokens(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshTokenFromCookie = request.signedCookies.sessionId.tokenR;
        const refreshTokenInDB = yield refreshTokenModel_1.default.findOne({ refreshToken: refreshTokenFromCookie });
        if (refreshTokenInDB) {
            const decodedRefreshToken = (0, token_1.verify)(refreshTokenInDB.refreshToken, process.env.REFRESH_SECRET);
            const { accessToken, refreshToken, sessionToken } = (0, generateTokens_1.default)(decodedRefreshToken);
            // create new session and save to DB
            const newSession = new sessionModel_1.default({
                tokenR: refreshToken,
                tokenT: sessionToken,
            });
            const newRefreshToken = new refreshTokenModel_1.default({
                refreshToken: refreshToken,
            });
            const savedSession = yield newSession.save();
            yield newRefreshToken.save();
            yield refreshTokenInDB.deleteOne();
            request.body.user = { _id: decodedRefreshToken._id, email: decodedRefreshToken.email };
            // send a cookie with newSession as data, and add an expiration
            response.cookie("sessionId", savedSession, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + +process.env.COOKIE_EXPIRATION),
                // secure: true, // uncomment for https sites
            });
            return response.status(200).send({
                status: 200,
                message: "token_refreshed",
                data: {
                    _id: decodedRefreshToken._id,
                    email: decodedRefreshToken.email,
                    token: accessToken,
                },
            });
        }
    });
}
exports.default = refreshTokens;
