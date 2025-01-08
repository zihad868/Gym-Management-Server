import express, {Request, Response } from "express";
import dotenv from 'dotenv';


import connectDB from "./db/db";


// Configure Dotenv
dotenv.config();


connectDB();

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
    res.send("Gym Sever is running");
});

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});
