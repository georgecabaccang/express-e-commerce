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
exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredentials = request.body;
        const existingUser = yield userModel_1.default.findOne({ email: userCredentials.email });
        if (existingUser)
            return response.status(409).send({ status: 409, message: "user_duplication" });
        const newUser = new userModel_1.default({
            email: userCredentials.email,
            password: userCredentials.password,
        });
        const user = yield newUser.save();
        if (user) {
            response.sendStatus(200);
        }
        else {
            response.sendStatus(500);
        }
    }
    catch (error) {
        response.send(error);
    }
});
exports.createUser = createUser;
