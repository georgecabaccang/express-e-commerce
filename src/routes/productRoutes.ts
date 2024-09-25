import express from "express";
import { getProductDetails, getProducts } from "../controllers/productController";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductDetails);

export default productRoutes;
