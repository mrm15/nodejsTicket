import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {clearJwtCookie} from "../utility/cookieHelpers/cookieHelpers";

const logoutController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;

debugger
    // res.status(201).json({myToken})
    //
    // return

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {


        const {phoneNumber} = myToken


        const foundUser: IUser | null = await User.findOne({phoneNumber}).exec();

        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }


        let tokenArrayList = foundUser.tokens.slice();

        debugger


        // get RefreshToken
        if (req?.cookies?.jwt) {
            const refreshTokenInCookieJwt = req.cookies.jwt;

            let filteredTokenList = tokenArrayList?.filter(rt =>
                rt?.refreshToken !== refreshTokenInCookieJwt)

            // res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true});
            clearJwtCookie(res)


            foundUser.tokens = [...filteredTokenList];

            foundUser.updateAt = getCurrentTimeStamp();
        }

        try {
            await foundUser.save();

            res.json({message:'شما با موفقیت از سایت خارج شدید'});
            return;
        } catch (error) {
            res.status(401).json({error});
        }

    } catch (error) {

        res.status(500).json({
            error: error?.toString(),

        });
        return
    }


};

export {logoutController};
