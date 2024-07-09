import express from 'express';
import {getAllProducts} from "../../controllers/hesabfaController/getAllProducts";
import {getAllProjects} from "../../controllers/hesabfaController/getAllProjects";
import {getBillData} from "../../controllers/hesabfaController/getBillData";
import {getCustomerList} from "../../controllers/hesabfaController/getCustomerList";
import {submitBillInHesabfa} from "../../controllers/hesabfaController/submitBillInHesabfa";
import {getContactData} from "../../controllers/hesabfaController/getContactData";
import {deleteBillInHesabfaController} from "../../controllers/hesabfaController/deleteBillInHesabfaController";


const router = express.Router();

router.get('/getAllProducts', getAllProducts)
router.get('/getAllProjects', getAllProjects)
router.get('/getBillData/:billNumber', getBillData)
router.get('/getCustomerList/', getCustomerList)
router.get('/getContactData/:contactCode', getContactData)
router.post('/submitBill/', submitBillInHesabfa)
router.get('/deleteBill/:billNumber/:type/:id', deleteBillInHesabfaController)
// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
