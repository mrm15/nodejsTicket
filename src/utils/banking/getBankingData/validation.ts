export const validateType = (type: string) => {
    const validTypes = ["user", "department", "all"];
    if (!validTypes.includes(type)) {
        throw new Error(`Invalid type: ${type}. Must be one of ${validTypes.join(", ")}.`);
    }
};

export const validateFilters = (filters: { uniqId: string; Property: string; Operator: string; Value: any }[]) => {
    if (!Array.isArray(filters) || filters.length === 0) {
        throw new Error("Filters must be a non-empty array.");
    }

    // Example: Ensure required fields exist in each filter
    filters.forEach(filter => {
        if (!filter.Property || !filter.Operator || !("Value" in filter)) {
            throw new Error(`Invalid filter format: ${JSON.stringify(filter)}`);
        }
    });
};

// Parse filters into a MongoDB-compatible query
export const parseFilters = (filters: { Property: string; Operator: string; Value: any }[]) => {
    const query: any = {};

    filters.forEach(filter => {
        const { Property, Operator, Value } = filter;
        switch (Operator) {
            case "=":
                query[Property] = Value;
                break;
            case "<":
                query[Property] = { ...query[Property], $lt: Value };
                break;
            case "<=":
                query[Property] = { ...query[Property], $lte: Value };
                break;
            case ">":
                query[Property] = { ...query[Property], $gt: Value };
                break;
            case ">=":
                query[Property] = { ...query[Property], $gte: Value };
                break;
            default:
                throw new Error(`Unsupported operator: ${Operator}`);
        }
    });

    return query;
};
