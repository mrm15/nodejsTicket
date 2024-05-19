import {Request, Response, NextFunction} from 'express';
import 'dotenv/config';
import {addRole} from "./addRole";
import {addNewUserF} from "../LoginRegisterSms/addNewUserF";
import {IUser, User} from "../../models/User";
import {IRole, Role} from "../../models/roles";
import mongoose from 'mongoose';


const admin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const phoneNumber = '09384642159'
    let message = ''

    try {

        try {
            await Role.collection.drop()
            message += 'رول حذف شد \n '
            await User.collection.drop()
            message += 'کاربر حذف شد \n '
        } catch (error) {

        }

        await addNewUserF({phoneNumber, departmentId: null,roleId:null})
        message += '\n_ کاربر ادد شد __ ';

        await addRole();
        message += '\nرول ادد شد'

        // assign role to user
        const user = await User.findOne({ phoneNumber }).exec();
        debugger
        if (!user) {
            throw new Error('User not found');
        }

        // Optionally find a specific role or create a new one
        let role = await Role.findOne({ /* your criteria here */ }).exec();
        if (!role) {
            return
        }

        debugger

        role.userId = user.id; // Using the _id property of the user
        user.role = role.id; // Using the _id property of the user

        // Save the updated role
        await role.save();
        await user.save();



        res.status(200).json({status: true, message});
        return
    } catch (err: any) {
        res.status(500).json({message: err?.message});
    }
};


export {admin};
