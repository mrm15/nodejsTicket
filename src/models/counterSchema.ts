import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: String, // Collection name
    seq: {type: Number, default: 0} // Last used number
});
export const Counter = mongoose.model('Counter', counterSchema);
