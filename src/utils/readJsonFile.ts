import fs from 'fs/promises';
import path from 'path';

export const readJsonFile = async (fileName: string) => {
    try {
        // Get the file path (assuming it's in the same directory)
        const filePath = path.join(__dirname, fileName);

        // Read the file asynchronously
        const fileData = await fs.readFile(filePath, 'utf-8');

        // Parse the JSON data
        const jsonData = JSON.parse(fileData);

        // Return the parsed data
        return jsonData;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw new Error("Unable to read or parse the JSON file.");
    }
};
