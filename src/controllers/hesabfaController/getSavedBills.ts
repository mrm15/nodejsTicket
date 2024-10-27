import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {readBillsData} from "../../utils/getBillsDataFromPoolBill/readBillsData";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";


const getSavedBills = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست';
        res.status(200).json({message});
        return;
    }
    const arrayListToCheck = [
        ACCESS_LIST.fatherAccess
    ]
    const hasAccessFatherAccess = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

    if (!hasAccessFatherAccess) {
        res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
        return
    }


    try {

        const allBills = await readBillsData()

        res.status(200).json({
            data: allBills,
            message: ""

        });

    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {getSavedBills};