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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const token_1 = require("../helpers/token");
const authentication = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = request.params.userId;
    const email = request.body.email ? request.body.email : request.params.email;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return response.status(403).send("no_token");
    try {
        const decoded = (0, token_1.verify)(token, process.env.JWT_SECRET);
        const decodedProps = decoded;
        if (userId !== decodedProps._id.toString() || email !== decodedProps.email) {
            return response.status(401).send("users_do_not_match");
        }
        request.body.user = { _id: decodedProps._id, email: decodedProps.email };
        next();
    }
    catch (error) {
        const jwtError = error;
        switch (jwtError.name) {
            case "TokenExpiredError":
                response.status(401).send("expired_token");
                break;
            case "JsonWebTokenError":
                response.status(403).send("invalid_token");
                break;
        }
    }
});
exports.authentication = authentication;
