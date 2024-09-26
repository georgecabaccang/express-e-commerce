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
exports.getCart = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const getCart = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cartModel_1.default.findOne({ ownerId: request.body.user._id });
    if (!cart)
        return response.status(404).send({ status: 404, message: "cart_not_found" });
    request.body.cart = cart;
    next();
});
exports.getCart = getCart;
