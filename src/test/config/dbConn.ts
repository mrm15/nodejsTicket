const mongoose = require('mongoose');


// const mongoURI = `mongodb+srv://root:09384642159@cluster0.l53kbk3.mongodb.net/`;
const mongoURI = `mongodb://127.0.0.1:27017/test`;


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // useUnifiedTopology: true,
            useNewUrlParser: true,
        });

    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB