import "dotenv/config";
import crypto from "crypto";

export const encrypt = (string: string): string => {
    let cipher = crypto.createCipheriv(
        process.env.CIPHER_ALGO!,
        process.env.CIPHER_SECRET!,
        process.env.CIPHER_IV!
    );

    let encrypted = cipher.update(string, "utf-8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
};

export const decrypt = (string: string): string => {
    let decipher = crypto.createDecipheriv(
        process.env.CIPHER_ALGO!,
        process.env.CIPHER_SECRET!,
        process.env.CIPHER_IV!
    );
    let decrypted = decipher.update(string, "base64", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};
