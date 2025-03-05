import {ftpPool} from "./ftpPool";

export const deleteFileFromFtp = async (remoteFilePath: string): Promise<void> => {
    const client = await ftpPool.getClient();
    try {
        await client.remove(remoteFilePath);
        // console.log(`✅ File ${remoteFilePath} deleted successfully.`);
    } catch (error) {
        console.error(`❌ Error deleting file ${remoteFilePath}:`, error);
    } finally {
        ftpPool.releaseClient(client); // Return client to the pool
    }
};
