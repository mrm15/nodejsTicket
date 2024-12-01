import {getBillsDataFromPoolBill} from "../../getBillsDataFromPoolBill/getBillsDataFromPoolBill";
import {handleFindUserAndCalculate} from "./helper";
import getRowsOfInvoiceItemsFromBills
    , {INeededObject} from "../../../controllers/reportsController/getAdminReportFunctions/getRowsOfBills";
import {calculateSingleObject} from "../../ReportsUtils/reportFunctions/calculatePivotById";

const myKey = "myItemCode"
const sumKey = "myTotalAmount"
const countKey = "myQuantity";
const getBankingDataByCode = async ({filters}: any ,usersAndCodes:any[]) => {
    const keys = {myKey, sumKey, countKey,}



    // مرحله ی دوم برو از توی کل تیکت ها اونایی که شماره تیکتشون با اون شماره تیکت ها یکی رو پیدا کن بیار واسم


    const allBills = await getBillsDataFromPoolBill({filters});

    const allRowsWithItems: INeededObject[] = getRowsOfInvoiceItemsFromBills(allBills)


    const resultOfCalculation = usersAndCodes.map((singleUser) => {

        const temp: any = {
            name: singleUser.name,
            value: "",
        }
        const totalData: INeededObject[] = []
        allRowsWithItems.forEach(singleRowOfItem => {
            const didFind = singleUser.codes.some((code: string | number) => singleRowOfItem.myContactTitle.includes(code + ""));

            if (didFind) {

                totalData.push(singleRowOfItem)
            }
        })

        const rrr = calculateSingleObject(totalData, {
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
            ]
        })
        temp.value = rrr.value
        return temp
    })


    return resultOfCalculation;
};

export default getBankingDataByCode;
