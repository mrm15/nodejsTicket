import {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import path from 'path';
import {IUser, User} from "../../models/User";
import {File, IFile} from "../../models/files";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, '../../../uploads');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

// Initialize multer with the defined storage configuration
const myUpload = multer({storage: storage});

const handleUpload = (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if(!myToken){
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    const saveFileToDataBase = async (myToken: {phoneNumber: any;}, fileDetails: Express.Multer.File | undefined, tag: string) => {

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


    // Initialize multer upload process within the function
    const upload = myUpload.single("singleFile");
    // Pre-upload processing can be done here
    // For example, checking the token or any other request validations
    // If everything is okay, proceed with the file upload
    upload(req, res, async function (err) {

        if (err instanceof multer.MulterError) {
            // Handle multer-specific errors
            return res.status(500).json({message: err.message});
        } else if (err) {
            // Handle other errors
            return res.status(500).json({message: "An error occurred during the file upload."});
        }
        const fileDetails = req.file;
        const tag = req.body.tag
        const resultId = await saveFileToDataBase(myToken, fileDetails, tag)
        // File is successfully uploaded at this point
        // Proceed with any post-upload processing here
        res.status(200).json({
            message: 'فایل با موفقیت بارگزاری شد.',
            id:resultId, // Access uploaded file details via req.file
        });
    });
};

export {handleUpload};
