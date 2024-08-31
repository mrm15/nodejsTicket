import {getCurrentTimeStamp} from "../../../utils/timing";

export type myTagObjectType = {
    n: string; // نام مشتری
    tn: string;// شماره تیکت مشتری
    bs: string;// وضعیت بسته بندی
    db: Date | string; // تاریخ بسته بندی
    ss: number | ""; // وضعیت ارسال3
    ds: string; // تاریخ ارسال
    des: string;// توضیحات که قراره ارسال بنویسه


}
export const makeEmptyTagObject = () => {

    const tagObject: myTagObjectType = {
        db: "",
        ds: "",
        n: "",
        tn: "",
        bs: "",
        ss: "",
        des: "",
    };
    return tagObject
}
export const openTagData = (row: any): myTagObjectType => {
    let tagObject: myTagObjectType = makeEmptyTagObject();

    try {
        // Check if the tag exists and is not an empty string
        if (row.Tag && row.Tag.trim() !== "") {
            const parsedTag = JSON.parse(row.Tag)

            debugger
            // Populate tagObject with parsed data, ensuring fallback to empty strings
            tagObject = {
                n: parsedTag.n || "",
                tn: parsedTag.tn || "",
                bs: parsedTag.bs || "",
                db: parsedTag.db || "",
                ss: parsedTag.ss || "",
                ds: parsedTag.ds || "",
                des: parsedTag.des || "",
            };
        }
    } catch (error) {
        // If there's an error in parsing, return the empty tagObject
        console.error("Error parsing tag data:", error);
    }

    return {...row, ...tagObject};
};

export const openTagDataForBasteBandi = ({lastTag, date, statusNumber}: any): string => {
    let tagObject: myTagObjectType = makeEmptyTagObject();

    try {
        if (lastTag && lastTag.trim() !== "") {
            const parsedTag = JSON.parse(lastTag);

            // Populate tagObject with parsed data, ensuring fallback to empty strings
            tagObject = {
                n: parsedTag.n || "",
                tn: parsedTag.tn || "",
                bs: parsedTag.bs || "",
                db: date, //
                ss: statusNumber,
                ds: parsedTag.ds || "",
                des: parsedTag.des || "",
            };
        } else {
            // No need for else block as tagObject is already initialized with defaults
            tagObject.db = date;  // Set the current timestamp
            tagObject.ss = statusNumber  // Set the current timestamp
        }
    } catch (error) {
        console.error("Error parsing tag data:", error);
        // Return default tagObject as it's already set
    }

    return JSON.stringify(tagObject);
}

export const openTagDataForErsal = ({lastTag, description, statusNumber, sentDate}: any): string => {
    //      lastTag: invoice.Tag,
    //     description: ersalDescription,
    //     statusNumber,
    //     sentDate

    let tagObject: myTagObjectType = makeEmptyTagObject();

    try {
        if (lastTag && lastTag.trim() !== "") {
            const parsedTag = JSON.parse(lastTag);

            // Populate tagObject with parsed data, ensuring fallback to empty strings
            tagObject = {
                n: parsedTag.n || "",
                tn: parsedTag.tn || "",
                bs: parsedTag.bs || "",
                db: parsedTag.db || "", //
                ss: statusNumber,
                ds: sentDate,
                des: description,
            }
        } else {
            tagObject.ss = statusNumber
            tagObject.ds = sentDate
            tagObject.des = description
        }
    } catch (error) {
        console.error("Error parsing tag data:", error);
        // Return default tagObject as it's already set
    }

    return JSON.stringify(tagObject);
}
export const openTagData1 = (row: any) => {
    // اینجا میخوام مقدار موجود توی تگ رو باز کنم و بفرستم سمت فرانت
    // اگه مقدار تگ خالی بود خودم تگ رو بهش آبجکت خالی میدم و میفرستم واسش

    // in some case  Tag is an empty string ""

    // actually i want to try   json Parse row.Tag
    // if not any error   so fill   const tagObject: myTagObjectType = {
    //         db: "",
    //         ds: "",
    //         n: "",
    //         tn: "",
    //         bs: "",
    //         ss: ""
    //     };  with parsed data  maybe some of them are undefined  and then return it   if there is error to parse data so  return empty string


    return row
}