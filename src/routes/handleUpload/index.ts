import express, {Request, Response, NextFunction, Request as ExpressRequest, Router} from 'express';
import {handleUpload} from '../../controllers/handleUplaodController/uplaod';

import multer from 'multer';
import path from "path";
import {JwtPayload} from "jsonwebtoken";
import {createDepartmentController} from "../../controllers/departmentController/createDepartmentController";
import {readDepartmentController} from "../../controllers/departmentController/readDepartmentController";
import {updateDepartmentController} from "../../controllers/departmentController/updateDepartmentController";
import {deleteDepartmentController} from "../../controllers/departmentController/deleteDepartmentController";
import {departmentList} from "../../controllers/departmentController/departmentList";
import {readFileController} from "../../controllers/handleUplaodController/readFileController";
import {updateFileController} from "../../controllers/handleUplaodController/updateFileController";
import {deleteFileController} from "../../controllers/handleUplaodController/deleteFileController";
import {getFileController} from "../../controllers/handleUplaodController/getFileController";

const router = express.Router();



router.post('/', handleUpload);



// router.post('/',  uploadController.handleUpload);


export default router;
