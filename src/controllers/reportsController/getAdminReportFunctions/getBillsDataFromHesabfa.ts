import {hesabfaApiRequest} from "../../utility/hesabfa/functions";

export const getBillsDataFromHesabfa = async (reqData: any) => {
    const temp = await hesabfaApiRequest("invoice/getinvoices", reqData)
    return temp
}