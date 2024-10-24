import generateRandomUUID from "../generateRandomUUID";

export const userObject = {
    userName: generateRandomUUID(), // Required field
    phoneNumber: '09384642159', // Required field
    name: 'محمد میرعرب ادمین',
    familyName: '',
    email: '',
    // departmentId,
    // role,
    tasks: [],
    accountingCode: '',
    company: '',
    isActive: true,
}