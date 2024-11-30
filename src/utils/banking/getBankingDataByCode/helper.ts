export const handleFindUserAndCalculate = (singleBillRow: any, usersAndCodes: any) => {
    // Extract the contact title from the bill
    const contactTitle = singleBillRow.ContactTitle;
    // Check if any code of this user is present in the contact title
    for (let user of usersAndCodes) {
        // Check if any code of this user is present in the contact title
        const foundCode = user.codes.some((code:string[]) => contactTitle.includes(code.toString()));
        if (foundCode) {
            // If a match is found, return the user object
            return user;
        }
    }


    // If no user matches, return null
    // return {id, singleSum};
    return {
        id: undefined,
        totalSum: 0
    }
};
