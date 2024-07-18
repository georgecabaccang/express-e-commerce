"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authentication_1 = require("../middlewares/authentication");
const sanitizer_1 = require("../middlewares/sanitizer");
const userRoutes = express_1.default.Router();
userRoutes.post("/sign-up", sanitizer_1.sanitizer, userController_1.createUser);
userRoutes.post("/sign-in", sanitizer_1.sanitizer, authentication_1.authentication, userController_1.loginUser);
exports.default = userRoutes;
