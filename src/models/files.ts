import mongoose, {Document, Schema} from 'mongoose';

// Define the File document interface
interface IFile extends Document {
    // fileId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    userId: mongoose.Schema.Types.ObjectId;
    uploadDate: Date;
    filePath: string;
    description: string;
    tag: string;
    downloadCount: number;
    createAt: Date;
    updateAt: Date;
}

// Define the File schema
const fileSchema: Schema<IFile> = new mongoose.Schema({
    // fileId: {
    //     type: String,
    //     required: true,
    //     unique: true, // Assuming fileId should be unique
    // },
    fileName: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    filePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required: false,
    },
    downloadCount: {
        type: Number,
        default: 0,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

fileSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
fileSchema.set('toJSON', {
    virtuals: true
});
// Export the File model
const File = mongoose.model<IFile>('File', fileSchema);

export {File, IFile}


