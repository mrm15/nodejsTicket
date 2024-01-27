import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {IUser, User} from '../models/User';
import {getUserInfoByPhoneNumber} from "./LoginRegisterSms/getUserInfoByPhoneNumber";
import {generateAccessToken, generateRefreshToken} from "./LoginRegisterSms/generateAccessToken";
import {getUserAgentData} from "./LoginRegisterSms/getUserAgentData";
import {getCurrentTimeStamp} from "../utils/timing";
import {getRoleAccessList} from "./LoginRegisterSms/getRoleAccessList"; // Adjust the path and import as per your project structure

const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(401);
        return
    }
    const refreshToken = cookies.jwt;

    let phoneNumber = '';


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        if (err) {
            res.status(403).json({error: err}); // Forbidden
            return
        }
        phoneNumber = decoded.phoneNumber
    });


    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true});


    const foundUser: IUser | null = await User.findOne({phoneNumber}).exec();
    debugger

    // Detected refresh token reuse!
    const callbackIfUserHacked = async (err: any, decoded: any) => {
        if (err) {
            res.status(403).json({error: err}); // Forbidden
            return
        }
        //console.log('attempted refresh token reuse!');
        const hackedUser = await User.findOne({phoneNumber: decoded?.phoneNumber}).exec();
        if (hackedUser) {
            hackedUser.tokens = [];
            const result = await hackedUser.save();
            //console.log(result);
        }
    }

    if (!foundUser) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, callbackIfUserHacked);
        res.status(403).json({error: 'کاربری با مشخصات موجود در  توکن یافت نشد'})
        return
    }


    const newTokensArray = foundUser.tokens.filter(rt => rt.refreshToken !== refreshToken);

    // evaluate jwt

    const callBack = async (err: any, decoded: any) => {
        if (err) {
            console.log('expired refresh token');
            foundUser.tokens = [...newTokensArray];
            const result = await foundUser.save();
            console.log(result);
            res.sendStatus(403);
            return
        }

        // Refresh token was still valid


        const refreshToken = await generateRefreshToken(foundUser.phoneNumber)


        const {os, ip, useragent, loginTime} = getUserAgentData(req)

        const newToken = {refreshToken, os, ip, useragent, loginTime}

        // Saving refreshToken with current user
        foundUser.tokens = [...newTokensArray, newToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        const accessToken = await generateAccessToken(foundUser.phoneNumber)
        const userInfo = await getUserInfoByPhoneNumber(phoneNumber)
        res.json({userInfo, accessToken});
        return;

    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, callBack);


}

export {handleRefreshToken};
