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

    async getClient(): Promise<Client> {
        if (this.pool.length > 0) {
            return this.pool.pop()!; // Reuse an existing client
        } else {
            const client = new Client();
            await client.access({
                host: this.host,
                user: this.user,
                password: this.password,
                secure: this.secure,
            });
            return client;
        }
    }

    releaseClient(client: Client) {
        if (this.pool.length < this.maxConnections) {
            this.pool.push(client); // Return client to pool
        } else {
            client.close(); // Close client if pool is full
        }
    }
}

// Export a single instance
export const ftpPool = new FtpPool();
