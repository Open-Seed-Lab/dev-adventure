import express from "express";
import { getProducts, updateProduct, deleteProduct, addProduct } from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", addProduct);

export default router;
