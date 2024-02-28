import express from 'express';
import {createTicketReplyController} from "../../controllers/ticketReplyController/createTicketReplyController";
import {readTicketReplyController} from "../../controllers/ticketReplyController/readTicketReplyController";
import {updateTicketReplyController} from "../../controllers/ticketReplyController/updateTicketReplyController";
import {deleteTicketReplyController} from "../../controllers/ticketReplyController/deleteTicketReplyController";
import {ticketReplyList} from "../../controllers/ticketReplyController/ticketReplyList";


const router = express.Router();

router.get('/create', createTicketReplyController)
router.get('/read', readTicketReplyController)
router.post('/update', updateTicketReplyController);
router.delete('/delete/:id', deleteTicketReplyController);
router.get('/replyList', ticketReplyList);

export default router;
