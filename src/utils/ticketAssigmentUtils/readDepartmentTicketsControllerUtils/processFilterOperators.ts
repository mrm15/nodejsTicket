// Process filter operators for MongoDB aggregation queries.
// Now includes support for numeric values.
const processFilterOperators = (filter: any) => {
    const filterObject: any = {};
    const filterField = filter.property;

    // Helper function to check if the value is a valid date string.
    const isDate = (value: any): boolean => {
        return !isNaN(Date.parse(value));
    };

    // Helper function to check if the value is numeric.
    const isNumeric = (value: any): boolean => {
        return (typeof value === "number") ||
            (typeof value === "string" && !isNaN(Number(value)));
    };

    // Helper function to convert a value to the appropriate type:
    // number if numeric, Date if date, or leave as is.
    const convertValue = (value: any) => {
        if (isNumeric(value)) {
            return Number(value); // Process as a number
        } else if (isDate(value)) {
            return new Date(value); // Process as a Date
        }
        return value; // Default to the original value
    };

    if (filter.operator) {
        // Ensure the filter field is initialized
        if (!filterObject[filterField]) {
            filterObject[filterField] = {};
        }

        // Convert filter value using the helper function
        const filterValue = convertValue(filter.value);

        // Process the operator
        switch (filter.operator) {
            case '>=':
                filterObject[filterField]['$gte'] = filterValue;
                break;
            case '>':
                filterObject[filterField]['$gt'] = filterValue;
                break;
            case '<=':
                filterObject[filterField]['$lte'] = filterValue;
                break;
            case '<':
                filterObject[filterField]['$lt'] = filterValue;
                break;
            case '!=':
                filterObject[filterField]['$ne'] = filterValue;
                break;
            case '===':
            case '==':
            case '=':
                // Exact match without operator object
                filterObject[filterField] = filterValue;
                break;
            case 'in':
                // If the filter value is an array, process each element accordingly.
                filterObject[filterField]['$in'] = Array.isArray(filterValue)
                    ? filterValue.map(value => convertValue(value))
                    : filterValue;
                break;
            case 'nin':
                // Process array elements if needed.
                filterObject[filterField]['$nin'] = Array.isArray(filterValue)
                    ? filterValue.map(value => convertValue(value))
                    : filterValue;
                break;
            case 'exists':
                filterObject[filterField]['$exists'] = filterValue;
                break;
            case 'type':
                filterObject[filterField]['$type'] = filterValue;
                break;
            case 'regex':
            case 'includes':
            case '*':
                // For regex-based filters, apply a case-insensitive regex match.
                filterObject[filterField] = { $regex: filterValue, $options: 'i' };
                break;
            default:
                throw new Error(`Unsupported operator: ${filter.operator}`);
        }
    } else {
        // If no operator is provided, use default equality after conversion.
        filterObject[filterField] = convertValue(filter.value);
    }

    console.log("================== filterObject ====================================");
    console.log(filterObject);
    console.log("====================================================================");
    return filterObject;
};

export default processFilterOperators;
