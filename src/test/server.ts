require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();
// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// app.use(cors({
//   origin: '*'
// }));
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));
// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));
// app.use(express.static('public'));
//app.set('view engine', 'ejs');
//app.use(expressLayouts)

//const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
app.use(bodyParser.json());


// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');

// app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(express.json()) // add to test


// add Routes
// app.use('/api', require('./routes/index'));


// ===== test SMS=========
// app.use('/sendsms', require('./routes/smstest/send'));
// loginRegister SMS
//---------------  Auth ------------------

app.use('/register', require('./routes/loginRegisterWithSms/registerSMS'))
app.use('/login', require('./routes/loginRegisterWithSms/loginSMS'))
// app.use('/register', require('./routes/auth/register'));
app.use('/auth', require('./routes/auth/auth'));
app.use('/users', require('./routes/users'));
app.use('/refresh', require('./routes/auth/refresh'));
app.use('/logout', require('./routes/auth/logout'));
//---------------------------------------



//----------- path Need To verifyJWT ----------------------------

app.use(verifyJWT);
app.use('/api/products', require('./routes/products'));
app.use('/api/productGroup', require('./routes/productGroup'));
app.use('/api/orders/submit', require('./routes/orders/submit'));
app.use('/users', require('./routes/users'));


//----------- End  Need To verifyJWT ----------------------------


app.all('*', (req, res) => {
  res.status(404).send({message: `404 Not Found: ${req.url} `})
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
