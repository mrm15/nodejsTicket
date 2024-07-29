import axios from "axios";
import {timestampToTimeFromHesabfa} from "../timestampToTimeFromHesabfa";
import {p2e} from "../NumericFunction";

export const hesabfaApiRequest = async (method: string, data: any) => {

    const hesabfaBaseUrlRequest = "https://api.hesabfa.com/v1/";

    let hesabfaUrl = hesabfaBaseUrlRequest + method;
    const API_KEY = process.env.HESABFA_API_KEY;
    const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN;

    if (!API_KEY || !LOGIN_TOKEN) {
        return {
            message: "API_KEY Or LOGIN_TOKEN Not Found!",
            response: undefined,
        }
    }
    const postData = {
        apiKey: API_KEY,
        loginToken: LOGIN_TOKEN,
        ...data
    }
    const resultOfRequest = await axios.post(hesabfaUrl, postData);

    return {
        response: resultOfRequest,
    }
}

export const getHeaderAndRows = (incomeData: any) => {

    const DateToEnglish = (inputText: any) => {
        let result = timestampToTimeFromHesabfa(inputText)
        result = p2e(result);
        return result
    }
    //

    const changeTextTo = (inputNumber: any) => {

        return inputNumber === 0 ? "پیشنویس" : "تایید شده"
    }
    //


    const dataSheet2: any = []

    incomeData.forEach((row: any) => {
        let myTicketNumber = ""
        let mySeller = ""
        try {
            myTicketNumber = JSON.parse(row?.Tag)?.tn || "";
            mySeller = JSON.parse(row?.Tag)?.n || "";
        } catch (error) {
            myTicketNumber = ""
            mySeller = ""
        }

        const myContactName = row?.Contact?.Name
        const myContactCode = row.ContactCode
        const myContactTitle = row.ContactTitle
        dataSheet2.push({
            myContactName,
            myContactCode,
            myContactTitle,
            myDate:row.Date,
            myTotalAmount : row.Sum,
            myStatus:row.Status,
        })

        // row?.InvoiceItems.forEach((rowItem: any) => {
        //     dataSheet2.push({
        //         // ...row,
        //         // ...rowItem,
        //         myNumber: row.Number,
        //         myDate: row.Date,
        //         myContactCode,
        //         myContactName,
        //         myContactTitle,
        //         myItemCode: rowItem?.Item?.Code,
        //         myItemName: rowItem?.Item?.Name,
        //         myDescription: rowItem?.Description,
        //         myUnit: rowItem?.Unit,
        //         myQuantity: rowItem?.Quantity,
        //         myUnitPrice: rowItem?.UnitPrice,
        //         myDiscount: rowItem?.Discount,
        //         mySeller,
        //         myTicketNumber,
        //         myTax: rowItem?.Tax,
        //         myTotalAmount: rowItem?.TotalAmount, // اینحا ما جمع مربوط به همون آیتم رو فقط لازم داریم. نه جمع کل
        //         myStatus: row.Status,
        //         myCurrency: row.Currency,
        //     })
        // })
    })


    const headersSheet2 = [
        {title: "شماره فاکتور", key: "myNumber"},
        {title: "تاریخ", key: "myDate", task: DateToEnglish},
        {title: "کد شخص", key: "myContactCode"},
        {title: "نام شخص", key: "myContactName"},
        {title: "عنوان", key: "myContactTitle"},
        {title: "کد کالا", key: "myItemCode"},
        {title: "کالا", key: "myItemName"},
        {title: "شرح", key: "myDescription"},
        {title: "واحد", key: "myUnit"},
        {title: "تعداد", key: "myQuantity"},
        {title: "مبلغ واحد", key: "myUnitPrice"},
        {title: "تخفیف", key: "myDiscount"},
        {title: "فروشنده", key: "mySeller"},
        {title: "شماره سفارش", key: "myTicketNumber"},
        {title: "مالیات", key: "Tax"},
        {title: "مبلغ کل", key: "TotalAmount"},
        {title: "واحد پول", key: "myCurrency"},
        {title: "وضعیت", key: "myStatus", task: changeTextTo},
    ]


    const formattedDataSheet2 = dataSheet2.map((item: any) => {
        const newItem: { [key: string]: any } = {};
        headersSheet2.forEach((header) => {
            newItem[header.title] = header.task ? header.task((item)[header.key]) : (item)[header.key]
        })
        return newItem;
    })


    return {
        header: headersSheet2,
        rows: dataSheet2,
    }

}

