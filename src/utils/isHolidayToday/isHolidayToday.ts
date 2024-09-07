import {p2e} from "../../controllers/utility/NumericFunction";
import axios from "axios";
import {logEvents} from "../logEvents";

export const isHolidayToday = async () => {

    const todayTimeStamp = new Date();
    const todayPersianString = todayTimeStamp.toLocaleDateString('FA-IR')
    const todayDateEnglishDigits = p2e(todayPersianString);

    let isHoliday = false
    try {
        /*
        طبق داکیومنت این سایت دارم چک میکنم که آیا امروز تعطیله یا نه
        https://holidayapi.ir/?javascript#8614460e98
         */
        //https://holidayapi.ir/jalali/1401/11/22
        const result = await axios.get(`https://holidayapi.ir/jalali/` + todayDateEnglishDigits)
        if (result.status === 200) {
            isHoliday = result.data.is_holiday
        }
    } catch (err: any) {
        const message =  `${err.name}:${err.message} holidayapi.ir ERROR`
        await logEvents(message, "errLog.txt");
    }

    return isHoliday


}