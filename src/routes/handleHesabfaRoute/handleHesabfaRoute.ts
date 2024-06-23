import express from 'express';
import {getAllProducts} from "../../controllers/hesabfaController/getAllProducts";
import {getAllProjects} from "../../controllers/hesabfaController/getAllProjects";


const router = express.Router();

router.get('/getAllProducts', getAllProducts)
router.get('/getAllProjects', getAllProjects)
// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
