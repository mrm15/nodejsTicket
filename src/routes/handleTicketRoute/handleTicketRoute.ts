import express from 'express';
import {createTicketController} from "../../controllers/ticketController/createTicketController";
import {readTicketController} from "../../controllers/ticketController/readTicketController";
import {updateTicketController} from "../../controllers/ticketController/updateTicketController";
import {deleteTicketController} from "../../controllers/ticketController/deleteTicketController";
import {ticketList} from "../../controllers/ticketController/ticketList";

const router = express.Router();

router.post('/create', createTicketController);
router.get('/read', readTicketController);
router.post('/update', updateTicketController);
router.delete('/delete/:id', deleteTicketController);
router.get('/statusList', ticketList);

export default router;
