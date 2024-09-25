import { Request, Response } from "express";
import Product from "../models/productModel";
import IProduct from "../interfaces/IProduct";

export const getProducts = async (request: Request, response: Response) => {
    try {
        const products: IProduct[] = await Product.find();
        if (products.length) {
            return response.status(200).send(products);
        }

        response.status(200).send("empty_product_collection");
    } catch (error) {
        if (error) {
            response.status(500).send("server_error");
        }
    }
};

export const getProductDetails = async (request: Request, response: Response) => {
    try {
        const productId = request.params.id;
        const product: IProduct | null = await Product.findById(productId);

        if (product) {
            return response.status(200).send(product);
        }

        response.status(404).send("product_not_found");
    } catch (error) {
        if (error) {
            response.status(500).send("server_error");
        }
    }
};
