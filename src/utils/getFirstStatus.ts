import {IStatus, Status} from "../models/status";
import {ITicket} from "../models/ticket";
import {Department, IDepartment} from "../models/department";

export const getFirstStatus = async () => {

    const foundStatus: IStatus | null = await Status.findOne({order: 1}).exec()
    if (!foundStatus) {
        return null
    } else {
        return (foundStatus.id || foundStatus._id)
    }
}
export const getFirstDepartment = async () => {

    const foundDepartment: IDepartment | null = await Department.findOne().exec()
    if (!foundDepartment) {
        return null
    } else {
        return (foundDepartment.id || foundDepartment._id)
    }
}

export const getSettings = async () => {

    // بعدا که جدول تنظیمات رو درست کردم باید از اینجا این متد رو ویرایش کنم.
    const status =await getFirstStatus()
    const assignedToDepartmentId = await getFirstDepartment()

    return {status, assignedToDepartmentId}


}