import { Model, Document } from "mongoose";

/**
 * Adds a new document to the provided Mongoose model (collection).
 *
 * @param collectionModel - The Mongoose model representing the collection.
 * @param inputObject - The object to insert into the collection.
 * @returns The newly created document or throws an error.
 */
export const addNewModel = async <T extends Document>(collectionModel: Model<T>, inputObject: Partial<T>): Promise<T | null> => {
    try {
        // Create a new document using the provided model and input object
        const newDocument = new collectionModel(inputObject);

        // Save the new document to the database
        debugger
        const tttt = await newDocument.save();
        debugger
        return tttt
    } catch (error) {
        console.error(`Error creating document in collection ${collectionModel.modelName}:`, error);
        throw error; // Rethrow the error for the calling function to handle it
    }
};

export default addNewModel;
