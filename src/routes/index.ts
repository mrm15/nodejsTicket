// const express = require('express');
// const router = express.Router();
//
// router.get('/', (req, res) => {
//
//   res.send('Hi dear');
//   // res.render('index')
// })
// module.exports =  router


import { Router } from 'express';
import adminRoutes from './admin';
import authRefreshRoutes from './auth/refresh'; // Adjust the import path as needed
import loginSMSRoutes from './loginRegisterWithSms/loginSMS';
import handleUploadRoutes from './handleUpload';
import loginSMS from "./loginRegisterWithSms/loginSMS";
import refresh from "./auth/refresh";
import {verifyJWT} from "../middleware/verifyJWT";
import handleUpload from "./handleUpload"; // Note the typo in 'handleUpload', consider renaming for clarity
import {admin} from "../controllers/Admin/admin";
import handleUserRoute from "./userRoutes/handleUserRoute";
import handleRoleRoute from "./roleRoutes/handleRoleRoute";
import handleDepartmentRoute from "./departmentRoutes/handleDepartmentRoute";
import handleStatusRoute from "./statusRoute/handleStatusRoute";
import handleLogout from "./logoutRout/handleLogout";
import handleDownloadRoute from "./downloadRoute/handleDownloadRoute";
import handleTicketRoute from "./handleTicketRoute/handleTicketRoute";
import handleTicketReplyRoute from "./handleTicketReplyRoute/handleTicketReplyRoute";


// Add Routes
// app.use('/api', require('./routes/index'));

// ===== Test SMS=========
// app.use('/sendsms', require('./routes/smstest/send'));
// loginRegister SMS
//---------------  Auth ------------------
//app.use('/register', require('./routes/loginRegisterWithSms/registerSMS'));

// Import other routes as needed

const myRouter = Router();

// Use the imported routes
// myRouter.use('/login', loginSMSRoutes);
// myRouter.use('/admin', adminRoutes);
// myRouter.use('/refresh', authRefreshRoutes);
// myRouter.use('/upload', handleUploadRoutes);
// Setup other routes

myRouter.use('/login',loginSMS)
myRouter.use('/admin',admin)
myRouter.use('/download' , handleDownloadRoute)
// // myRouter.use('/register', require('./routes/auth/register'));
// myRouter.use('/auth', require('./routes/auth/auth'));
// myRouter.use('/users', require('./routes/')
myRouter.use('/refresh', refresh);
// myRouter.use('/logout', require('./routes/auth/logout'));
//---------------------------------------

//----------- Path Need To verifyJWT ----------------------------
myRouter.use(verifyJWT);
myRouter.use('/upload' , handleUpload);
myRouter.use('/user' , handleUserRoute);
myRouter.use('/role' , handleRoleRoute);
myRouter.use('/department' , handleDepartmentRoute);
myRouter.use('/status' , handleStatusRoute);
myRouter.use('/ticket' , handleTicketRoute);
myRouter.use('/ticketReply' , handleTicketReplyRoute);
myRouter.use('/logout' , handleLogout);

// myRouter.use('/api/products', require('./routes/products'));
// myRouter.use('/api/productGroup', require('./routes/productGroup'));
// myRouter.use('/api/orders/submit', require('./routes/orders/submit'));
// myRouter.use('/users', require('./routes/users'));
//----------- End  Need To verifyJWT ----------------------------






export default myRouter;


