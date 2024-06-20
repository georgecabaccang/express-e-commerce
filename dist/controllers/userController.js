"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const argon2 = __importStar(require("argon2"));
const userModel_1 = __importDefault(require("../models/userModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredentials = request.body;
        const existingUser = yield userModel_1.default.findOne({ email: userCredentials.email });
        if (existingUser)
            return response.status(409).send({ status: 409, message: "user_duplication" });
        const hashedPassowrd = yield argon2.hash(userCredentials.password);
        const newUser = new userModel_1.default({
            email: userCredentials.email,
            password: hashedPassowrd,
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
        const user = request.body.user;
        const password = request.body.password;
        if (yield argon2.verify(user.password, password)) {
            return response.status(200).send({
                status: 200,
                message: "login_success",
                data: { _id: user._id, email: user.email },
            });
        }
        response.status(401).send({ status: 401, message: "credentials_mismatch" });
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.loginUser = loginUser;
