import { CorsOptions } from 'cors';
import allowedOrigins from './allowedOrigins';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(<string>origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

export {corsOptions};
