import path from 'path';
import { readJsonFile } from '../../../utils/readJsonFile';

export const getBillsDataFromCachedDataHesabfa = async (filtersArray: any[]) => {
    // Correct the path using path.join without leading slashes
    const fileAddress ='../../src/assets/billList.json'
    // Read the data from the JSON file
    try {
        const data = await readJsonFile(fileAddress);
        // Apply filters
        const filteredData = filterData(data, filtersArray);
        // Return the filtered data
        return filteredData;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw error; // Optionally, re-throw the error if you want to handle it at a higher level
    }
};

const filterData = (data: any[], filtersArray: any[]) => {
    return data.filter(item => {
        return filtersArray.every(filter => applyFilter(item, filter));
    });
};

const applyFilter = (item: { [x: string]: any; }, filter: { Property: any; Operator: any; Value: any; }) => {
    const { Property, Operator, Value } = filter;

    // Get the value of the property in the current item
    const itemValue = item[Property];
    console.log(itemValue)
    switch (Operator) {
        case '=':
            return itemValue === Value;
        case '>':
            return itemValue > Value;
        case '>=':
            return itemValue >= Value;
        case '<':
            return itemValue < Value;
        case '<=':
            return itemValue <= Value;
        case '=!':
            return itemValue !== Value;
        case '*': // contains
            return itemValue.includes(Value);
        case '?*': // ends with
            return itemValue.endsWith(Value);
        case '*?': // starts with
            return itemValue.startsWith(Value);
        case 'in': // value is in array
            return Array.isArray(Value) && Value.includes(itemValue);
        default:
            return true; // If no valid operator is provided, return true (no filter)
    }
};
