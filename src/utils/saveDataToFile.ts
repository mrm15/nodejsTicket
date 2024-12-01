import fs from 'fs';
import path from 'path';
import generateRandomUUID from "./generateRandomUUID";

interface inputType {
    directoryUrl: string;
    date: string;
    fileName: string;
    data: any;
}

// Function to save data to a JSON file in the specified directory (Async version)
const saveDataToFile = async ({ directoryUrl, date, fileName, data }: inputType) => {
    try {
        // Format the date to 'YYYY-MM-DD'
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // Define the path to save the file
        const fullPath = path.join(__dirname, directoryUrl);
        const filePath = path.join(fullPath, `${fileName}__${formattedDate}.json`);

        // Ensure the directory exists
        await fs.promises.mkdir(fullPath, { recursive: true });

        // Check if file exists, and delete if it does (overwrite)
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }

        // Convert data to JSON format and write it to the file asynchronously
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        // console.log(`Data for ${formattedDate} saved successfully.`);
    } catch (error) {
        console.error('Error while saving data to file:', error);
    }
};

export default saveDataToFile;
