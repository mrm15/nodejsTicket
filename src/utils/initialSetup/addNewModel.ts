import { Model, Document } from "mongoose";


export const addNewModel = async (collectionModel:any, inputObject:any) => {
    try {
        // Create a new document using the provided model and input object
        const newDocument = new collectionModel(inputObject);

        // Save the new document to the database

        const tttt = await newDocument.save();

        return tttt
    } catch (error) {
        console.error(`Error creating document in collection ${collectionModel.modelName}:`, error);
        throw error; // Rethrow the error for the calling function to handle it
    }
};

export default addNewModel;
