import { LogModel } from "../../models/logs";
import { FilterQuery } from "mongoose";

/**
 * Deletes logs older than the specified timestamp.
 *
 * @param {Object} params - The parameters for log deletion.
 * @param {Date} params.timestamp - The cutoff timestamp; logs older than this will be deleted.
 * @returns {Promise<number>} - The number of deleted logs.
 */
const deleteOldLogs = async ({
                                 timestamp,
                             }: {
    timestamp: Date;
}): Promise<number> => {
    let deletedCount = 0;
    try {
        // Delete logs older than the specified timestamp
        const deleteResult = await LogModel.deleteMany({
            timestamp: { $lt: timestamp }, // Logs older than this date
        });

        deletedCount = deleteResult?.deletedCount || 0;
    } catch (error) {
        console.error('Error deleting old logs:', error);
    }

    return deletedCount;
};

export { deleteOldLogs };
