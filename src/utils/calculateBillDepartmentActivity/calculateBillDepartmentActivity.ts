import getSalesManListFromHesabfa from "../getSalesManListFromHesabfa";
import makeDataObject from "../ReportsUtils/reportFunctions/makeDataObject";

interface IsaleMan {
    Code?: string,
    Name?: string,
    Active?: boolean,
}


type ISalesMansArray = IsaleMan[]
const calculateBillDepartmentActivity = async (billItems: any[]) => {

    const salesManListArray: ISalesMansArray = await getSalesManListFromHesabfa()

    // اینجا لیست رو داریم حالا باید بریم روی کل دیتا لوپ بزنیم و  اطلاعاتی که میخوایم رو جدا کنیم و بریزیم توی آرایه و  آخرش بفرستم توی ریترن
    const resultData: any = []
    salesManListArray.forEach(singleSaleMan => {
        const salesmanBills = billItems.filter(row => row.mySeller === singleSaleMan.Code)
        const result = makeDataObject({totalData: salesmanBills});
        resultData.push({
            name: singleSaleMan.Name,
            code: singleSaleMan.Code,
            data: result
        })
    })


    return resultData

}
export default calculateBillDepartmentActivity