import {IUser, User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";

export const getDepartmentListWithUsers = async (phoneNumber: string) => {


    const allUsers = await User.find({}).lean();
    const allDepartments: IDepartment[] | [] = await Department.find({}).lean()


    return allDepartments.map(singleDepartment => {
        const depName = singleDepartment.name;
        const depId = singleDepartment._id;
        const userList = allUsers.filter(singleUser => singleUser.departmentId === singleDepartment._id)

        return {name: depName, id: depId, userList}

    })
}
export const getSameDepartmentUsers = async (phoneNumber: string) => {
    const allUsers = await User.find({}).lean();
    const foundUser: IUser | undefined | null = allUsers.find(row => row.phoneNumber === phoneNumber)
    if (foundUser) {
        const userList: IUser[] = allUsers.filter(row => row.departmentId === foundUser.departmentId);
        return userList.map(({name, _id}) => ({name, id: _id}));
    } else {
        return []
    }
}
