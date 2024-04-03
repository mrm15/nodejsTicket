import express from 'express';
import {forwardTicketToUserController} from "../../controllers/forwardTicketController/forwardTicketToUserController";
import {readTicketReplyController} from "../../controllers/forwardTicketController/readTicketReplyController";
import {updateTicketReplyController} from "../../controllers/forwardTicketController/updateTicketReplyController";
import {deleteTicketReplyController} from "../../controllers/forwardTicketController/deleteTicketReplyController";
import {ticketReplyList} from "../../controllers/forwardTicketController/ticketReplyList";
import {getForwardConfig} from "../../controllers/forwardTicketController/getForwardConfig";


const router = express.Router();

router.get('/getConfig' , getForwardConfig)
router.post('/toUser', forwardTicketToUserController)  //  // forward  to user
router.post('/toDepartment', readTicketReplyController) // // forward ticket  to Department

router.post('/toUserToDepartment', readTicketReplyController) // // forward ticket  to  a user in a Department

router.post('/update', updateTicketReplyController)
router.delete('/delete/:id', deleteTicketReplyController)
router.get('/replyList', ticketReplyList);

export default router;
