import {hesabfaApiRequest} from "../../utility/hesabfa/functions";

export const getBillsDataFromHesabfa = async (reqData: any) => {
    const temp:any = await hesabfaApiRequest("invoice/getinvoices", reqData)
    debugger
    if(!temp?.response?.data?.Result){
        throw new Error("حسابفا پاسخگو نیست!")
    }
    return temp
}