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
exports.removeFromCart = exports.changeItemQuantity = exports.addToCart = exports.getUserCart = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const getUserCart = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = request.body.cart;
        response.status(200).send({ status: 200, message: "cart_retrieved", data: cart });
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.getUserCart = getUserCart;
const addToCart = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, quantity } = request.params;
        const cart = request.body.cart;
        const cartItems = cart.items;
        const itemIndex = cartItems.findIndex((item) => {
            return itemId === item._id;
        });
        if (itemIndex >= 0)
            return response.status(409).send({ status: 409, message: "item_duplication" });
        const product = yield productModel_1.default.findById(itemId);
        if (product) {
            cartItems.push({
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: +quantity,
                addedOn: new Date(),
            });
            cart.modifiedOn = new Date();
            const updatedCart = yield cart.save();
            response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
        }
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.addToCart = addToCart;
const changeItemQuantity = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, quantity } = request.params;
        const cart = request.body.cart;
        const cartItems = cart.items;
        const itemIndex = cartItems.findIndex((item) => {
            return item._id === itemId;
        });
        if (itemIndex < 0)
            return next();
        if (+quantity < 1) {
            cartItems[itemIndex].quantity = 1;
        }
        else if (+quantity > 100) {
            cartItems[itemIndex].quantity = 100;
        }
        else {
            cartItems[itemIndex].quantity = +quantity;
        }
        cart.modifiedOn = new Date();
        const updatedCart = yield cart.save();
        response.status(200).send({
            status: 204,
            message: "item_quantity_updated",
            data: updatedCart.items[itemIndex],
        });
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.changeItemQuantity = changeItemQuantity;
const removeFromCart = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.itemId;
        const cart = request.body.cart;
        const cartItems = cart.items;
        const itemIndex = cartItems.findIndex((item) => {
            return item._id === itemId;
        });
        if (itemIndex < 0)
            return response.status(404).send("item_not_found_in_cart");
        cartItems.splice(itemIndex, 1);
        cart.modifiedOn = new Date();
        const updatedCart = yield cart.save();
        response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.removeFromCart = removeFromCart;
