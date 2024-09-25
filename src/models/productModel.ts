import { model, Schema } from "mongoose";

const productSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
    reviews: { type: Number, required: true },
});

const Product = model("Product", productSchema);
export default Product;
