import * as EmailValidator from "email-validator";
import { NextFunction, Request, Response } from "express";

interface ICilentInput {
    email: string;
    password: string;
}

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,20}$/;

// checks client email and password are valid when compared to restrictions
const validateEmailAndPassword = (request: Request, response: Response, next: NextFunction) => {
    const clientInput: ICilentInput = request.body;

    // validate emaiil
    const isValidEmail = EmailValidator.validate(clientInput.email);
    const isvalidPassword = checkPassword(clientInput.password);

    // check if password has at least one number, one lowercase, one uppercase, one special character
    // and has a leng of 8 to 20.
    function checkPassword(password: string): boolean {
        if (password.match(PASSWORD_REGEX) !== null) {
            return true;
        }
        return false;
    }

    // replace angle brackets with the UTF-8 equivalents
    function replaceAngleBrackets(password: string): string {
        const cleansedPassword = password.replace("<", "%3C").replace(">", "%3E");
        return cleansedPassword;
    }

    // check if email is valid, return response of 422 if false
    if (!isValidEmail) {
        return response.status(422).send({ status: 422, message: "invalid_email_format" });
    }

    // check if password is valid, return response of 422 if false
    if (!isvalidPassword) {
        return response.status(422).send({ status: 422, message: "invalid_password_format" });
    }

    // re-assign cleansed password string
    clientInput.password = replaceAngleBrackets(clientInput.password);
    next();
};

export default validateEmailAndPassword;
