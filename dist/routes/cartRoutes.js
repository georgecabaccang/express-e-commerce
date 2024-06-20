"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartControllers_1 = require("../controllers/cartControllers");
const authentication_1 = require("../middlewares/authentication");
const cartRoutes = express_1.default.Router();
cartRoutes.get("/:email/:userId", authentication_1.authentication, cartControllers_1.getUserCart);
cartRoutes.patch("/:email/:userId", authentication_1.authentication, cartControllers_1.addToCart);
exports.default = cartRoutes;
