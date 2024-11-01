import {hesabfaApiRequest} from "../controllers/utility/hesabfa/functions";

const getSalesManListFromHesabfa = async () => {
    const result: any = await hesabfaApiRequest("setting/GetSalesmen", [])
    const salesMasArrayList: {}[] = result?.response?.data?.Result
    return salesMasArrayList
}
export default getSalesManListFromHesabfa