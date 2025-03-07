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
        let client = this.pool.pop() || new Client();
        client.ftp.verbose = true;

        try {
            if (client.ftp.socket) {
                return client; // Return existing client if still connected
            }

            console.warn("Reconnecting FTP client...");
            await client.access({
                host: this.host,
                user: this.user,
                password: this.password,
                secure: this.secure,
            });
            return client;
        } catch (error) {
            console.error("FTP reconnection failed:", error);
            throw error;
        }
    }

    releaseClient(client: Client) {
        if (!client.ftp.socket) {
            console.log("Client disconnected. Attempting reconnection...");

            client.access({
                host: this.host,
                user: this.user,
                password: this.password,
                secure: this.secure,
            }).then(() => {
                if (this.pool.length < this.maxConnections) {
                    this.pool.push(client);
                } else {
                    client.close();
                }
            }).catch((error) => {
                console.error("Failed to reconnect client:", error);
                client.close();
            });
            return;
        }

        if (this.pool.length < this.maxConnections) {
            this.pool.push(client);
        } else {
            client.close();
        }
    }
}

// Export a single instance
export const ftpPool = new FtpPool();
