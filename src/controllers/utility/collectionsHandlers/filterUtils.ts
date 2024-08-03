// utils/filterUtils.ts

type Filter = { field: string, operator?: string, value: any };

export const buildFilterObject = (filters: Filter[]): { [key: string]: any } => {
    const filterObject: { [key: string]: any } = {};
    filters.forEach((filter) => {
        if (filter.operator) {
            if (!filterObject[filter.field]) {
                filterObject[filter.field] = {};
            }
            switch (filter.operator) {
                case '>=':
                    filterObject[filter.field]['$gte'] = filter.value;
                    break;
                case '>':
                    filterObject[filter.field]['$gt'] = filter.value;
                    break;
                case '<=':
                    filterObject[filter.field]['$lte'] = filter.value;
                    break;
                case '<':
                    filterObject[filter.field]['$lt'] = filter.value;
                    break;
                case '!=':
                    filterObject[filter.field]['$ne'] = filter.value;
                    break;
                case 'in':
                    filterObject[filter.field]['$in'] = filter.value;
                    break;
                case 'nin':
                    filterObject[filter.field]['$nin'] = filter.value;
                    break;
                case 'exists':
                    filterObject[filter.field]['$exists'] = filter.value;
                    break;
                case 'type':
                    filterObject[filter.field]['$type'] = filter.value;
                    break;
                case 'regex':
                case 'includes':
                    filterObject[filter.field] = { $regex: filter.value, $options: 'i' }; // Case-insensitive
                    break;
                default:
                    throw new Error(`Unsupported operator: ${filter.operator}`);
            }
        } else {
            filterObject[filter.field] = filter.value;
        }
    });

    console.log(filterObject)
    return filterObject;
};
