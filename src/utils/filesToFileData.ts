import {File, IFile} from "../models/files";

export const filesToFileData = async (filesArray: any[]) => {
    // Check if filesArray is not an array
    if (!Array.isArray(filesArray)) {
        throw new Error('Input is not an array');
    }

    // Check if filesArray is empty
    if (filesArray.length === 0) {
        return [];
    }

    try {
        const tempFilesArray = await Promise.all(filesArray.map(async (fileId) => {
            const fileObject: IFile | null = await File.findOne({_id: fileId}).lean();
            if (!fileObject) {
                throw new Error(`File not found for ID: ${fileId}`);
            }
            const {fileName, fileSize, filePath, fileType} = fileObject;
            return {fileName, fileSize, filePath, fileType};
        }));
        return tempFilesArray;
    } catch (error) {
        // Handle any errors that occurred during file retrieval
        console.error('Error fetching file data:', error);
        throw new Error('Error fetching file data');
    }
};
