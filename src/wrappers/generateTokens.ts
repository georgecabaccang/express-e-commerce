import { encrypt } from "../helpers/cipher";
import { sign } from "../helpers/token";
import IUser from "../interfaces/IUser";

export default function generateTokens(userData: IUser): {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
} {
    // create jwt token
    const accessToken = sign(
        { _id: userData._id!.toString(), email: userData.email },
        process.env.JWT_SECRET!,
        process.env.JWT_EXPIRATION!
    );

    // create refresh token
    const refreshToken = sign(
        { _id: userData._id!.toString(), email: userData.email },
        process.env.REFRESH_SECRET!,
        "9999999d"
    );

    // create copy of accessToken without expiration
    const jwtTwin = sign(
        { _id: userData._id!.toString(), email: userData.email },
        process.env.JWT_SECRET!,
        "9999999d"
    );

    // create session token - - - encyprt with crypto
    const sessionToken = encrypt(jwtTwin);

    return { accessToken, refreshToken, sessionToken };
}
