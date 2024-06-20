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
exports.addToCart = exports.getUserCart = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const getUserCart = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.userId;
        const cart = yield cartModel_1.default.findOne({ ownerId: userId });
        if (cart) {
            response.status(200).send({ status: 200, message: "cart_retrieved", data: cart });
        }
        else {
            response.status(404).send({ status: 404, message: "cart_not_found" });
        }
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.getUserCart = getUserCart;
const addToCart = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.userId;
        const itemDetails = request.body;
        const cart = yield cartModel_1.default.findOne({ ownerId: userId });
        if (cart) {
            cart.items.push(itemDetails);
            cart.modifiedOn = new Date();
            yield cart.save();
            response.status(200).send({ status: 204, message: "cart_updated", data: cart });
        }
        else {
            response.status(404).send({ status: 404, message: "cart_not_found" });
        }
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.addToCart = addToCart;