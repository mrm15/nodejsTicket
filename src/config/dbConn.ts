import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/ticket';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI, {
           // useNewUrlParser: true,
            //useUnifiedTopology: true, // Add this line for modern versions
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
};

export {connectDB};
