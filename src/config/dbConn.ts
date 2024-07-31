import mongoose from 'mongoose';



const MONGO_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_PORT = process.env.MONGODB_PORT;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGO_USER) {
    throw new Error('MONGO_USER is not defined');
}

if (!MONGODB_PASSWORD) {
    throw new Error('MONGODB_PASSWORD is not defined');
}
if (!MONGODB_PORT) {
    throw new Error('MONGODB_PORT is not defined');
}
if (!MONGODB_URI) {
    throw new Error('MONGODB_PORT is not defined');
}

const dbName = 'ticket'; // Replace 'ticket' with your actual database name


// const mongoURI = 'mongodb://services.irn4.chabokan.net:28192/ticket';
const mongoURI = `mongodb://${MONGO_USER}:${MONGODB_PASSWORD}@${MONGODB_URI}:${MONGODB_PORT}/${dbName}?authSource=admin`;
//mongodb://USERNASME:PASSWORD@MONGO_SERVER_URL:MONGO_PORT/?authSource=admin
// console.log(mongoURI)
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
