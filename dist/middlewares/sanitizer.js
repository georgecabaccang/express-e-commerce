"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizer = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const sanitizeString = (string) => {
    // remove line breaks
    const removeLineBreaks = string.replace(/(\r\n|\n|\r)/gm, "");
    // remove all types of spaces
    const removeSpaces = removeLineBreaks.replace(/ /g, "").replace(/\s/g, "");
    // remove white space for good measure
    const strippedString = removeSpaces.trim();
    // sanitize string
    const cleanString = (0, sanitize_html_1.default)(string);
    // retrun sanitized string
    return cleanString;
};
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
            const cleanedString = sanitizeString(objectProperty);
            // assign newly sanitized value back to key
            body[property] = cleanedString;
        }
    }
    next();
};
exports.sanitizer = sanitizer;
