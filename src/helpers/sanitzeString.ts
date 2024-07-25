import sanitizeHtml from "sanitize-html";

export default function sanitizeString(string: string): string {
    // remove line breaks
    const removeLineBreaks = string.replace(/(\r\n|\n|\r)/gm, "");

    // remove all types of spaces
    const removeSpaces = removeLineBreaks.replace(/ /g, "").replace(/\s/g, "");

    // remove white space for good measure
    const strippedString = removeSpaces.trim();

    // replace < and > with entity equivalent
    const removedBrackets = strippedString.replace("<", "&lt;").replace(">", "&gt;");

    // further sanitize for good meassure
    const cleanString = sanitizeHtml(removedBrackets);

    // retrun sanitized string
    return cleanString;
}
