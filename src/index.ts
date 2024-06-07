import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

// installed and imported this separately
import bodyParser from "body-parser";

const app = express();
mongoose.connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6"
);

const db = mongoose.connection;
db.on("error", (error) => {
    console.log(error);
});

db.once("open", () => {
    console.log("Connected to DB");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.listen(8002, () => {
    console.log("Port 8002");
});
