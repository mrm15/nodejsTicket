import express from 'express';
import {createTicketController} from "../../controllers/ticketController/createTicketController";
import {readTicketController} from "../../controllers/ticketController/readTicketController";
import {updateTicketController} from "../../controllers/ticketController/updateTicketController";
import {deleteTicketController} from "../../controllers/ticketController/deleteTicketController";
import {ticketList} from "../../controllers/ticketController/ticketList";
import {chatListTicketController} from "../../controllers/ticketController/chatListTicketController";

const router = express.Router();

router.post('/create', createTicketController);

router.get('/read', readTicketController); // a simple get All data controller for ADMIN
router.get('/readSentTicket', readTicketController); // sent ticket List
router.get('/readMyInboxTicket', readTicketController); // tickets that is im my department and in my ticketAccess List in user Model
router.get('/readMyAllTickets', readTicketController); // tickets that is im my department and in my ticketAccess List in user Model

router.get('/chatList/:ticketId', chatListTicketController);
router.post('/update', updateTicketController);
router.delete('/delete/:id', deleteTicketController);
router.get('/statusList', ticketList);

export default router;
