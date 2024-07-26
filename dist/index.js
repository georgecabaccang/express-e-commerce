"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// installed and imported this separately
const body_parser_1 = __importDefault(require("body-parser"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const sanitizer_1 = require("./middlewares/sanitizer");
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_DB);
const db = mongoose_1.default.connection;
db.on("error", (error) => {
    console.log(error);
});
db.once("open", () => {
    console.log("Connected to DB");
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET)); // add secret key here for signing cookies
app.use(sanitizer_1.sanitizer);
app.use("/user", userRoutes_1.default);
app.use("/cart", cartRoutes_1.default);
app.listen(8002, () => {
    console.log("Port 8002");
});
