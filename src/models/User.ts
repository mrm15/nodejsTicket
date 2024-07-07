import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';


// Define the User document interface (optional but recommended)
interface IUserTask {
    taskId: mongoose.Schema.Types.ObjectId;
    visible: boolean;
}

export interface ITicketInfo {
    ticketId: string;
    readStatus: boolean;
}

interface IUser extends Document {
    [key: string]: any;

    userName?: string;
    departmentId?: mongoose.Schema.Types.ObjectId;
    role?: mongoose.Types.ObjectId;
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
    loginCode: number;
    loginCodeSendDate: Date | null;
    isActive: Boolean;
    tickets: ITicketInfo[];
    createAt: Date;
    updateAt: Date;
    tokens: {
        refreshToken: string;
        os: string;
        ip: string;
        useragent: string;
        loginTime: Date;
    }[] | [];
    userStatus: string;
    contactCode: string;
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

    userName: {
        unique: true,
        type: String,
        required: true,
        default: () => uuidV4(),

    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
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
        unique: true, // Considering phoneNumber is unique
        index: true // Adding index to phoneNumber
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

    tokens: [{
        refreshToken: {type: String, required: true},
        os: {type: String, required: true},
        ip: {type: String, required: true},
        useragent: {type: String, required: true},
        loginTime: {type: Date, required: true}
    }],
    loginCode: {
        type: Number,
        required: false,

    },
    loginCodeSendDate: {
        type: Date || null,
        required: false,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    userStatus: {
        type: String, //   online offline busy  away
        required: false,
        default: 'offline',
    },
    contactCode: { // کد کاربر توی حسابفا هست این که موقعی که داریم فاکتور میزنیم لازم میشه و هنگام ثبت کاربر جدید هم لازمش داریم. که باید دقیقا برابر با کاربری که توی حسابفا ثبت میشه ثبتش کنیم.
        type: String, //
        required: false,
        default: '',
    },


    tickets: [{
        ticketId: {type: mongoose.Schema.Types.ObjectId, required: false, index: true, ref: 'Ticket'},
        readStatus: {type: Boolean, default: false, index: true,}
    }],

    createAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
    updateAt: {
        type: Date,
        default: Date.now
    },

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
