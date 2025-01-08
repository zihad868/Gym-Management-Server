import express, {Request, Response } from "express";
import dotenv from 'dotenv';


import connectDB from "./db/db";

// Import Route
import authRoutes from './routes/authRoutes';
import adminRoute from './routes/adminRoutes';
import trainerRoute from './routes/trainerRoutes';
import traineeRoute from './routes/trineeRoutes';

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


// Trainer Routes  
app.use('/api/auth', trainerRoute);


// Trainee Routes  
app.use('/api/auth', traineeRoute);


app.get("/", (req: Request, res: Response) => {
    res.send("Gym Sever is running");
});



app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});
