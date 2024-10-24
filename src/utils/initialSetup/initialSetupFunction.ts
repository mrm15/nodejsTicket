import addNewModel from "./addNewModel";
import {Department} from "../../models/department";
import {departmentObject} from "./departmentObject";
import {Role} from "../../models/roles";
import {roleObject} from "./roleObject";
import {IUser, User} from "../../models/User";
import {userObject} from "./userObject";
import {registerRandomAdminSettings} from "./registerRandomAdminSettings";
import {Status} from "../../models/status";
import {statusObject} from "./statusObject";


export const initialSetupFunction = async () => {
    try {
        // Add department
        let resDepartment = await Department.findOne({}).lean()
        if (!resDepartment) {
            // @ts-ignore
            resDepartment = await addNewModel(Department, departmentObject);
        }

        // Add role
        let resRole = await Role.findOne({name:"adminRole"}).lean()
        if (!resRole) {
            // @ts-ignore
            resRole = await addNewModel(Role, roleObject);
        }





        // Add user
        let resUser = await User.findOne({phoneNumber:"09384642159"}).lean()
        if (!resUser) {
            // @ts-ignore
            resUser = await addNewModel(User, {
                ...userObject,
                departmentId: resDepartment?._id,
                role: resRole?._id,
            });
        }

        //register status
        let resStatus = await Status.findOne({}).lean()
        if (!resStatus) {
            // @ts-ignore
            resStatus= await addNewModel(Status, {...statusObject, userId: resUser._id})
        }

        // Register admin settings
        const resAdminSettings = await registerRandomAdminSettings();

        return {
            statusCode: 200,
            message: "Done! 😊",
        };
    } catch (e: any) {

        return {
            statusCode: 500,
            message: e.toString(),
        };
    }
};
