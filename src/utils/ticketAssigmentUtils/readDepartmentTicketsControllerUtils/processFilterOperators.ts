const processFilterOperators = (filter: any) => {
    const filterObject: any = {};
    const filterField = filter.property;

    const isDate = (value: any): boolean => {
        return !isNaN(Date.parse(value)); // Check if the value can be parsed into a valid date
    };

    if (filter.operator) {
        if (!filterObject[filterField]) {
            filterObject[filterField] = {};
        }

        // Convert filter value to a Date if applicable
        const filterValue = isDate(filter.value) ? new Date(filter.value) : filter.value;

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
                filterObject[filterField] = filterValue; // Exact match
                break;
            case 'in':
                filterObject[filterField]['$in'] = Array.isArray(filterValue)
                    ? filterValue.map(value => (isDate(value) ? new Date(value) : value))
                    : filterValue;
                break;
            case 'nin':
                filterObject[filterField]['$nin'] = Array.isArray(filterValue)
                    ? filterValue.map(value => (isDate(value) ? new Date(value) : value))
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
                filterObject[filterField] = { $regex: filterValue, $options: 'i' }; // Case-insensitive
                break;
            default:
                throw new Error(`Unsupported operator: ${filter.operator}`);
        }
    } else {
        filterObject[filterField] = isDate(filter.value) ? new Date(filter.value) : filter.value; // Default equality
    }

    return filterObject;
};

export default processFilterOperators;
