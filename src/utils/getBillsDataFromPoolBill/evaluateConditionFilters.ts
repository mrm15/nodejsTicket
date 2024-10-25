const evaluateConditionFilters = (row: any, filter: any) => {
    let { property, operator, value } = filter;

    // Fallbacks for inconsistent casing
    if (!property) {
        property = filter.Property;
    }
    if (!operator) {
        operator = filter.Operator;
    }
    if (!value) {
        value = filter.Value;
    }

    // Access the property value from the row dynamically
    const propertyValue = row[property];

    // Handle undefined or null property values
    if (propertyValue === undefined || propertyValue === null) {
        return false;
    }

    // Check if the property is a Date type
    const isDateProperty = property.toLowerCase().includes('date');

    // Apply filter based on the operator and type
    switch (operator) {
        case '>=':
            if (isDateProperty) {
                return !isNaN(new Date(propertyValue).getTime()) && !isNaN(new Date(value).getTime())
                    ? new Date(propertyValue) >= new Date(value)
                    : false;
            } else {
                return Number(propertyValue) >= Number(value);
            }
        case '<=':
            if (isDateProperty) {
                return !isNaN(new Date(propertyValue).getTime()) && !isNaN(new Date(value).getTime())
                    ? new Date(propertyValue) <= new Date(value)
                    : false;
            } else {
                return Number(propertyValue) <= Number(value);
            }
        case '>':
            if (isDateProperty) {
                return !isNaN(new Date(propertyValue).getTime()) && !isNaN(new Date(value).getTime())
                    ? new Date(propertyValue) > new Date(value)
                    : false;
            } else {
                return Number(propertyValue) > Number(value);
            }
        case '<':
            if (isDateProperty) {
                return !isNaN(new Date(propertyValue).getTime()) && !isNaN(new Date(value).getTime())
                    ? new Date(propertyValue) < new Date(value)
                    : false;
            } else {
                return Number(propertyValue) < Number(value);
            }
        case '=':
            if (isDateProperty) {
                return new Date(propertyValue).getTime() === new Date(value).getTime();
            } else {
                return Number(propertyValue) === Number(value);
            }
        case '!=':
            if (isDateProperty) {
                return new Date(propertyValue).getTime() !== new Date(value).getTime();
            } else {
                return Number(propertyValue) !== Number(value);
            }
        case '*':
            return propertyValue.toString().includes(value.toString());
        default:
            return false;
    }
};

export default evaluateConditionFilters;
