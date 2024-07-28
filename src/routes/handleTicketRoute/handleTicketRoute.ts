import express from 'express';
import {createTicketController} from "../../controllers/ticketController/createTicketController";
import {readTicketController} from "../../controllers/ticketController/readTicketController";
import {updateTicketController} from "../../controllers/ticketController/updateTicketController";
import {deleteTicketController} from "../../controllers/ticketController/deleteTicketController";
import {ticketList} from "../../controllers/ticketController/ticketList";
import {chatListTicketController} from "../../controllers/ticketController/chatListTicketController";
import {ReadSentTicketController} from "../../controllers/ticketController/readSentTicketController";
import {readMyAllTicketsController} from "../../controllers/ticketController/readMyAllTicketsController";
import {readMyInboxTicketsController} from "../../controllers/ticketController/readMyInboxTicketsController";
import {readDepartmentTicketsController} from "../../controllers/ticketController/readDepartmentTicketsController";

const router = express.Router();

router.post('/create', createTicketController);

router.get('/read', readTicketController); // همه ی تیکت های سیستم رو یکجا میده
router.get('/readSentTickets', ReadSentTicketController); // تیکت های ارسال من رو میره از توی کل تیکت ها میکشه بیرون و نشون میده
router.get('/readMyAllTickets', readMyAllTicketsController)// done works correctly; // فقط تیکت هایی که در یوزر مدل قرار داره رو بفرست انجام شده
router.get('/readMyInboxTickets', readMyInboxTicketsController);//done works correctly; //  مشترک بین دپارتمان و یورز که در یوزر مدل قرار داره
router.get('/readDepartmentTickets', readDepartmentTicketsController); // تیکت های  دپارتمان که فقط ادمین دپارتمان بهشون دسترسی داره  tickets that is im my department  just admin of department has access to this part

router.get('/chatList/:ticketId', chatListTicketController);
router.post('/update', updateTicketController);
router.delete('/delete/:id', deleteTicketController);
router.get('/statusList', ticketList);

export default router;
