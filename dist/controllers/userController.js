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
exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredentials = request.body;
        const existingUser = yield userModel_1.default.findOne({ email: userCredentials.email });
        if (existingUser)
            return response.status(409).send({ status: 409, message: "user_duplication" });
        const newUser = new userModel_1.default({
            email: userCredentials.email,
            password: userCredentials.password,
            cartId: null,
        });
        const user = yield newUser.save();
        const newCart = new cartModel_1.default({
            ownerId: null,
            items: [],
        });
        const cart = yield newCart.save();
        user.cartId = cart._id;
        cart.ownerId = user._id;
        yield user.save();
        yield cart.save();
        if (user && cart) {
            response.status(201).send({ status: 201, message: "user_created" });
        }
        else {
            response.status(500).send({ status: 500, message: "server_side_error" });
        }
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.createUser = createUser;
const loginUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredentials = request.body;
        const user = yield userModel_1.default.findOne({ email: userCredentials.email });
        if (!user)
            return response.status(404).send({ status: 404, message: "user_not_found" });
        const foundUser = user;
        if (userCredentials.password !== user.password)
            return response.status(401).send({ status: 401, message: "credentials_mismatch" });
        response.status(200).send({
            status: 200,
            message: "login_success",
            data: { _id: foundUser._id, email: foundUser.email },
        });
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.loginUser = loginUser;
