import fs from 'fs';
import path from 'path';

interface BillData {
    [key: string]: any; // You can refine this type based on your data structure
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
            return JSON.parse(fileContent);
        });

        // Wait for all file reads to complete and return the aggregated data
        const allData = await Promise.all(allDataPromises);
        return allData;

    } catch (error) {
        console.error('Error while reading bills data:', error);
        throw error;
    }
};
