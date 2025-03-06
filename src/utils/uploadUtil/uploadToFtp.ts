// ftpUploader.ts
import {Client} from "basic-ftp";
import {Readable} from "stream";
import {ftpPool} from "./ftpPool";

/**
 * Converts a Buffer to a Readable stream.
 * @param buffer The Buffer to convert.
 * @returns A Readable stream.
 */
function bufferToStream(buffer: Buffer): Readable {
    return Readable.from([buffer]);
}

interface IUploadToFtp {
    fileBuffer: Buffer, remoteFileName: string,myPath?:string
}
/**
 * Uploads a file to the FTP server using environment variables for configuration.
 * @param fileBuffer The file data as a Buffer.
 * @param remoteFileName The remote filename including the desired path.
 * @param myPath
 */
export async function uploadToFtp({fileBuffer, remoteFileName, myPath = "uploads"}:IUploadToFtp): Promise<void> {

    const client = await ftpPool.getClient();
    try {
        const stream = bufferToStream(fileBuffer);
        await client.uploadFrom(stream, `/data/${myPath}/${remoteFileName}`);
    } catch (error) {
        console.error("FTP upload error:", error);
        throw error;
    } finally {
        ftpPool.releaseClient(client);
    }


    // const client = new Client();
    // client.ftp.verbose = true;
    //
    // // Read FTP connection details from environment variables
    // const host = process.env.FTP_HOST;
    // const user = process.env.FTP_USER;
    // const password = process.env.FTP_PASSWORD;
    // const secure = process.env.FTP_SECURE === "true";
    //
    // if (!host || !user || !password) {
    //     throw new Error("FTP configuration is missing in environment variables.");
    // }
    //
    // try {
    //     await client.access({
    //         host,
    //         user,
    //         password,
    //         secure,
    //     });
    //
    //     const stream = bufferToStream(fileBuffer);
    //     await client.uploadFrom(stream, `/data/uploads/${remoteFileName}`);
    // } catch (error) {
    //     console.error("FTP upload error:", error);
    //     throw error;
    // } finally {
    //     client.close();
    // }
}
