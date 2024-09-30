import express from 'express';
import {forwardTicketController} from "../../controllers/forwardTicketController/forwardTicketController";
import {readTicketReplyController} from "../../controllers/forwardTicketController/readTicketReplyController";
import {updateTicketReplyController} from "../../controllers/forwardTicketController/updateTicketReplyController";
import {deleteTicketReplyController} from "../../controllers/forwardTicketController/deleteTicketReplyController";
import {ticketReplyList} from "../../controllers/forwardTicketController/ticketReplyList";
import {getForwardConfig} from "../../controllers/forwardTicketController/getForwardConfig";


const router = express.Router();

router.get('/getConfig' , getForwardConfig)
router.post('/submit', forwardTicketController)  //  // forward  to user Or department

export default router;
