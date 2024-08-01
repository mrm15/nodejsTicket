import {sendSMSBoreshPlaxiShab} from "../SMS/SMS.IR/sendSms";

export const sendSMSTodayReport = async (mobile: string, name: string, calculateTodayReportResult: any) => {

    const {
        plaksi2_8Value,
        simplePunchValue,
        proPunchValue,
        doubleValue,
        duqi10milValue,
        duqi5milValue,
        ESTILFELEZ,
        CHALANDSUEDI,
        NEONPLASTIC,
        NEONFELAXI,
    } = calculateTodayReportResult
    const resultOfSendSMS = await sendSMSBoreshPlaxiShab(
        {
            mobile: mobile,
            ADMINNAME: name,
            plaksi2_8Value,
            simplePunchValue,
            proPunchValue,
            doubleValue,
            duqi10milValue,
            duqi5milValue,
            ESTILFELEZ,
            CHALANDSUEDI,
            NEONPLASTIC,
            NEONFELAXI,
        }
    )

    return resultOfSendSMS
}