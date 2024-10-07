import {IUser, User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";
import getUserByPhoneNumber from "./getUserByPhoneNumber";

const getDepartmentByPhoneNumber = async (visitorPhoneNumber: string): Promise<IDepartment> => {
    const foundUser: IUser = await getUserByPhoneNumber(visitorPhoneNumber);
    const foundDepartment: IDepartment | null = await Department.findOne({ _id: foundUser.departmentId }).lean();
    if (!foundDepartment) throw new Error('دپارتمان معتبر نیست!');

    return foundDepartment;
};
export default getDepartmentByPhoneNumber