export const getHeaderAndRowsDetails = (incomeData: any) => {

    const DateToEnglish = (inputText: any) => {
        let result = timestampToTimeFromHesabfa(inputText)
        result = p2e(result);
        return result
    }
    //

    const changeTextTo = (inputNumber: any) => {

        return inputNumber === 0 ? "پیشنویس" : "تایید شده"
    }
    //


    const dataSheet2: any = []

    incomeData.forEach((row: any) => {
        let myTicketNumber = ""
        let mySeller = ""
        try {
            myTicketNumber = JSON.parse(row?.Tag)?.tn || "";
            mySeller = JSON.parse(row?.Tag)?.n || "";
        } catch (error) {
            myTicketNumber = ""
            mySeller = ""
        }

        const myContactName = row?.Contact?.Name
        const myContactCode = row.ContactCode
        const myContactTitle = row.ContactTitle
        // dataSheet2.push({
        //     myContactName,
        //     myContactCode,
        //     myContactTitle,
        //     myDate:row.Date,
        //     myTotalAmount : row.Sum,
        //     myStatus:row.Status,
        // })

        row?.InvoiceItems.forEach((rowItem: any) => {
            dataSheet2.push({
                // ...row,
                // ...rowItem,
                myNumber: row.Number,
                myDate: row.Date,
                myContactCode,
                myContactName,
                myContactTitle,
                myItemCode: rowItem?.Item?.Code,
                myItemName: rowItem?.Item?.Name,
                myDescription: rowItem?.Description,
                myUnit: rowItem?.Unit,
                myQuantity: rowItem?.Quantity,
                myUnitPrice: rowItem?.UnitPrice,
                myDiscount: rowItem?.Discount,
                mySeller,
                myTicketNumber,
                myTax: rowItem?.Tax,
                myTotalAmount: rowItem?.TotalAmount, // اینحا ما جمع مربوط به همون آیتم رو فقط لازم داریم. نه جمع کل
                myStatus: row.Status,
                myCurrency: row.Currency,
            })
        })
    })


    const headersSheet2 = [
        {title: "شماره فاکتور", key: "myNumber"},
        {title: "تاریخ", key: "myDate", task: DateToEnglish},
        {title: "کد شخص", key: "myContactCode"},
        {title: "نام شخص", key: "myContactName"},
        {title: "عنوان", key: "myContactTitle"},
        {title: "کد کالا", key: "myItemCode"},
        {title: "کالا", key: "myItemName"},
        {title: "شرح", key: "myDescription"},
        {title: "واحد", key: "myUnit"},
        {title: "تعداد", key: "myQuantity"},
        {title: "مبلغ واحد", key: "myUnitPrice"},
        {title: "تخفیف", key: "myDiscount"},
        {title: "فروشنده", key: "mySeller"},
        {title: "شماره سفارش", key: "myTicketNumber"},
        {title: "مالیات", key: "Tax"},
        {title: "مبلغ کل", key: "TotalAmount"},
        {title: "واحد پول", key: "myCurrency"},
        {title: "وضعیت", key: "myStatus", task: changeTextTo},
    ]


    const formattedDataSheet2 = dataSheet2.map((item: any) => {
        const newItem: { [key: string]: any } = {};
        headersSheet2.forEach((header) => {
            newItem[header.title] = header.task ? header.task((item)[header.key]) : (item)[header.key]
        })
        return newItem;
    })


    return {
        header: headersSheet2,
        rows: dataSheet2,
    }

}

export const countFilterResultDateStatus = (tempBillList = [], date: string) => {
    const filteredBills = tempBillList.filter((row: any) => row.myDate === date);

    const data = filteredBills.reduce((acc, row: any) => {
        if (row.myStatus === 0) {
            acc.submittedBillsNumber = +acc.submittedBillsNumber + 1;
            acc.submittedBillTotalSum = +acc.submittedBillTotalSum + (+row.myTotalAmount);
        } else if (row.myStatus === 1) {
            acc.verifiedBillsNumber = +acc.verifiedBillsNumber + 1;
            acc.verifiedBillTotalSum = +acc.verifiedBillTotalSum + +row.myTotalAmount;
        }
        return acc;
    }, {
        submittedBillsNumber: 0,
        submittedBillTotalSum: 0,
        verifiedBillsNumber: 0,
        verifiedBillTotalSum: 0,
    });

    debugger
    return data;
}
