import {
    myTagObjectType,
    openTagDataByRowReturnTagData
} from "../../utility/collectionsHandlers/openTagData";

interface INeededObject {
    "myNumber": string,
    "myDate": string,
    "myContactCode": string,
    "myContactName": string,
    "myContactTitle": string,
    "myItemCode": string,
    "myItemName": string,
    "myDescription": string,
    "myUnit": string,
    "myQuantity": number,
    "myUnitPrice": number,
    "myDiscount": number,
    "myTax": number,
    "myTotalAmount": number,
    "myStatus": number,
    "myCurrency": "IRT" | "IRR" | undefined,
    "mySeller": string,
    //
    "n": string; // نام کسی که فاکتور میزنه
    "tn": string;// شماره تیکت مشتری
    "bs": string;// وضعیت بسته بندی
    "db": Date | string; // تاریخ بسته بندی
    "ss": number | ""; // وضعیت ارسال3
    "ds": string; // تاریخ ارسال
    "des": string;// توضیحات که قراره ارسال بنویسه

}

const getRowsOfInvoiceItemsFromBills = (billsArray: any[]): INeededObject[] => {
    const allDetailsBill: INeededObject[] = [];

    billsArray.forEach((singleBill: any) => {
        const {
            Number,
            Date,
            ContactCode,
            Contact,
            ContactTitle,
            SalesmanCode,
            InvoiceItems,
            Status,
            Currency
        } = singleBill;

        InvoiceItems.forEach((singleInvoiceItem: any) => {
            const resultOfExtractingTag: myTagObjectType = openTagDataByRowReturnTagData(singleInvoiceItem)
            allDetailsBill.push({
                myNumber: Number,
                myDate: Date,
                myContactCode: ContactCode,
                myContactName: Contact?.Name || "",
                myContactTitle: ContactTitle || "",
                myItemCode: singleInvoiceItem.Item?.Code || "",
                myItemName: singleInvoiceItem.Item?.Name || "",
                myDescription: singleInvoiceItem.Description || "",
                myUnit: singleInvoiceItem.Unit || "",
                myQuantity: singleInvoiceItem.Quantity,
                myUnitPrice: singleInvoiceItem.UnitPrice,
                myDiscount: singleInvoiceItem.Discount,
                myTotalAmount: singleInvoiceItem.TotalAmount,
                myStatus: Status,
                myCurrency: Currency,
                myTax: singleInvoiceItem.Tax,
                mySeller: SalesmanCode,
                // from tag
                ...resultOfExtractingTag
            });
        });
    });

    return allDetailsBill;
}

export default getRowsOfInvoiceItemsFromBills;
