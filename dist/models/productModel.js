"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
    reviews: { type: Number, required: true },
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
