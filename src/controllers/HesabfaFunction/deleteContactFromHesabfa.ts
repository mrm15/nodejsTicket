import {hesabfaApiRequest} from "../utility/hesabfa/functions";

export const deleteContactFromHesabfa = async (contactCode: string) => {
    try {
        return await hesabfaApiRequest("contact/delete", {code: contactCode});
    } catch (error: any) {
        // Augment the error with status code if available
        const errorMessage = `${error.toString()} statusCode: ${error?.status}`;
        // Optionally log the error here
        throw new Error(errorMessage);
    }
}
