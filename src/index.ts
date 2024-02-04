import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import { logger } from './middleware/logEvents';
import { errorHandler } from './middleware/errorHandler';
import { verifyJWT } from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials';
import mongoose from 'mongoose';
import {connectDB} from './config/dbConn';
import { corsOptions } from './config/corsOptions';
import bodyParser from 'body-parser';
import  loginSMS from './routes/loginRegisterWithSms/loginSMS'
import useragent from 'express-useragent';
import admin from "./routes/admin";
import refresh from "./routes/auth/refresh";
import handleUplaod from "./routes/handleUplaod";



const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

// Connect to MongoDB
void connectDB();

// Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle url-encoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for JSON
app.use(express.json());

app.use(useragent.express());


// Middleware for cookies
app.use(cookieParser());

// Serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(expressLayouts)

// const expressLayouts = require('express-ejs-layouts');
app.use(bodyParser.json());

// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');

// app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(express.json()); // add to test

// Add Routes
// app.use('/api', require('./routes/index'));

// ===== Test SMS=========
// app.use('/sendsms', require('./routes/smstest/send'));
// loginRegister SMS
//---------------  Auth ------------------
//app.use('/register', require('./routes/loginRegisterWithSms/registerSMS'));
// app.use("/", )
 app.use('/login',loginSMS);
 app.use('/admin',admin)
// // app.use('/register', require('./routes/auth/register'));
// app.use('/auth', require('./routes/auth/auth'));
// app.use('/users', require('./routes/')
app.use('/refresh', refresh);
// app.use('/logout', require('./routes/auth/logout'));
//---------------------------------------

//----------- Path Need To verifyJWT ----------------------------
app.use(verifyJWT);
app.use('/upload' , handleUplaod);

// app.use('/api/products', require('./routes/products'));
// app.use('/api/productGroup', require('./routes/productGroup'));
// app.use('/api/orders/submit', require('./routes/orders/submit'));
// app.use('/users', require('./routes/users'));
//----------- End  Need To verifyJWT ----------------------------

app.all('*', (req: Request, res: Response) => {
    res.status(404).send({ message: `404 Not Found: ${req.url} ` });
});

// app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
