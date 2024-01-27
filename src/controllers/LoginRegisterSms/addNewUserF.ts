import {IUser, User} from "../../models/User";




export const addNewUserF = async  (number: string)=>{

    const object = {
        phoneNumber: number,
        createAt: new Date(),
        departmentId: "",
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
        isActive:true,
        updateAt: new Date(),
        website: "",
        loginCodeSendDate: new Date(),
    }


    const newUser = new User(object);
    await newUser.save();

}
