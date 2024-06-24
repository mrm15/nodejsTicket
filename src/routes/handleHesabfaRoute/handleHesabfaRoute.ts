import express from 'express';
import {getAllProducts} from "../../controllers/hesabfaController/getAllProducts";
import {getAllProjects} from "../../controllers/hesabfaController/getAllProjects";
import {getBillData} from "../../controllers/hesabfaController/getBillData";
import {getCustomerList} from "../../controllers/hesabfaController/getCustomerList";


const router = express.Router();

router.get('/getAllProducts', getAllProducts)
router.get('/getAllProjects', getAllProjects)
router.get('/getBillData/:billNumber', getBillData)
router.get('/getCustomerList/', getCustomerList)
// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
