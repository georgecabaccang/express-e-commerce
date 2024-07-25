"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizer = void 0;
const sanitzeString_1 = __importDefault(require("../helpers/sanitzeString"));
const sanitizer = (request, response, next) => {
    // combine requests parts for complete url request
    const completeURL = request.protocol + "://" + request.get("host") + request.originalUrl;
    const body = request.body;
    // check url if has angle brackets, reject if true
    if (completeURL.includes("<") || completeURL.includes(">")) {
        return response.status(403).send("forbidden");
    }
    // check if body has properties or not undefined
    if (Object.keys(body).length || !body) {
        for (const property in body) {
            // convert value of property to string
            const objectProperty = `${body[property]}`;
            // sanitize value
            const cleanedString = (0, sanitzeString_1.default)(objectProperty);
            // assign newly sanitized value back to key
            body[property] = cleanedString;
        }
    }
    next();
};
exports.sanitizer = sanitizer;
