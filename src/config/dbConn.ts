import mongoose from 'mongoose';



const MONGO_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

if (!MONGO_USER) {
    throw new Error('MONGO_USER is not defined');
}

if (!MONGODB_PASSWORD) {
    throw new Error('MONGODB_PASSWORD is not defined');
}

const dbName = 'ticket'; // Replace 'ticket' with your actual database name


// const mongoURI = 'mongodb://127.0.0.1:27017/ticket';
const mongoURI = `mongodb://${MONGO_USER}:${MONGODB_PASSWORD}@services.irn5.chabokan.net:36399/${dbName}?authSource=admin`;
//mongodb://USERNASME:PASSWORD@MONGO_SERVER_URL:MONGO_PORT/?authSource=admin

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI, {
           // useNewUrlParser: true,
            //useUnifiedTopology: true, // Add this line for modern versions
        });

    } catch (err) {
        console.error(err);
    }
};

export {connectDB};
