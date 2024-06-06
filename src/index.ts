import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose.connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6"
);

const db = mongoose.connection;
db.on("error", (error: Error) => {
    console.log(error);
});

db.once("open", () => {
    console.log("Connected to DB");
});

app.listen(8002, () => {
    console.log("Port 8002");
});
