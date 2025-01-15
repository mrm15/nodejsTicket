import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {IUser, User} from '../models/User';
import {getUserInfoByPhoneNumber} from "./LoginRegisterSms/getUserInfoByPhoneNumber";
import {generateAccessToken, generateRefreshToken} from "./LoginRegisterSms/generateAccessToken";
import {getUserAgentData} from "./LoginRegisterSms/getUserAgentData";
import {getCurrentTimeStamp} from "../utils/timing";
import {getRoleAccessList} from "./LoginRegisterSms/getRoleAccessList";
import {clearJwtCookie, setJwtCookie} from "./utility/cookieHelpers/cookieHelpers";
import {addLog} from "../utils/logMethods/addLog";

const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {

        res.status(401).json({message: "handleRefreshToken Not Found User"});
        return
    }
    const refreshToken = cookies?.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        if (err) {
            res.status(403).json({error: err}); // Forbidden
            return
        }
        let phoneNumber = '';
        phoneNumber = decoded.phoneNumber
        const foundUser: IUser | null = await User.findOne({phoneNumber}).exec();
        // clearJwtCookie(res)
        if (!foundUser) {
            res.status(403).json({error: 'کاربری با مشخصات موجود در  توکن یافت نشد'})
            return
        }


        const newTokensArray = foundUser.tokens.filter(rt => rt.refreshToken !== refreshToken);
        const refreshToken1 = await generateRefreshToken(foundUser.phoneNumber)
        const {os, ip, useragent, loginTime} = getUserAgentData(req)
        const newToken = {refreshToken: refreshToken1, os, ip, useragent, loginTime}
        foundUser.tokens = [...newTokensArray, newToken]
        try {
            const result = await foundUser.save()
            setJwtCookie(res, refreshToken)
            const accessToken = await generateAccessToken(foundUser.phoneNumber)
            const userInfo = await getUserInfoByPhoneNumber(phoneNumber)
            await addLog({
                req: req,
                phoneNumber: phoneNumber,
                name:foundUser?.name + " " + foundUser?.familyName,
                description: "ورود با رفرش توکن",
                statusCode: 200,
            })
            res.status(200).json({userInfo, accessToken});
            return;

        } catch (error: any) {
            if (error.code === 11000) {
                console.error('VersionError: Document version mismatch');
                res.status(401).json({error: 'توکن کاربر ذخیره نشد'})

            } else {
                console.error('Error saving document:', error);
                res.status(401).json({error: 'توکن کاربر ذخیره نشد'})
            }
        }

    })
    return

    // ======================================================
    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
    //     if (err) {
    //         res.status(403).json({error: err}); // Forbidden
    //         return
    //     }
    //     phoneNumber = decoded.phoneNumber;
    //
    // });


    // res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true});
    // clearJwtCookie(res)

    // const foundUser: IUser | null = await User.findOne({phoneNumber}).exec();


    // Detected refresh token reuse!


    // if (!foundUser) {
    //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, callbackIfUserHacked);
    //     res.status(403).json({error: 'کاربری با مشخصات موجود در  توکن یافت نشد'})
    //     return
    // }

}

export {handleRefreshToken};
