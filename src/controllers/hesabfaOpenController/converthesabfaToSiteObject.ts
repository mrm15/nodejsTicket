import {IUser} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import mongoose from "mongoose";
import {uuidGenerator} from "../../utils/uuidGenerator";

export const converthesabfaToSiteObject = ({contact, departmentId, role}: any) => {


    const currentTime = getCurrentTimeStamp()
    const newObject = {
        role,
        familyName: contact.LastName,
        SHABA_Number: "",
        accountNumber: "",
        accountingCode: "",
        address: contact.Address,
        bankName: "",
        cardNumber: "",
        city: contact.City,
        company: contact.Company,
        contactCode: contact.Code,
        country: contact.Country,
        createAt: currentTime,
        departmentId,
        description: "",
        economicCodeCompany: contact.EconomicCode,
        email: contact.Email,
        fax: contact.Fax,
        isActive: contact.Active,
        loginCode: 0,
        loginCodeSendDate: null,
        middleName: "",
        mobile: "",
        name: contact.FirstName,
        nationalCode: contact.NationalCode,
        phoneNumber: contact.Mobile,
        phoneNumber1: "",
        phoneNumber2: "",
        phoneNumber3: "",
        postalCode: contact.PostalCode,
        profilePictureUrl: "",
        province: contact.State,
        registerNumberCompany: "",
        tasks: [],
        tickets: [],
        title: "",
        tokens: [],
        updateAt: currentTime,
        userStatus: "",
        website: contact.website,
        userName: uuidGenerator()
    }

    return newObject

}