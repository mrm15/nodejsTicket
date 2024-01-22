import mongoose, { Schema, Document } from 'mongoose';

interface IRole extends Document {
    name: string;
    // ... other role fields ...
}

const roleSchema: Schema<IRole> = new Schema<IRole>({
    name: {
        type: String,
        required: true,
    },
    // ... other role fields ...
});

const Role = mongoose.model<IRole>('Role', roleSchema);
