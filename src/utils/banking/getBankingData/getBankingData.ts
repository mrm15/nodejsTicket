import {getDepartmentTickets, getAllTickets, getUserTickets} from "./ticketQueries";
import {validateFilters, validateType, parseFilters} from "./validation";
import {getBillsDataFromPoolBill} from "../../getBillsDataFromPoolBill/getBillsDataFromPoolBill";
import getRowsOfInvoiceItemsFromBills
    from "../../../controllers/reportsController/getAdminReportFunctions/getRowsOfBills";
import {calculateSingleObject} from "../../ReportsUtils/reportFunctions/calculatePivotById";

interface inputType {
    type: "user" | "department" | "all";
    filters: { uniqId: string; Property: string; Operator: string; Value: any }[];
    myToken: any;
}

const getBankingData = async ({type, filters, myToken}: inputType) => {

    // Step 1: Validate input
    validateType(type)
    validateFilters(filters)

    // Step 2: Parse token to extract phoneNumber
    const {phoneNumber} = myToken
    if (!phoneNumber) {
        throw new Error("Invalid token: Phone number not found.");
    }

    // Step 3: Parse filters into a MongoDB-compatible query
    const queryFilters = parseFilters(filters);

    // Step 4: Fetch data based on type
    let result: { name: string; data: any[] }[]
    switch (type) {
        case "user":
            result = await getUserTickets(phoneNumber, queryFilters)
            break;
        // case "department":
        //     result = await getDepartmentTickets(queryFilters);
        //     break;
        // case "all":
        //     result = await getAllTickets(queryFilters);
        //     break;
        default:
            throw new Error("Invalid type provided.");
    }


    // مرحله ی دوم برو از توی کل تیکت ها اونایی که شماره تیکتشون با اون  شماره تیکت ها یکی رو پیدا کن بیار واسم


    const allBills = await getBillsDataFromPoolBill({filters: []});


    // Loop through all bills and check if their `Number` matches any `billNumber` in `result`
    const tempWithNameAndBills: { name: string; data: any[] }[] = []
    result.forEach(row => {

        const findedBills: typeof allBills = []; // Create an empty array to store matching bills

        allBills.forEach(singleBill => {
            if (row.data.includes(singleBill.Number)) {
                findedBills.push(singleBill); // Push the matching bill into `findedBills`
            }
        });
        tempWithNameAndBills.push({
            name: row.name,
            data: findedBills
        })
    })

// Debug and return the result

    //تا اینجا من کل  فاکتور ها رو دارم و حالا باید آیتم هاشو بگیرم و اجرت ها رو جدا کنم

    const tempWithNameAndBillsNew = tempWithNameAndBills.map(row => {

        return {
            name: row.name,
            data: getRowsOfInvoiceItemsFromBills(row.data)
        }
    })


    const myKey = "myItemCode"
    const sumKey = "myTotalAmount"
    const countKey = "myQuantity";
    const keys = {myKey, sumKey, countKey,}

    const filterIdForPivot = [
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
        "000365",
        "000381",
        "000435",
        "000493",
        "000494",
        "000495",
        "000496",
    ]

    const tempWithNameAndBillsNew2 = tempWithNameAndBillsNew.map(row => {


        return {
            name: row.name,
            data: calculateSingleObject(row.data, {
                caption: "اجرت ساخت",
                id: "1",
                bgColor: "black",
                textColor: "white",
                ...keys,
                filterIdForPivot
            })

        }
    })
    return tempWithNameAndBillsNew2;
};

export default getBankingData;
