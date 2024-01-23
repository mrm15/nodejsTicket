import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';

// Define the roles enum


// Define the User document interface (optional but recommended)
interface IUserTask {
    taskId: mongoose.Schema.Types.ObjectId;
    visible: boolean;
}

interface IUser extends Document {
    // _id?: any;
    userId?: string;
    userName?: string;
    departmentId?: string;
    role?: string;
    tasks: IUserTask[];
    accountingCode: string;
    company: string;
    title: string;
    name: string;
    familyName: string;
    middleName: string;
    phoneNumber: string;
    mobile: string;
    fax: string;
    phoneNumber1: string;
    phoneNumber2: string;
    phoneNumber3: string;
    email: string;
    website: string;
    bankName: string;
    accountNumber: string;
    cardNumber: string;
    SHABA_Number: string;
    economicCodeCompany: string;
    nationalCodeCompany: string;
    registerNumberCompany: string;
    description: string;
    address: string;
    country: string;
    province: string;
    city: string;
    profilePictureUrl: string;
    postalCode: string;
    lastUpdateTimeStamp: string;
    refreshTokens: string[];
    loginCode: number;
    loginCodeSendDate: number;
    isActive: string;
    tickets: string[];
    // createAt:string;
    // updateAt: string;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema<IUser>({
    //
    // _id: {
    //     type: String,
    //     required: false,
    //     default: "",
    //
    // },
    // userId: {
    //     type: String,
    //     required: false,
    //     default: "",
    //
    // },
    userName: {
        type: String,
        required: true,
        default: () => uuidV4(),

    },
    departmentId: {
        type: String,
        required: false,


    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',  // References the 'Role' model
        required: false,
        default: null,
    },
    tasks: [{
        taskId: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
        visible: {type: Boolean, required: true}
    }],
    accountingCode: {
        type: String,
        required: false,
        default: "",
    },
    company: {
        type: String,
        required: false,
        default: "",

    },
    title: {
        type: String,
        required: false,
        default: "",

    },
    name: {
        type: String,
        required: false,
        default: "",

    },
    familyName: {
        type: String,
        required: false,
        default: "",

    },
    middleName: {
        type: String,
        required: false,
        default: "",

    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,

    },
    mobile: {
        type: String,
        required: false,
        default: "",

    },
    fax: {
        type: String,
        required: false,
        default: "",

    },
    phoneNumber1: {
        type: String,
        required: false,
        default: "",

    },
    phoneNumber2: {
        type: String,
        required: false,
        default: "",

    },
    phoneNumber3: {
        type: String,
        required: false,
        default: "",

    },
    email: {
        type: String,
        required: false,
        default: "",

    },
    website: {
        type: String,
        required: false,
        default: "",

    },
    bankName: {
        type: String,
        required: false,
        default: "",

    },
    accountNumber: {
        type: String,
        required: false,
        default: "",

    },
    cardNumber: {
        type: String,
        required: false,
        default: "",

    },
    SHABA_Number: {
        type: String,
        required: false,
        default: "",

    },
    economicCodeCompany: {
        type: String,
        required: false,
        default: "",

    },
    nationalCodeCompany: {
        type: String,
        required: false,
        default: "",

    },
    registerNumberCompany: {
        type: String,
        required: false,
        default: "",

    },
    description: {
        type: String,
        required: false,
        default: "",

    },
    address: {
        type: String,
        required: false,
        default: "",

    },
    country: {
        type: String,
        required: false,
        default: "",

    },
    province: {
        type: String,
        required: false,
        default: "",

    },
    city: {
        type: String,
        required: false,
        default: "",

    },
    profilePictureUrl: {
        type: String,
        required: false,
        default: "",

    },
    postalCode: {
        type: String,
        required: false,
        default: "",

    },
    lastUpdateTimeStamp: {
        type: String,
        required: false,
        default: "",

    },
    refreshTokens: [{
        type: String,
        required: false,
    }],
    loginCode: {
        type: Number,
        required: false,

    },
    loginCodeSendDate: {
        type: Number,
        required: false,
    },
    isActive: {
        type: String,
        required: false,
        default: "",
    },
    tickets: [{
        type: String,
        required: false,
    }],

    // createAt: {
    //     type: String,
    //     required: false,
    // },
    // updateAt: {
    //     type: String,
    //     required: false,
    // },
});

// Create a virtual 'id' property
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
    virtuals: true
});

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export {User, IUser};
