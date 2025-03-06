// uploadController.ts
import { NextFunction, Response } from 'express';
import multer, { MulterError } from 'multer';
import path from 'path';
import { CustomRequestMyTokenInJwt } from "../../middleware/verifyJWT";
import {uploadToFtp} from "../../utils/uploadUtil/uploadToFtp";
import {saveFileToDataBase} from "../../utils/uploadUtil/saveFileToDataBase";


// Use Multer's memory storage since we won't save files locally.
const storage = multer.memoryStorage();
const myUpload = multer({ storage: storage });

// Helper function to convert filename encoding if needed
const convertToPersian = (fileName: string | { [Symbol.toPrimitive](hint: "string"): string }): string => {
    return Buffer.from(fileName as string, 'latin1').toString('utf-8');
};

const handleUpload = (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction): void => {
    const { myToken } = req;
    if (!myToken) {
        res.status(403).json({ message: 'مقدار توکن توی ری کوئست موجود نیست' });
        return;
    }

    const upload = myUpload.single("singleFile");

    upload(req, res, async (err: any) => {
        if (err instanceof MulterError) {
            res.status(500).json({ message: err.message });
            return;
        } else if (err) {
            res.status(500).json({
                message: "An error occurred during the file upload.",
                err: err.toString(),
            });
            return;
        }

        const fileDetails = req.file;
        if (!fileDetails || !fileDetails.buffer) {
            res.status(409).json({ message: 'جزئیات فایل ارسالی کامل نیست.', id: '' });
            return;
        }

        if (fileDetails.originalname) {
            fileDetails.originalname = convertToPersian(fileDetails.originalname);
        }

        const tag: string = req.body.tag || "";
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const remoteFileName = uniqueSuffix + '-' + fileDetails.originalname;

        try {
            // Upload file to FTP server
            await uploadToFtp({fileBuffer:fileDetails.buffer, remoteFileName});
            // Save file metadata in the database
            const resultId = await saveFileToDataBase(myToken, remoteFileName, fileDetails, tag);
            res.status(200).json({ message: 'فایل با موفقیت بارگزاری شد.', id: resultId });
        } catch (error:any) {
            console.error("Error during FTP upload:", error);
            res.status(500).json({ message: 'FTP upload failed', error: error?.toString() });
        }
    });
};

export { handleUpload };
