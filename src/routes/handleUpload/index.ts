import express, {Request, Response, NextFunction, Request as ExpressRequest, Router} from 'express';
import {handleUpload} from '../../controllers/handleUplaodController/uplaod';
import {readFilesController} from "../../controllers/handleUplaodController/readFilesController";



const router = express.Router();



router.post('/', handleUpload);
router.get('/read', readFilesController);



// router.post('/',  uploadController.handleUpload);


export default router;
