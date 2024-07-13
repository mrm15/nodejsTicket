import {AxiosResponse} from 'axios';
import {Response} from 'express';

interface hesabfaResponse {
    Success: Boolean,
    ErrorCode: number,
    ErrorMessage: string,
    Result: {
        [key: string]: any;
    } | null,
}

export const handleResponse = (result: AxiosResponse, res: Response, newObjectData = {}) => {

    let mainResponse: hesabfaResponse = {
        Success: false,
        ErrorCode: 0,
        ErrorMessage: "ErrorMessage",
        Result: null,
    }


    if (result.status === 200) {

        mainResponse = result.data


        if (mainResponse.Success) {

            const myRes = {
                message: 'اطلاعات بارگزاری شد',
                data: mainResponse.Result,
                ...newObjectData
            }

            res.status(200).json(myRes);
        } else {
            res.status(500).json({
                message: result.data.ErrorMessage
            });
        }
    } else {
        res.status(500).json({
            message: result.statusText,
        });
    }
};
