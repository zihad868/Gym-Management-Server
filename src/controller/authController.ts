import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response): Promise<void> =>  {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User Created successfully',
            data: { username, email, role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};




// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ success: false, message: "Invalid credentials..." });
        return;
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ success: false, message: "Invalid credentials" });
        return;
      }
  
      // Generate JWT token
      const token = jwt.sign({ userEmail: user.email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: { username: user.username, email: user.email, role: user.role }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };