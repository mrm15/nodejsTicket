import {IUser, User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";
import {IDataList} from "../forwardTicketController/getForwardConfig";

interface DepartmentWithUsers {
    name: string;
    id: string;
    userList: {
        id: string;
        name: string;
        departmentId: string | undefined;
    }[];
}

export const getDepartmentListWithUsers = async (phoneNumber: string): Promise<DepartmentWithUsers[]> => {
    const allUsers = await User.find<IUser>({}).lean();
    const allDepartments = await Department.find<IDepartment>({}).lean();

    return allDepartments.map(department => {
        const userList = allUsers
            .filter(user => user.departmentId?.toString() === department._id.toString())
            .map(user => ({
                id: user._id.toString(),
                name: user.name,
                departmentId: user.departmentId?.toString()
            }));

        return {
            name: department.name,
            id: department._id.toString(),
            userList
        };
    });
};



interface IUserResponse {
    name: string;
    id: string;
}

export const getSameDepartmentUsers = async (phoneNumber: string): Promise<IUserResponse[]> => {
    const allUsers: IUser[] = await User.find({}).lean();
    const foundUser: IUser | undefined = allUsers.find(row => row.phoneNumber === phoneNumber);

    if (foundUser) {
        const userList: IUser[] = allUsers.filter(row => row.departmentId === foundUser.departmentId);
        return userList.map(({name, id}) => ({name, id: id}));
    } else {
        return [];
    }
};
