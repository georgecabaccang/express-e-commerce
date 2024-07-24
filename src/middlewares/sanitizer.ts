import { NextFunction, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

const sanitizeString = <K>(string: string): string => {
    // remove line breaks
    const removeLineBreaks = string.replace(/(\r\n|\n|\r)/gm, "");

    // remove all types of spaces
    const removeSpaces = removeLineBreaks.replace(/ /g, "").replace(/\s/g, "");

    // remove white space for good measure
    const strippedString = removeSpaces.trim();

    // sanitize string
    const cleanString = sanitizeHtml(strippedString);

    // retrun sanitized string
    return cleanString;
};

export const sanitizer = <T>(request: Request, response: Response, next: NextFunction) => {
    // combine requests parts for complete url request
    const completeURL = request.protocol + "://" + request.get("host") + request.originalUrl;
    const body = request.body as { [key: string]: T };

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
            const cleanedString = sanitizeString(objectProperty) as T;

            // assign newly sanitized value back to key
            body[property] = cleanedString;
        }
    }
    next();
};
