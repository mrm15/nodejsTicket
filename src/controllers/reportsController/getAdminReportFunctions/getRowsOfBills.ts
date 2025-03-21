import {myTagObjectType, openTagDataByRowReturnTagData} from "../../utility/collectionsHandlers/openTagData";


export interface INeededObject extends  myTagObjectType{
    "myNumber": string,
    "myDate": string,
    "myContactCode": string,
    "myContactName": string,
    "myContactPhoneNumber": string,
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
                myContactPhoneNumber: Contact?.Mobile || "",
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
