import fs from 'fs';
import path from 'path';

const ensureDataFolderExists = (directoryUrl: string) => {
    try {
        const dataFolderPath = path.join(__dirname, directoryUrl); // Define the path to the 'data' folder

        // Check if the 'data' folder exists
        if (!fs.existsSync(dataFolderPath)) {
            // If not, create the 'data' folder
            fs.mkdirSync(dataFolderPath);
            // console.log('Data folder created successfully.');
        } else {
            // console.log('Data folder already exists.');
        }
    } catch (error) {
        console.error('Error while ensuring data folder exists:', error);
    }
};

export default ensureDataFolderExists;
