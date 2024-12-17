import {checkAccessList} from "../../../utils/checkAccessList";


export const checkUserAccess = async (phoneNumber: string, accessList: string[]) => {
    return await checkAccessList({ phoneNumber, arrayListToCheck: accessList });
};
