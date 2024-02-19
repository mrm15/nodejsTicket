import express, {Request, Response, NextFunction, Request as ExpressRequest, Router} from 'express';
import {handleUpload} from '../../controllers/handleUplaodController/uplaod';
import {readFilesController} from "../../controllers/handleUplaodController/readFilesController";
import {deleteFilesController} from "../../controllers/handleUplaodController/deleteFilesController";



const router = express.Router();



router.post('/', handleUpload); // upload a File to server  register in files DB and upload in uploads Folder
router.get('/read', readFilesController);
router.delete('/delete/:id', deleteFilesController);



// router.post('/',  uploadController.handleUpload);


export default router;
