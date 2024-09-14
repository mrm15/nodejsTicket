import {p2e} from "./NumericFunction";

export const timestampToTimeFromHesabfa = (TimeStampDate: number | Date | string | undefined , EnglishDigitsDate?: boolean): string => {
    try {
        // Check if the input is undefined
        if (TimeStampDate === undefined) {
            throw new Error("Input date is undefined");
        }

        // Parse input into a Date object if it's a string or number
        let dateObject: Date;
        if (typeof TimeStampDate === 'string' || typeof TimeStampDate === 'number') {
            dateObject = new Date(TimeStampDate);
        } else {
            dateObject = TimeStampDate;
        }

        // Check if the date object is valid
        if (isNaN(dateObject.getTime())) {
            throw new Error("Invalid date");
        }

        // Format the date using the Persian calendar
        const formatter = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Tehran'
        });


        const dateTime = formatter.format(dateObject);
        if(EnglishDigitsDate){
            return  p2e(dateTime.split(",")[0])
        }


        return dateTime
    } catch (error) {
        return `Error: ${error?.toString()}`;
    }
};