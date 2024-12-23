import path from "path";
import {hesabfaApiRequest} from "../../controllers/utility/hesabfa/functions";
import saveDataToFile from "../saveDataToFile";


const saveProductList = async () => {
    try {
        // API endpoint and request payload
        const url = 'item/getitems';
        const data = {
            queryInfo: {
                SortBy: 'Code',
                SortDesc: true,
                Take: 10000,
                Skip: 0,
                Filters: []
            }
        };

        // Send request to the API
        const result: any = await hesabfaApiRequest(url, data);

        // Extract products data from the response
        const productsData = result.response?.data?.Result?.List || [];

        // Define the folder and file paths
        const directoryUrl = "../../pool/products";
        const fileName = "products";
        const filePath = path.join(directoryUrl, fileName+".json");

        debugger
        // Save the product data to the file
        await saveDataToFile({directoryUrl, date: undefined, fileName, data: productsData})

        console.log(`Products saved successfully to ${filePath}`);
    } catch (error) {
        console.error("An error occurred while saving the product list:", error);
    }
};

export default saveProductList;
