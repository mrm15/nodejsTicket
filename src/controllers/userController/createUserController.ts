import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {File, IFile} from "../../models/files";
import {getCurrentTimeStamp} from "../../utils/timing";



const createUserController = (req: Request, res: Response, next: NextFunction) => {


    const myToken = req.body;
    // const newUser = new User({})

    res.status(200).json({message:myToken})
    debugger
    const saveFileToDataBase = async (myToken: {
        phoneNumber: any;
    }, fileDetails: Express.Multer.File | undefined, tag: string) => {

        const {phoneNumber} = myToken;


        const foundUser: IUser = (await User.findOne({phoneNumber}).exec())!;
        const currentTimestamp = getCurrentTimeStamp()
        const userId = foundUser.id
        const newFile: IFile = new File({
            fileName: fileDetails?.originalname || "",
            fileType: fileDetails?.mimetype || "",
            fileSize: fileDetails?.size || '',
            userId,
            uploadDate: currentTimestamp,
            filePath: fileDetails?.filename || "",
            description: "",
            tag,
            downloadCount: 0,
            createAt: currentTimestamp,
            updateAt: currentTimestamp,
        });

        const result = await newFile.save()
        return result.id
    }



};

export {createUserController};
