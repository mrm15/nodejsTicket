import {unlink} from 'node:fs/promises';


export const removeFileFromServer = async (fileName: string) => {
    let result = {
        error: '',
        result: false
    }
    const filePath = '' + fileName;
    try {
        await unlink(filePath);
        result = {
            error: '',
            result: true
        }
        result.result = true
        return result
    } catch (error: any) {
        result.result = false
        result.error = error
        return result
    }
}

