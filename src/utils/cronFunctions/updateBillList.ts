import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import axios from "axios";
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import {hesabfaApiRequest} from "../../controllers/utility/hesabfa/functions";

export const updateBillList = async () => {
    try {

        const result = await hesabfaApiRequest("invoice/getinvoices", {
            type: 0,
            queryInfo:{
                // SortBy: 'Date',
                SortBy: 'Number',
                SortDesc: true,
                Take: 1500,
                Skip: 0
            }
        })

        if (result.response) {
            // Save products to JSON file
            const bills = result.response.data?.Result?.List || [];
            const filePath = path.join(__dirname, '../../assets/billList.json');


           // Check if file exists and delete it
           //  if (fs.existsSync(filePath)) {
           //      fs.unlinkSync(filePath);
           //  }

            // Write new data to the file
            fs.writeFileSync(filePath, JSON.stringify(bills, null, 2));
            // console.log("task Done! ")
        } else {
            // console.log("😭  unable Get Data ans Save ")
            // console.log("result Rsponse is Undefiend")
        }
    } catch (error: any) {
        // console.log("😭  unable Get Data ans Save ")
        // console.log(error?.toString())
    }

}




