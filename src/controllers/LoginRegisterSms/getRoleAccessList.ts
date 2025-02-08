import { Role } from "../../models/roles";
import {  User } from "../../models/User";
import myNodeCache from "../../utils/cache/cache";
import cacheKeyNames from "../../utils/cache/cacheKeyNames";

export const getRoleAccessList = async (phoneNumber: string): Promise<string[] | null> => {

    // Define a unique cache key based on the phone number
    const cacheKey = `${cacheKeyNames.getRoleAccessList}${phoneNumber}`;
    // Check if the access list is already in the cache
    const cachedAccessList = myNodeCache.get<string[]>(cacheKey);
    if (cachedAccessList) {
        return cachedAccessList;
    }

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

            // Store the result in the cache for future requests
            myNodeCache.set(cacheKey, roleAccessListArray);
            return roleAccessListArray;
        }
    }

    return null; // or handle the case where no role is found
};
