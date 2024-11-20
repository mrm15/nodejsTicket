import jwt from "jsonwebtoken";
import {getUserTickets, getDepartmentTickets, getAllTickets} from "./ticketQueries";
import {validateFilters, validateType, parseFilters} from "./validation";
import {getBillsDataFromPoolBill} from "../../getBillsDataFromPoolBill/getBillsDataFromPoolBill";

interface inputType {
    type: "user" | "department" | "all";
    filters: { uniqId: string; Property: string; Operator: string; Value: any }[];
    myToken: any;
}

const getBankingData = async ({type, filters, myToken}: inputType) => {
    debugger
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
    let result;
    switch (type) {
        case "user":
            result = await getUserTickets(phoneNumber, queryFilters)
            break;
        case "department":
            result = await getDepartmentTickets(queryFilters);
            break;
        case "all":
            result = await getAllTickets(queryFilters);
            break;
        default:
            throw new Error("Invalid type provided.");
    }

    console.log(queryFilters)
    const filterArray = []
    if (queryFilters.Status !== undefined) {
        filterArray.push({
            Property: "Status",
            Value: queryFilters.Status,
            Operator: "=",
        })
    }
    debugger
    // اینجا باید کل دیتای فاکتور ها رو بگیرم
    const allBills = await getBillsDataFromPoolBill({filters: filterArray})
    debugger
    // روی آرایه ای از آبجکت هایی که اومده باید لوپ بزنم
    // و اجرت ها رو جدا کنم

    // Step 5: Return the aggregated data
    return result;
};

export default getBankingData;
