const processFilterOperators = (filter: any) => {
    const filterObject: any = {};
    const filterField = filter.property;

    if (filter.operator) {
        if (!filterObject[filterField]) {
            filterObject[filterField] = {};
        }
        switch (filter.operator) {
            case '>=':
                filterObject[filterField]['$gte'] = filter.value;
                break;
            case '>':
                filterObject[filterField]['$gt'] = filter.value;
                break;
            case '<=':
                filterObject[filterField]['$lte'] = filter.value;
                break;
            case '<':
                filterObject[filterField]['$lt'] = filter.value;
                break;
            case '!=':
                filterObject[filterField]['$ne'] = filter.value;
                break;
            case '===':
            case '==':
            case '=':
                filterObject[filterField] = filter.value; // Exact match
                break;
            case 'in':
                filterObject[filterField]['$in'] = filter.value;
                break;
            case 'nin':
                filterObject[filterField]['$nin'] = filter.value;
                break;
            case 'exists':
                filterObject[filterField]['$exists'] = filter.value;
                break;
            case 'type':
                filterObject[filterField]['$type'] = filter.value;
                break;
            case 'regex':
            case 'includes':
            case '*':
                filterObject[filterField] = { $regex: filter.value, $options: 'i' }; // Case-insensitive
                break;
            default:
                throw new Error(`Unsupported operator: ${filter.operator}`);
        }
    } else {
        filterObject[filterField] = filter.value; // Default equality if no operator is provided
    }
    return filterObject;
}
export default processFilterOperators