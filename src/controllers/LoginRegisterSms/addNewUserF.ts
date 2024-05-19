import {IUser, User} from "../../models/User";

interface myInput {
    phoneNumber:String;
    departmentId:any;
    roleId:any;
}
export const addNewUserF = async ({phoneNumber,departmentId,roleId}:myInput) => {

    const object = {
        phoneNumber,
        createAt: new Date(),
        departmentId,
        role:roleId,
        SHABA_Number: "",
        accountNumber: "",
        accountingCode: "",
        address: "",
        bankName: "",
        cardNumber: "",
        city: "",
        company: "",
        country: "",
        description: "",
        economicCodeCompany: "",
        email: "",
        familyName: "",
        fax: "",
        loginCode: 0,
        middleName: "",
        mobile: "",
        name: "",
        nationalCodeCompany: "",
        phoneNumber1: "",
        phoneNumber2: "",
        phoneNumber3: "",
        postalCode: "",
        profilePictureUrl: "",
        province: "",
        tokens: [],
        registerNumberCompany: "",
        tasks: [],
        tickets: [],
        title: "",
        isActive: true,
        updateAt: new Date(),
        website: "",
        loginCodeSendDate: new Date(),
    }
    debugger

    try {
        await User.create(object);
    } catch (error: any) {
        throw new Error(error)
    }

}
