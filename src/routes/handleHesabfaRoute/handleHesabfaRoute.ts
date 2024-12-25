import express from 'express';
import {getAllProjects} from "../../controllers/hesabfaController/getAllProjects";
import {getBillData} from "../../controllers/hesabfaController/getBillData";
import {getCustomerList} from "../../controllers/hesabfaController/getCustomerList";
import {submitBillInHesabfa} from "../../controllers/hesabfaController/submitBillInHesabfa";
import {getContactData} from "../../controllers/hesabfaController/getContactData";
import {deleteBillInHesabfaController} from "../../controllers/hesabfaController/deleteBillInHesabfaController";
import {getAllProductsFromFile} from "../../controllers/hesabfaController/getAllProductsFromFile";
import {getBillList} from "../../controllers/hesabfaController/getBillList";
import {getBillListTableG} from "../../controllers/hesabfaController/getBillListTableG";
import {updatePackStatusTo8} from "../../controllers/hesabfaController/updatePackStatusTo8";
import {
    deleteBillInHesabfaControllerByNumber
} from "../../controllers/hesabfaController/deleteBillInHesabfaControllerByNumber";
import {updateBillsFileController} from "../../controllers/hesabfaController/updateBillsFileController";
import {saveProductsAsFilePool} from "../../controllers/hesabfaController/saveProductsAsFilePool";
import {updateBillStatus} from "../../controllers/hesabfaController/updateBillStatus";


const router = express.Router();

router.get('/getAllProducts', getAllProductsFromFile);
router.post('/saveProductsAsFilePool', saveProductsAsFilePool);
router.get('/getAllProjects', getAllProjects)
router.get('/getBillData/:billNumber', getBillData)
router.get('/getCustomerList/', getCustomerList)
router.get('/getContactData/:contactCode', getContactData)
router.post('/submitBill/', submitBillInHesabfa)
router.get('/deleteBill/:billNumber/:type/:id', deleteBillInHesabfaController)
router.get('/deleteBillFromHesabfa/:billNumber', deleteBillInHesabfaControllerByNumber)
router.post('/getBillList/', getBillList)
router.post('/getBillListData/', getBillListTableG) //  showFactorListInMenu role
// router.post('/updatePackStatusTo8/', updatePackStatusTo8) // برای جدول بسته بندی و ارسال
// i will delete  updatePackStatusTo8.ts
router.post('/changeSentStatus/', updateBillStatus) // بسته بندی و ارسال و تایید فاکتور

// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)
router.post('/updateBillsFile/', updateBillsFileController) // به روز رسانی فایل های  فاکتور bills



export default router;
