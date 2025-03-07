import { Client } from "basic-ftp";

class FtpPool {
    private pool: Client[] = [];
    private readonly maxConnections: number;
    private readonly host: string;
    private readonly user: string;
    private readonly password: string;
    private readonly secure: boolean;

    constructor(maxConnections = 5) {
        this.maxConnections = maxConnections;
        this.host = process.env.FTP_HOST || "";
        this.user = process.env.FTP_USER || "";
        this.password = process.env.FTP_PASSWORD || "";
        this.secure = process.env.FTP_SECURE === "true";

        if (!this.host || !this.user || !this.password) {
            throw new Error("FTP configuration is missing in environment variables.");
        }
    }

    /**
     * Check if an FTP client is still connected
     */
    private isClientConnected(client: Client): boolean {
        return !!client.ftp.socket && !client.closed;
    }

    /**
     * Get an available FTP client from the pool or create a new one.
     */
    async getClient(): Promise<Client> {
        let client = this.pool.pop() || new Client();
        client.ftp.verbose = true;

        try {
            // If the client is still connected, return it
            if (this.isClientConnected(client)) {
                return client;
            }

            // Otherwise, establish a new connection
            console.warn("FTP client disconnected, reconnecting...");
            await client.access({
                host: this.host,
                user: this.user,
                password: this.password,
                secure: this.secure,
            });

            return client;
        } catch (error) {
            console.error("FTP connection failed:", error);
            throw error;
        }
    }

    /**
     * Release an FTP client back into the pool, if it's still connected.
     */
    releaseClient(client: Client) {
        if (!this.isClientConnected(client)) {
            console.log("Client disconnected. Closing instead of returning to pool.");
            client.close();
            return;
        }

        if (this.pool.length < this.maxConnections) {
            this.pool.push(client);
        } else {
            client.close(); // If pool is full, close client
        }
    }
}

// Export a single instance
export const ftpPool = new FtpPool();
