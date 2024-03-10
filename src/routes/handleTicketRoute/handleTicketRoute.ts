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

router.get('/read', readTicketController); // a simple get All data controller for ADMIN
router.get('/readSentTickets', ReadSentTicketController); // sent ticket List // done
router.get('/readMyAllTickets', readMyAllTicketsController); // done tickets that is im my department and in my ticketAccess List in user Model
router.get('/readMyInboxTickets', readMyInboxTicketsController); //  tickets that is im my department and in my ticketAccess List in user Model
router.get('/readDepartmentTickets', readDepartmentTicketsController); //  tickets that is im my department  just admin of department has access to this part

router.get('/chatList/:ticketId', chatListTicketController);
router.post('/update', updateTicketController);
router.delete('/delete/:id', deleteTicketController);
router.get('/statusList', ticketList);

export default router;
