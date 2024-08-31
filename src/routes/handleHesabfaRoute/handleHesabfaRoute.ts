import express from 'express';
import {getAllProjects} from "../../controllers/hesabfaController/getAllProjects";
import {getBillData} from "../../controllers/hesabfaController/getBillData";
import {getCustomerList} from "../../controllers/hesabfaController/getCustomerList";
import {submitBillInHesabfa} from "../../controllers/hesabfaController/submitBillInHesabfa";
import {getContactData} from "../../controllers/hesabfaController/getContactData";
import {deleteBillInHesabfaController} from "../../controllers/hesabfaController/deleteBillInHesabfaController";
import {saveProductsAsFile} from "../../controllers/hesabfaController/saveProductsAsFile";
import {getAllProductsFromFile} from "../../controllers/hesabfaController/getAllProductsFromFile";
import {getBillList} from "../../controllers/hesabfaController/getBillList";
import {getBillListTableG} from "../../controllers/hesabfaController/getBillListTableG";
import {updatePackStatusTo8} from "../../controllers/hesabfaController/updatePackStatusTo8";
import {changeSentStatus} from "../../controllers/hesabfaController/changeSentStatus";


const router = express.Router();

// router.get('/getAllProducts', getAllProducts);
router.get('/getAllProducts', getAllProductsFromFile);
router.get('/saveProductsAsFile', saveProductsAsFile);
router.get('/getAllProjects', getAllProjects)
router.get('/getBillData/:billNumber', getBillData)
router.get('/getCustomerList/', getCustomerList)
router.get('/getContactData/:contactCode', getContactData)
router.post('/submitBill/', submitBillInHesabfa)
router.get('/deleteBill/:billNumber/:type/:id', deleteBillInHesabfaController)
router.post('/getBillList/', getBillList)
router.post('/getBillListData/', getBillListTableG) // برای جدول بسته بندی و ارسال
router.post('/updatePackStatusTo8/', updatePackStatusTo8) // برای جدول بسته بندی و ارسال
router.post('/changeSentStatus/', changeSentStatus) // برای جدول بسته بندی و ارسال

// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
