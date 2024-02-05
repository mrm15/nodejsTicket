import express, {Request, Response, NextFunction, Request as ExpressRequest} from 'express';
import * as uploadController from '../../controllers/handleUplaodController/uplaod';

import multer from 'multer';
import path from "path";
import {JwtPayload} from "jsonwebtoken";

const router = express.Router();

interface CustomRequest extends ExpressRequest {
    fileDetails?: any[]
}

// Start by creating some disk storage options:
const storage = multer.diskStorage({

    destination: function (req, file, cb) {


        const uploadDir = path.resolve(__dirname, '../../../uploads');

        cb(null, uploadDir); // Set your upload destination
    },
    filename: function (req: CustomRequest, file, cb) {


        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = uniqueSuffix + '-' + file.originalname;
        cb(null, fileName);

        // Optionally add file details to the request object for access in subsequent middleware
        if (!req.body.fileDetails) {
            req.body.fileDetails = [];
        }
        req.body.fileDetails.push({
            fileName: fileName || '',
            mimeType: file.mimetype || '',
            originalName: file.originalname || '', // Original name of the file
            path: file.path || '', // Full path to the uploaded file
            size: file.size || '',

        });
    },
});

const myUpload = multer({storage: storage})


//
// Wrapping multer with custom middleware
// const multerMiddleware = (req: Request, res: Response, next: NextFunction) => {
//
//
//     // console.log("req.myToken")
//     // console.log(req?.myToken);
//     const myToken = req.myToken
//
//     const upload = myUpload.single("singleFile");
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading.
//             return res.status(500).json({message: err.message});
//         } else if (err) {
//             // An unknown error occurred when uploading.
//             return res.status(500).json({message: "An error occurred during the file upload."});
//         }
//         // If no errors, proceed to the next middleware
//
//         req.body = {...req.body, myToken: {...myToken}}
//         next();
//     });
// };
//
router.post('/', uploadController.handleUpload);

// router.post('/',  uploadController.handleUpload);


export default router;
