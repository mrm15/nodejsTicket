import mongoose, { Schema, Document } from 'mongoose';

interface ILogs extends Document {
    // Phone number associated with the log (if applicable)
    phoneNumber: string | null;

    // Description of the log
    description: string | null;

    // IP address of the user making the request
    ipAddress: string | null;

    // User-Agent string from the request header
    userAgent: string | null;

    // Route or URL the request was made to
    route: string | null;

    // HTTP method used for the request (GET, POST, etc.)
    method: string | null;

    // Server response status code
    statusCode: number | null;

    // Date and time of the log
    timestamp: Date;

    // Server response time in milliseconds
    responseTime: number | null;

    // Additional data sent with the request (e.g., request body)
    payload: Record<string, any>;

    // Headers sent with the request
    headers: Record<string, any>;

    // Type of device making the request (e.g., mobile, desktop)
    deviceType: string | null;

    // Operating system of the device (e.g., Windows, Linux, Android)
    os: string | null;

    // Browser used for the request (e.g., Chrome, Firefox)
    browser: string | null;

    // Error object or message (if applicable)
    error: Record<string, any> | string | null;

    // Document creation time (added automatically by Mongoose)
    createdAt?: Date;

    // Document update time (added automatically by Mongoose)
    updatedAt?: Date;
}

// Log schema definition
const logSchema: Schema<ILogs> = new Schema<ILogs>(
    {
        phoneNumber: {
            type: String,
            required: false,
            default: null,
        },
        description: {
            type: String,
            required: false,
            default: null,
        },
        ipAddress: {
            type: String,
            required: false,
            default: null,
        },
        userAgent: {
            type: String,
            required: false,
            default: null,
        },
        route: {
            type: String,
            required: false,
            default: null,
        },
        method: {
            type: String,
            required: false,
            default: null,
        },
        statusCode: {
            type: Number,
            required: false,
            default: null,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        responseTime: {
            type: Number,
            required: false,
            default: null,
        },
        payload: {
            type: Schema.Types.Mixed,
            required: false,
            default: null,
        },
        headers: {
            type: Schema.Types.Mixed,
            required: false,
            default: null,
        },
        deviceType: {
            type: String,
            required: false,
            default: null,
        },
        os: {
            type: String,
            required: false,
            default: null,
        },
        browser: {
            type: String,
            required: false,
            default: null,
        },
        error: {
            type: Schema.Types.Mixed, // Can store an object or a string
            required: false,
            default: null,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Index definitions
logSchema.index({ eventType: 1 });
logSchema.index({ phoneNumber: 1 });
logSchema.index({ timestamp: -1 }); // Descending order for recent logs

// Create and export the model
const LogModel = mongoose.model<ILogs>('logs', logSchema);

export { LogModel, ILogs };
