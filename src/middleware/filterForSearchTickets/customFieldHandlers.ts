// middleware/customFieldHandlers.ts
import {User} from "../../models/User";

export const customFieldHandlers: Record<string, (row: any) => void> = {
    ticketNumber: (row) => {
        row.value = +row.value; // Convert to number
    },
    userCreateThisOrder: async (row) => {

        // باید اسم شبیه اینو بگیریم پیدا کنیم و آیدیشو بدیم برای سرچ
        const tableResult = await User.findOne()

    },
    numberOfAttachments: (row) => {
        // Add your code here
    },
    dateCreate: (row) => {
        // Add your code here
    },
    lastChangeTime: (row) => {
        // Add your code here
    },
    statusText: (row) => {
        // Add your code here
    },
    assignedToDepartmentIdText: (row) => {
        // Add your code here
    },
    assignToUserIdText: (row) => {
        // Add your code here
    },
};

// فیلتر هایی که خودم دستی اضافه کردم اینا هستن #10001 رو توی پروژه سرچ کن
/*
    userCreateThisOrder
    numberOfAttachments
    dateCreate
    lastChangeTime
    statusText
    assignedToDepartmentIdText
    assignToUserIdText
 */