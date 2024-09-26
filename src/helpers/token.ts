import jwt from "jsonwebtoken";

export const sign = (data: { [key: string]: string }, key: string, exp?: string): string => {
    const token = jwt.sign(data, key, { expiresIn: exp });
    return token;
};

export const verify = <T>(token: string, key: string): T => {
    const data = jwt.verify(token, key) as T;
    return data;
};
