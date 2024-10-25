import dayjs from "dayjs";

export const JsDateToIso8601ToHesabfaSetZeroHours = (myDate: Date | null): string | null => {
    if (!myDate) {
        return null; // Return null if the dateObject is not provided
    }

    // Format the date with hours set to zero
    const temp = dayjs(myDate).hour(0).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss');

    return temp;
};
export const iso8601ToDateObject = (isoString: string | null): any | null => {
    if (!isoString) {
        return null; // Return null if the ISO string is not provided
    }
    console.log(isoString)
    // Replace the "T" with a space for proper parsing
    const formattedString = isoString.replace("T", " ");

    // Create a DateObject from the ISO string using the Gregorian calendar
    // const result = new DateObject({
    //     date: formattedString,
    //     format: "YYYY-MM-DD HH:mm:ss",
    //     calendar: gregorian
    // });

    return "result";
};


/*********************************************/