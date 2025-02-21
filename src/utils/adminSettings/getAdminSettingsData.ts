import cacheKeyNames from "../cache/cacheKeyNames";
import myNodeCache from "../cache/cache";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {registerRandomAdminSettings} from "../initialSetup/registerRandomAdminSettings";

const getAdminSettingsData = async () => {
    // Define a unique cache key based on the phone number
    const cacheKey = cacheKeyNames.adminSettings;
    try {
        // Check if the settings are already in the cache
        const cachedAdminSettings = myNodeCache.get<{ statusCode: number, adminSettingData: IAdminSettings | null, message: string }>(cacheKey);
        if (cachedAdminSettings) {
            return cachedAdminSettings;
        }

        // Try to fetch the admin settings from the database
        const result: IAdminSettings | null = await AdminSettings.findOne({}).lean();
        const resultOfData = {
            statusCode: 200,
            adminSettingData: result,
            message: "تنطیمات دریافت شد.",
        }

        // If no settings found, register random admin settings
        if (!result) {
            const resultOfRegisterNewAdminSettings = await registerRandomAdminSettings();
            const myAdminSettings = await AdminSettings.findOne({}).lean();

            resultOfData.statusCode = resultOfRegisterNewAdminSettings.statusCode;
            resultOfData.message = resultOfRegisterNewAdminSettings.message;
            resultOfData.adminSettingData = myAdminSettings;
        }

        // Store the result in the cache for future requests
        myNodeCache.set(cacheKey, resultOfData);
        return resultOfData;
    } catch (error) {
        console.error("Error retrieving admin settings:", error);
        return {
            statusCode: 500,
            adminSettingData: null,
            message: "خطایی در دریافت تنظیمات رخ داده است.",
        };
    }
};
export default getAdminSettingsData
