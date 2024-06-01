import express from 'express';
import {downloadController} from "../../controllers/handleDownloadController/downloadController";
import {
    handleSendPendingSmsController
} from "../../controllers/handleSendPendingSmsController/handleSendPendingSmsController";

const router = express.Router();

router.get('/', handleSendPendingSmsController);


export default router;
