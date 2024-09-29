import express from 'express';
import {createTicketController} from "../../controllers/ticketController/createTicketController";
import {readTicketController} from "../../controllers/ticketController/readTicketController";
import {updateTicketController} from "../../controllers/ticketController/updateTicketController";
import {deleteTicketController} from "../../controllers/ticketController/deleteTicketController";
import {ticketList} from "../../controllers/ticketController/ticketList";
import {chatListTicketController} from "../../controllers/ticketController/chatListTicketController";
import {ReadSentTicketController} from "../../controllers/ticketController/readSentTicketController";
import {readMyAllTicketsController} from "../../controllers/ticketController/readMyAllTicketsController";
import {readDepartmentTicketsController} from "../../controllers/ticketController/readDepartmentTicketsController";
import {filterMiddleware} from "../../middleware/filterForSearchTickets/filterMiddleware";
import {readMyAllTicketsControllerPost} from "../../controllers/ticketController/readMyAllTicketsControllerPost";

const router = express.Router();

router.post('/create', createTicketController);

/**  get Ticket List   */
router.post('/create', createTicketController);
// خواندن کل تیکت های سیستم به صورت یکجا
router.get('/read', readTicketController); // همه ی تیکت های سیستم رو یکجا میده

// خواندن تیکت هایی که خودم ارسال کردم. نگاه میکنیم ببینیم توی جدول تیکت ها  فرستنده اگه خودم بودم لیست بشه
router.get('/readSentTickets', ReadSentTicketController); // تیکت های ارسال من رو میره از توی کل تیکت ها میکشه بیرون و نشون میده

// باید برم توی جدول  تیکت هایی که به کاربر خاص ارجاع میشن ببینم  که منه کاربر چه تیکت هایی هست که به من ارجاع شده
// و وضعیت خواندن هم براشون تعیین میکنم که  اگه نخونده بود  بولد بشه سمت فرانت
router.get('/readMyAllTickets', readMyAllTicketsController)// done works correctly; // فقط تیکت هایی که در یوزر مدل قرار داره رو بفرست انجام شده

// تیکت هایی که توی دپارتمان هستند و فقط ادمین دپارتمان میتونه ببینه
// میرم از بین کل تیکت ها  اونایی که دپارتمان الانش  مثل دپارتمان خودمه رو میکشم بیرون و به کاربر نشون میدم.
router.get('/readDepartmentTickets', readDepartmentTicketsController); // تیکت های  دپارتمان که فقط ادمین دپارتمان بهشون دسترسی داره  tickets that is im my department  just admin of department has access to this part
/**  End Of   get Ticket List   */
router.get('/chatList/:ticketId', chatListTicketController);
router.post('/update', updateTicketController);
router.delete('/delete/:id', deleteTicketController);
router.get('/statusList', ticketList);

// Apply the filter middleware to these routes
router.post('/read', filterMiddleware,readTicketController) // read all tickets for admin
router.post('/readSentTickets', filterMiddleware,ReadSentTicketController) // read sentTickets List for example I sent a ticket
router.post('/readMyAllTickets', filterMiddleware, readMyAllTicketsControllerPost) // read my tickets   from custom table With Read Status
router.post('/readDepartmentTickets', filterMiddleware, readDepartmentTicketsController) // read department tickets

export default router;
