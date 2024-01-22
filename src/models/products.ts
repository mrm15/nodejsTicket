import mongoose, { Document, Schema } from 'mongoose';

// Define the Product document interface
interface IProduct extends Document {
    name: string;
    category: mongoose.Schema.Types.ObjectId;
    description: string;
    number: number;
    price: string;
    unit: string;
}

// Define the Product schema
const productsSchema: Schema<IProduct> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'productGroup'
    },
    description: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        default: 1  // Use 'default' instead of 'defaultValue'
    },
    price: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
    }
});

// Export the Product model
export default mongoose.model<IProduct>('products', productsSchema);
