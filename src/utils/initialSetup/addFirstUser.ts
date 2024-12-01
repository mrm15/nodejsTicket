import {User} from "../../models/User";
import generateRandomUUID from "../generateRandomUUID";

export const addFirstUser = async ({departmentId, role}: any) => {
    try {
        const newUser = new User({
            userName: generateRandomUUID(), // Required field
            phoneNumber: '09384642159', // Required field
            name: 'محمد میرعرب',
            familyName: '-',
            email: '',
            departmentId,
            role,
            tasks: [],
            accountingCode: '',
            company: '',
            isActive: true,
        });

        const savedUser = await newUser.save();
        // console.log('User added successfully:', savedUser);
    } catch (error) {
        console.error('Error adding user:', error);
    }
}