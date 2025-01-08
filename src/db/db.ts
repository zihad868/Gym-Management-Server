import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = process.env.DATABASE_URL;

    if (!mongoURL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    // Remove the deprecated options
    await mongoose.connect(mongoURL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
