import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Role} from "../../models/roles";
import {Department} from "../../models/department";
import {Status} from "../../models/status";


const ticketList = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }



    try {
        const listFromCollection = await Status.find({}).exec();
        const list = listFromCollection.map((row:any) => {

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

export {ticketList};
