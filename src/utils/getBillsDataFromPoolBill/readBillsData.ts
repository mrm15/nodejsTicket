import fs from 'fs';
import path from 'path';

interface BillData {
    [key: string]: any;
}

// Utility function to read all JSON files in the 'pool/bills' directory
export const readBillsData = async (): Promise<BillData[]> => {
    try {
        // Define the path to the 'pool/bills' directory
        const billsDirectory = path.join(__dirname, '../../../pool/bills');

        // Check if the directory exists
        if (!fs.existsSync(billsDirectory)) {
            throw new Error(`The directory ${billsDirectory} does not exist.`);
        }

        // Read all file names in the directory
        const fileNames = await fs.promises.readdir(billsDirectory);

        // Filter only JSON files
        const jsonFiles = fileNames.filter(file => file.endsWith('.json'));

        // Read and parse each JSON file asynchronously
        const allDataPromises = jsonFiles.map(async (fileName) => {
            const filePath = path.join(billsDirectory, fileName);
            const fileContent = await fs.promises.readFile(filePath, 'utf8');
            return JSON.parse(fileContent); // Assuming each file contains an object or an array of objects
        });

        // Wait for all file reads to complete
        const allData = await Promise.all(allDataPromises);

        // Merge all data into a single array
        const mergedData = allData.reduce((acc, data) => {
            // If the data is an array, concatenate it, otherwise push the object directly
            return Array.isArray(data) ? acc.concat(data) : acc.concat([data]);
        }, []);

        return mergedData;

    } catch (error) {
        console.error('Error while reading bills data:', error);
        throw error;
    }
};
