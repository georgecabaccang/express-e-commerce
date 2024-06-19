"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartModel = new mongoose_1.Schema({
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    items: [
        {
            id: Number,
            title: String,
            price: Number,
            quantity: Number,
        },
    ],
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Cart = (0, mongoose_1.model)("Cart", cartModel);
exports.default = Cart;
