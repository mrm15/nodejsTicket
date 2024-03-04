import 'dotenv/config';
import express, {Application, Request, Response,} from 'express';
import cors from 'cors';
import {logger} from './middleware/logEvents';
import {errorHandler} from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials';
import mongoose from 'mongoose';
import {connectDB} from './config/dbConn';
import {corsOptions} from './config/corsOptions';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
import myRouter from "./routes";


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
app.use(express.urlencoded({extended: true}));

// Built-in middleware for JSON
// app.use(express.json());
// @ts-ignore
app.use(express.json({ limit: '10mb', extended: true, encoding: 'utf-8' }));

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
app.use('/', myRouter);
app.all('*', (req: Request, res: Response) => {
    res.status(404).send({message: `404 Not Found: ${req.url} `});
});

app.use(errorHandler);

mongoose.connection.once('open', () => {

    app.listen(PORT, () => {
        console.log('server is running on port ' + PORT);
    })
});
