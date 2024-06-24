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
exports.addToCart = exports.getUserCart = void 0;
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
        const itemDetails = request.body;
        const cart = request.body.cart;
        const cartItems = cart.items;
        const itemIndex = cartItems.findIndex((item) => {
            return item.id === itemDetails.id;
        });
        if (itemIndex > -1) {
            cartItems[itemIndex].quantity = itemDetails.quantity;
        }
        else {
            cart.items.push(itemDetails);
        }
        cart.modifiedOn = new Date();
        const updatedCart = yield cart.save();
        response.status(200).send({ status: 204, message: "cart_updated", data: updatedCart });
    }
    catch (error) {
        response.status(500).send({ status: 500, message: error });
    }
});
exports.addToCart = addToCart;
