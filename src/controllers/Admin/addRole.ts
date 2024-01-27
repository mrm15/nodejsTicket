import {IRole, Role} from "../../models/roles";


export const addRole = async () => {
    const newRole: IRole = new Role({
        name: 'Admin',
        description: 'Administrator role with full access',
        statusListCreate: true,
        statusListRead: true,
        statusListUpdate: true,
        statusListDelete: true,
        ticketCreate: true,
    });

    await newRole.save()

}

