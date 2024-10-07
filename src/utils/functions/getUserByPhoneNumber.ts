import {IUser, User} from "../../models/User";

const getUserByPhoneNumber = async (visitorPhoneNumber: string): Promise<IUser> => {
    const foundUser: IUser | null = await User.findOne({phoneNumber: visitorPhoneNumber}).lean()
    if (!foundUser) throw new Error('کاربر معتبر نیست!'); // Throw an error instead of sending a response

    return foundUser;
};
export default getUserByPhoneNumber