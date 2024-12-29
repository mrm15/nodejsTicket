import {getCurrentTimeStamp} from "../../../utils/timing";
import {statusObject} from "../../../utils/initialSetup/statusObject";

export interface myTagObjectType {
    n: string; // نام کسی که فاکتور میزنه
    tn: string;// شماره تیکت مشتری
    // bs: string;// وضعیت بسته بندی
    db: Date | string; // تاریخ بسته بندی date BasteBandi
    // ss: number | ""; // وضعیت ارسال3
    ds: Date | string; // تاریخ ارسال date Send
    des: string;// توضیحات که قراره ارسال بنویسه
    sn: string; // شماره استاتوس
}

export const makeEmptyTagObject = () => {
    const tagObject: myTagObjectType = {
        n: "",
        tn: "",
        // bs: "",
        db: "",
        // ss: "",
        ds: "",
        des: "",
        sn: ""
    };
    return tagObject
}
export const openTagDataByRowReturnTagData = (row: any): myTagObjectType => {
    let tagObject: myTagObjectType = makeEmptyTagObject();

    try {
        // Check if the tag exists and is not an empty string
        if (row.Tag && row.Tag.trim() !== "") {
            const parsedTag = JSON.parse(row.Tag)


            // Populate tagObject with parsed data, ensuring fallback to empty strings
            tagObject = {
                n: parsedTag.n || "",
                tn: parsedTag.tn || "",
                des: parsedTag.des || "",
                sn: parsedTag.sn || "",
                db: parsedTag.db || "",
                ds: parsedTag.ds || "",
            };
        }
    } catch (error) {
        // If there's an error in parsing, return the empty tagObject
        console.error("Error parsing tag data:", error);
    }

    return tagObject
};
export const openTagData = (row: any): myTagObjectType => {
    let tagObject: myTagObjectType = makeEmptyTagObject();

    debugger
    try {
        // Check if the tag exists and is not an empty string
        if (row.Tag && row.Tag.trim() !== "") {
            const parsedTag = JSON.parse(row.Tag)


            // Populate tagObject with parsed data, ensuring fallback to empty strings
            tagObject = {
                n: parsedTag.n || "",
                tn: parsedTag.tn || "",
                des: parsedTag.des || "",
                sn: parsedTag.sn || "",
                db: parsedTag.db || "",
                ds: parsedTag.ds || "",
            };
        }
    } catch (error) {
        // If there's an error in parsing, return the empty tagObject
        // console.error("Error parsing tag data:", error);
    }

    return {...row, ...tagObject};
};

export const openTagDataForBasteBandi = ({lastTag, date, statusNumber, description = ""}: any): string => {
    let tagObject: myTagObjectType = makeEmptyTagObject();

    try {
        if (lastTag && lastTag.trim() !== "") {
            const parsedTag = JSON.parse(lastTag);

            // Populate tagObject with parsed data, ensuring fallback to empty strings
            tagObject = {
                n: parsedTag.n || "",
                tn: parsedTag.tn || "",
                // bs: parsedTag.bs || "",
                // db: date, //
                // ss: statusNumber,
                // ds: parsedTag.ds || "",
                des: parsedTag.des || "",
                sn: parsedTag.sn || "",
                db: parsedTag.db || "",
                ds: parsedTag.ds || "",
            };
        } else {
            // No need for else block as tagObject is already initialized with defaults
            tagObject.des = description;
            tagObject.sn = statusNumber  // Set the current timestamp
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
                // bs: parsedTag.bs || "",
                // db: parsedTag.db || "", //
                // ss: statusNumber,
                // ds: sentDate,
                des: description,
                sn: parsedTag.sn || "",
                db: parsedTag.db || "",
                ds: parsedTag.ds || "",
            }
        } else {
            tagObject.sn = statusNumber
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
const safeParseJSON = (jsonString: string) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON string:", jsonString);
        return null;
    }
};

export const openTagDataChangeStatus = ({lastTag, statusNumber, description,}: any): string => {
    // اگه بسته بندی بود باید مقدار  تاریخ بسته بندی رو پر کنیم
    const currentTimeStamp = getCurrentTimeStamp();


    let tagObject: myTagObjectType = makeEmptyTagObject();

    const parsedTag = lastTag?.trim() ? safeParseJSON(lastTag) : null;

    if (parsedTag) {
        tagObject = {
            ...tagObject,
            n: parsedTag.n || "",
            tn: parsedTag.tn || "",
            des: parsedTag.des || "",
            sn: parsedTag.sn || "",
            db: parsedTag.db || "",
            ds: parsedTag.ds || "",
        };
    }

    tagObject.sn = statusNumber;
    tagObject.des = description;
    if (statusNumber === "5710") { //  بسته بندی
        tagObject.db = currentTimeStamp
    }
    if (statusNumber === "5713") { //  ارسال شده
        tagObject.ds = currentTimeStamp
    }


    return JSON.stringify(tagObject);
};


