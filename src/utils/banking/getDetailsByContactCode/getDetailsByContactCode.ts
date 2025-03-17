import {getBillsDataFromPoolBill} from "../../getBillsDataFromPoolBill/getBillsDataFromPoolBill";
import getRowsOfInvoiceItemsFromBills, {
    INeededObject
} from "../../../controllers/reportsController/getAdminReportFunctions/getRowsOfBills";
import {
    calculateSingleObject,
    calculateSingleObjectSeperatedByContactCode
} from "../../ReportsUtils/reportFunctions/calculatePivotById";

const myKey = "myItemCode"
const sumKey = "myTotalAmount"
const countKey = "myQuantity";
export const getDetailsByContactCode=async ({filters}:any)=>{


    const keys = {myKey, sumKey, countKey,}
    // مرحله ی دوم برو از توی کل تیکت ها اونایی که شماره تیکتشون با اون شماره تیکت ها یکی رو پیدا کن بیار واسم
    const allBills = await getBillsDataFromPoolBill({filters});
    const allRowsWithItems: INeededObject[] = getRowsOfInvoiceItemsFromBills(allBills)
    const seperatedByContactCode = calculateSingleObjectSeperatedByContactCode(allRowsWithItems, {
        caption: "متراژ ساخت",
        id: "1",
        bgColor: "black",
        textColor: "white",
        ...keys,
        // متراژ ساخت که از مهندس امانزاده کد هاشو گرفتم
        filterIdForPivot: [
            "000068",
            "000080",
            "000081",
            "000146",
            "000158",
            "000159",
            "000235",
            "000251",
            "000252",
            "000253",
            "000381",
            "000435",
            "000493",
            "000494",
            "000495",
            "000496",
            "000811",
            "000801",
        ]
    })


    return seperatedByContactCode;
}