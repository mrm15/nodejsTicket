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

// router.post('/toNextDepartment', readTicketReplyController) // // forward ticket  to Department

// router.post('/toUserToDepartment', readTicketReplyController) // // forward ticket  to  a user in a Department

router.post('/update', updateTicketReplyController)
router.delete('/delete/:id', deleteTicketReplyController)
router.get('/replyList', ticketReplyList);

export default router;
