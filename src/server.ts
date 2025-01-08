import express, {Request, Response } from "express";
import dotenv from 'dotenv';


import connectDB from "./db/db";

// Import Route
import authRoutes from './routes/authRoutes';
import adminRoute from './routes/adminRoutes';

// Configure Dotenv
dotenv.config();


connectDB();

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());

// Routes
// Authentication Routes
app.use('/api/auth', authRoutes);

// Admin Routes
app.use('/api/auth', adminRoute);



app.get("/", (req: Request, res: Response) => {
    res.send("Gym Sever is running");
});



app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});
