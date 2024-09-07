import {getUserInfoByPhoneNumber} from "./getUserInfoByPhoneNumber";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import {getUserAgentData} from "./getUserAgentData";
import {getRoleAccessList} from "./getRoleAccessList";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = async (phoneNumber: string) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

    if (!ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    if (!ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }


    //const roles = Object.values(foundUser?.userInfo?.roleAccessList);
    //const userInfo = getUserInfoByPhoneNumber(foundUser.phoneNumber)

    const roleAccessList = await getRoleAccessList(phoneNumber)

    const userData = await getUserInfoByPhoneNumber(phoneNumber)

    const accessToken = jwt.sign(
        {
            data: "I am accessToken!!! valid for short Time",
            phoneNumber,
            UserInfo: {userData, roleAccessList},
        },
        ACCESS_TOKEN_SECRET, {expiresIn: '10d'}
    );

    // const accessToken1 = jwt.sign(
    //     {
    //         "UserInfo": userInfo
    //     },
    //     process.env.ACCESS_TOKEN_SECRET!,
    //     {expiresIn: '3600s'}
    // )
    return accessToken
}
export const generateRefreshToken = async (phoneNumber: string): Promise<string> => {


    if (!REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }


    const refreshToken = jwt.sign(
        {
            data: "I am REFRESH_TOKEN! valid for long time",
            phoneNumber,
            UserInfo: {phoneNumber}
        },
        REFRESH_TOKEN_SECRET,
        {expiresIn: '100d'}
    );
    return refreshToken
}
