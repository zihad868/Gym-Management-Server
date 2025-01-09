import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

export const registerAdmin = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin){
      res.status(400).send('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).send('Admin registered successfully');
  } catch (error) {
    res.status(500).send('Error registering admin');
  }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin){
      res.status(404).send('Admin not found');
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch){
      res.status(400).send('Invalid credentials');
      return;
    }

    const token = jwt.sign({ id: admin.email, role: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ 
      success: true,
        message: 'Login successful',
        data: {
          token,
          admin: { username: admin.name, email: admin.email}
        }
    });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};


import ClassSchedule from '../models/ClassSchedule';
import Trainer from '../models/Trainer';

export const createClassSchedule = async (req: Request, res: Response): Promise<void> => {
  const { name, date, startTime, endTime, trainerEmail } = req.body;

  try {
    // Check if the trainer exists
    const trainer = await Trainer.findOne({ email: trainerEmail });
    if (!trainer) {
      res.status(404).json({ message: 'Trainer not found' });
      return;
    }

    // Check if there are already 5 classes scheduled for the day
    const existingSchedules = await ClassSchedule.find({ date });
    if (existingSchedules.length >= 5) {
      res.status(400).json({ message: 'Cannot schedule more than 5 classes in a day' });
      return;
    }

    // Create a new class schedule
    const newClassSchedule = new ClassSchedule({
      name,
      date,
      startTime,
      endTime,
      trainer: trainerEmail,
    });

    await newClassSchedule.save();

    res.status(201).json({
      message: 'Class schedule created successfully',
      classSchedule: newClassSchedule,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};