"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validateEmailAndPassword_1 = __importDefault(require("../middlewares/validateEmailAndPassword"));
const userRoutes = express_1.default.Router();
userRoutes.post("/sign-up", validateEmailAndPassword_1.default, userController_1.createUser);
userRoutes.post("/sign-in", userController_1.loginUser);
userRoutes.post("/refresh-tokens", userController_1.refreshTokens);
userRoutes.post("/sign-out", userController_1.logoutUser);
exports.default = userRoutes;
