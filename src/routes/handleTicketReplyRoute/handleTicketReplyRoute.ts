import express from 'express';
import {createTicketReplyController} from "../../controllers/ticketReplyController/createTicketReplyController";
import {readTicketReplyController} from "../../controllers/ticketReplyController/readTicketReplyController";
import {updateTicketReplyController} from "../../controllers/ticketReplyController/updateTicketReplyController";
import {deleteTicketReplyController} from "../../controllers/ticketReplyController/deleteTicketReplyController";
import {ticketReplyList} from "../../controllers/ticketReplyController/ticketReplyList";
import {ticketReplyChangeTag} from "../../controllers/ticketReplyController/ticketReplyChangeTag";


const router = express.Router();

router.post('/create', createTicketReplyController)
router.get('/read', readTicketReplyController)
router.post('/update', updateTicketReplyController);
router.delete('/delete/:id', deleteTicketReplyController);
router.get('/replyList', ticketReplyList);
router.post('/newTag', ticketReplyChangeTag);

export default router;
