import { Request, Response } from "express";
import Product from "../models/productModel";
import IProduct from "../interfaces/IProduct";

export const getProducts = async (request: Request, response: Response) => {
    try {
        const products: IProduct[] = await Product.find();
        if (products.length) {
            response.status(200).send(products);
        } else {
            response.status(200).send("empty_product_collection");
        }
    } catch (error) {
        if (error) {
            response.status(500).send("server_error");
        }
    }
};
