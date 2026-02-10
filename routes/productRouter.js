import express from 'express';
import { AddProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", AddProduct)

export default productRouter;