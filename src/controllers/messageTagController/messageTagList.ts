import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Role} from "../../models/roles";
import {IMessageTag, messageTag} from "../../models/messageTag";


const messageTagList = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    // res.status(201).json({myToken})
    //
    // return


    try {
        const tagList: IMessageTag[] | null = await messageTag.find({}).lean()

        // just show Active Items
        const activeTagList = tagList.filter(row => row.isActive)

        // sort Items by  messageTagCode
        const sortedActiveTagList = activeTagList.sort((a, b) => Number(a.messageTagCode) - Number(b.messageTagCode));

        const list = sortedActiveTagList.map(row => {
            return {
                value: row.id ? row.id : row._id,
                key: row.name
            }
        })


        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {messageTagList};
