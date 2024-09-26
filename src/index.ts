import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

// installed and imported this separately
import bodyParser from "body-parser";
import cartRoutes from "./routes/cartRoutes";
import { sanitizer } from "./middlewares/sanitizer";
import productGenertor from "./generators/productsGenetor";
import Product from "./models/productModel";
import productRoutes from "./routes/productRoutes";

const app = express();
mongoose.connect(process.env.MONGO_DB!);

const db = mongoose.connection;
db.on("error", (error) => {
    console.log(error);
});

db.once("open", () => {
    console.log("Connected to DB");
});

// generate documents if needed
async function generateDocuments() {
    const count = await Product.countDocuments();

    // check if DB has no or empty products collection
    if (!count) {
        await productGenertor(20);
        return console.log("products generated");
    }
    console.log("product generation not needed");
}
generateDocuments();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); // add secret key here for signing cookies

app.use(sanitizer);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);

app.listen(8002, () => {
    console.log("Port 8002");
});
