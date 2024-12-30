import {IUser, User} from "../../models/User";


interface IInput {
    userId: any,
    userStatus: 'online' | 'offline' | 'away' | 'busy',
}

export const changeUserStatus = async ({userId, userStatus}: IInput) => {

    const foundUser: IUser | null = await User.findOne({_id: userId}).exec();

    if (!foundUser) {
        // res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
        // return
        throw new Error('کاربری با این شماره تلفن یافت نشد')
    }

    foundUser.userStatus = userStatus;

    await foundUser?.save();
}