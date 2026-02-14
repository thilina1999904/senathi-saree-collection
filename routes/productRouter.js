import express from 'express';
import { AddProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", AddProduct)
productRouter.get("/", getProduct)
productRouter.put("/:key", updateProduct)
productRouter.delete("/:key", deleteProduct)

export default productRouter;