"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6");
const db = mongoose_1.default.connection;
db.on("error", (error) => {
    console.log(error);
});
db.once("open", () => {
    console.log("Connected to DB");
});
app.listen(8002, () => {
    console.log("Port 8002");
});
