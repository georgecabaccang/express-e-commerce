"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailValidator = __importStar(require("email-validator"));
const sanitzeString_1 = __importDefault(require("../helpers/sanitzeString"));
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,20}$/;
// checks client email and password are valid when compared to restrictions
const validateEmailAndPassword = (request, response, next) => {
    const clientInput = request.body;
    // validate emaiil
    const isValidEmail = EmailValidator.validate(clientInput.email);
    const isvalidPassword = checkPassword(clientInput.password);
    // check if password has at least one number, one lowercase, one uppercase, one special character
    // and has a leng of 8 to 20.
    function checkPassword(password) {
        if (password.match(PASSWORD_REGEX) !== null) {
            return true;
        }
        return false;
    }
    // check if email is valid, return response of 422 if false
    if (!isValidEmail) {
        return response.status(422).send({ status: 422, message: "invalid_email_format" });
    }
    // check if password is valid, return response of 422 if false
    if (!isvalidPassword) {
        return response.status(422).send({ status: 422, message: "invalid_password_format" });
    }
    // sanitize and re-assign cleansed password string
    clientInput.password = (0, sanitzeString_1.default)(clientInput.password);
    next();
};
exports.default = validateEmailAndPassword;
