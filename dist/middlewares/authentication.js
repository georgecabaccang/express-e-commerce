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
exports.authentication = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const authentication = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.params.userId;
    const email = request.body.email ? request.body.email : request.params.email;
    const user = yield userModel_1.default.findOne({ email: email });
    if (!user) {
        response.status(404).send({ status: 404, message: "user_not_found" });
    }
    else {
        request.body.user = user;
        if (!userId)
            return next();
        if (user._id.toString() !== userId) {
            response.status(401).send({ status: 401, message: "invalid_user" });
        }
        else {
            next();
        }
    }
});
exports.authentication = authentication;
