"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StringType = {
    type: String,
    required: true,
};
const userSchema = new mongoose_1.Schema({
    email: StringType,
    password: StringType,
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
