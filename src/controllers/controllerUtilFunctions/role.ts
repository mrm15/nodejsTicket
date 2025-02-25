import {IRole, Role} from "../../models/roles";

type RoleKeyValuePair = {
    key: string;
    value: string;
};

const getRoleListKeyValuePairs = async (): Promise<IRole|any[]> => {

    const roleListArray: any | null = await Role.find({}).lean()
    if (!roleListArray) {
        return []
    } else {
        return roleListArray
    }

};
