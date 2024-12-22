import express from "express";
import {getAllProductsFromFilePublic} from "../../controllers/handlePublicController/getAllProductsFromFilePublic";

const router = express.Router();

router.get('/productList', getAllProductsFromFilePublic);
export default router;