import { Types } from "mongoose";
import { Role, IRole } from "../../models/roles";
import { IUser, User } from "../../models/User";

// Define the type for the keys of roleAccessList


export const getRoleAccessList = async (phoneNumber: string): Promise<string[] | null> => {
    const foundUser = await User.findOne({ phoneNumber }).exec();
    const userRoleId = foundUser?.role;

    if (userRoleId) {
        const roleObject = await Role.findOne({ _id: userRoleId }).exec();
        if (roleObject) {
            // Destructure the properties you want to exclude and spread the rest into a new object
            const { _id, __v, name, description, createAt, updateAt, userId, ...roleAccessList } = roleObject.toObject();

            const roleAccessListArray: string[] = [];



            const temp:any = {...roleAccessList}
            for (const key in temp) {
                // Use type assertion here
                if (temp[key]===true) {
                    roleAccessListArray.push(key);
                }
            }

            return roleAccessListArray;
        }
    }

    return null; // or handle the case where no role is found
};
