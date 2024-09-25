"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const productRoutes = express_1.default.Router();
productRoutes.get("/", productController_1.getProducts);
productRoutes.get("/:id", productController_1.getProductDetails);
exports.default = productRoutes;
