// fileDatabase.ts
import { IUser, User } from "../../models/User";
import { File, IFile } from "../../models/files";
import {getCurrentTimeStamp} from "../timing";

/**
 * Saves file metadata to the database.
 * @param myToken An object containing user information (e.g., phoneNumber).
 * @param remoteFileName The remote file name (or path) stored on the FTP server.
 * @param fileDetails Details of the uploaded file from Multer.
 * @param tag A tag or description for the file.
 * @returns The ID of the saved file record.
 */
export async function saveFileToDataBase(
    myToken: { phoneNumber: any },
    remoteFileName: string,
    fileDetails: Express.Multer.File,
    tag: string
): Promise<string> {
    const { phoneNumber } = myToken;
    const foundUser: IUser | null = await User.findOne({ phoneNumber }).exec();
    if (!foundUser) throw new Error("User not found");

    const currentTimestamp = getCurrentTimeStamp();
    const userId = foundUser.id;

    const newFile: IFile = new File({
        fileName: fileDetails.originalname || "",
        fileType: fileDetails.mimetype || "",
        fileSize: fileDetails.size || 0,
        userId,
        uploadDate: currentTimestamp,
        filePath: remoteFileName, // Save the FTP remote file path
        description: "",
        tag,
        downloadCount: 0,
        createAt: currentTimestamp,
        updateAt: currentTimestamp,
    });

    const result = await newFile.save();
    return result.id;
}
