import {Role} from "../../models/roles";

type RoleKeyValuePair = {
    key: string;
    value: string;
};

const getRoleListKeyValuePairs = async (): Promise<RoleKeyValuePair[]> => {

    const roleListArray = await Role.find({}).exec()
    const keyValuePairs = []


    return roleListArray
    // return [
    //     {key: "role1", value: "Role 1"},
    //     {key: "role2", value: "Role 2"},
    //     // Add more role key-value pairs as needed
    // ];
};
