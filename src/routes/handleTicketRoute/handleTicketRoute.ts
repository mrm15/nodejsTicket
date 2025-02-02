import express from 'express';
import {createTicketController} from "../../controllers/ticketController/createTicketController";
import {readTicketController} from "../../controllers/ticketController/readTicketController";
import {updateTicketController} from "../../controllers/ticketController/updateTicketController";
import {deleteTicketController} from "../../controllers/ticketController/deleteTicketController";
import {chatListTicketController} from "../../controllers/ticketController/chatListTicketController";
import {ReadSentTicketController} from "../../controllers/ticketController/readSentTicketController";
import {readDepartmentTicketsController} from "../../controllers/ticketController/readDepartmentTicketsController";
import {readOutBoxAssignmentController} from "../../controllers/ticketController/readOutBoxAssignmentController";
import {readInBoxAssignmentController} from "../../controllers/ticketController/readInBoxAssignmentController";
import {readAllAssignmentController} from "../../controllers/ticketController/readAllAssignmentController";
import {markAsReadTicketAssignments} from "../../controllers/ticketController/markAsReadTicketAssignments";
import {myTicketListController} from "../../controllers/ticketController/myTicketListController";
import {createTicketAdvancedController} from "../../controllers/ticketController/createTicketAdvancedController";
import {changeTicketStatusController} from "../../controllers/ticketController/changeTicketStatusController";
import {ticketChangeTag} from "../../controllers/ticketController/ticketChangeTag";

const router = express.Router();

router.post('/create', createTicketController);
router.post('/createAdvanced', createTicketAdvancedController);

/**  get Ticket List   */
// router.post('/create', createTicketController);
// خواندن کل تیکت های سیستم به صورت یکجا
// router.get('/read', readTicketController); // همه ی تیکت های سیستم رو یکجا میده

// خواندن تیکت هایی که خودم ارسال کردم. نگاه میکنیم ببینیم توی جدول تیکت ها  فرستنده اگه خودم بودم لیست بشه
// router.get('/readSentTickets', ReadSentTicketController); // تیکت های ارسال من رو میره از توی کل تیکت ها میکشه بیرون و نشون میده

// باید برم توی جدول  تیکت هایی که به کاربر خاص ارجاع میشن ببینم  که منه کاربر چه تیکت هایی هست که به من ارجاع شده
// و وضعیت خواندن هم براشون تعیین میکنم که  اگه نخونده بود  بولد بشه سمت فرانت
// router.get('/readMyAllTickets', readMyAllTicketsController)// done works correctly; // فقط تیکت هایی که در یوزر مدل قرار داره رو بفرست انجام شده

// تیکت هایی که توی دپارتمان هستند و فقط ادمین دپارتمان میتونه ببینه
// میرم از بین کل تیکت ها  اونایی که دپارتمان الانش  مثل دپارتمان خودمه رو میکشم بیرون و به کاربر نشون میدم.
// router.get('/readDepartmentTickets', readDepartmentTicketsController); // تیکت های  دپارتمان که فقط ادمین دپارتمان بهشون دسترسی داره  tickets that is im my department  just admin of department has access to this part
/**  End Of   get Ticket List   */
router.get('/chatList/:ticketId', chatListTicketController);
router.post('/update', updateTicketController); // need to work!
router.delete('/delete/:id', deleteTicketController);

// Apply the filter middleware to these routes
// این دوتا مستقیم با تیکت سروکار دارن
router.post('/read', readTicketController) // read all tickets for admin
router.post('/myTicketList', myTicketListController) //
router.post('/readSentTickets', ReadSentTicketController) //for customer read sentTickets List for example I sent a ticket
//--------------------------------------------------
// router.post('/readMyAllTickets', filterMiddleware, readMyAllTicketsControllerPost) // read my tickets   from custom table With Read Status

// ارسالی ها
router.post('/readMyForwardedTickets', readOutBoxAssignmentController)
// صندوق ورودی من
router.post('/readForwardedToMeTickets', readInBoxAssignmentController)

// ورودی دپارتمان // read department tickets
router.post('/readDepartmentTickets', readDepartmentTicketsController)
// همه ی تیکت های ارجاعی برای مدیر
router.post('/readAllAssignments', readAllAssignmentController)
router.post('/markAsReadTicketAssignments', markAsReadTicketAssignments)
router.post('/changeStatus', changeTicketStatusController)
router.post('/newTag', ticketChangeTag);

export default router;
