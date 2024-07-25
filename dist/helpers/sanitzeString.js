"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function sanitizeString(string) {
    // remove line breaks
    const removeLineBreaks = string.replace(/(\r\n|\n|\r)/gm, "");
    // remove all types of spaces
    const removeSpaces = removeLineBreaks.replace(/ /g, "").replace(/\s/g, "");
    // remove white space for good measure
    const strippedString = removeSpaces.trim();
    // replace < and > with entity equivalent
    const removedBrackets = strippedString.replace("<", "&lt;").replace(">", "&gt;");
    // further sanitize for good meassure
    const cleanString = (0, sanitize_html_1.default)(removedBrackets);
    // retrun sanitized string
    return cleanString;
}
exports.default = sanitizeString;
