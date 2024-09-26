// utils/filterUtils.ts

type Filter = { property: string, operator?: string, value: any };

export const buildFilterObject = (filters: Filter[]): { [key: string]: any } => {
    debugger
    const filterObject: { [key: string]: any } = {};
    filters.forEach((filter) => {
        const filterField = filter.property

        if (filter.operator) {
            if (!filterObject[filter.property]) {
                filterObject[filter.property] = {};
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
                    filterObject[filterField] = filter.value; // Exact match (default behavior)
                    // or if you want to be explicit:
                    // filterObject[filterField] = { $eq: filter.value };
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
                    // بعدا باید اینو تکمیل کنم
                    throw new Error(`Unsupported operator: ${filter.operator}`);


                case 'includes':
                    filterObject[filterField] = {$regex: filter.value, $options: 'i'}; // Case-insensitive
                    break;
                case '*':
                    filterObject[filterField] = {$regex: filter.value, $options: 'i'}; // Case-insensitive
                    break;
                default:
                    throw new Error(`Unsupported operator: ${filter.operator}`);
            }
        } else {
            filterObject[filterField] = filter.value;
        }
    });

    debugger
    // console.log(filterObject)
    return filterObject;
};
