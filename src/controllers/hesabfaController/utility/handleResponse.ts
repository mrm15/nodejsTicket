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

export const handleResponse = (result: AxiosResponse, res: Response) => {

    let mainResponse: hesabfaResponse = {
        Success: false,
        ErrorCode: 0,
        ErrorMessage: "ErrorMessage",
        Result: null,
    }


    if (result.status === 200) {

        mainResponse = result.data


        if (mainResponse.Success) {
            res.status(200).json({
                message: 'اطلاعات بارگزاری شد',
                data: mainResponse.Result
            });
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
