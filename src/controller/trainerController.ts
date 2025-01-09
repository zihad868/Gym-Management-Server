import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Trainer from '../models/Trainer';
import ClassSchedule from '../models/ClassSchedule';

export const registerTrainer = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { name, email, password, expertise } = req.body;
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer){
      res.status(400).send('Trainer already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrainer = new Trainer({ name, email, password: hashedPassword, expertise });
    await newTrainer.save();
    res.status(201).send('Trainer registered successfully');
  } catch (error) {
    res.status(500).send('Error registering trainer');
  }
};

export const loginTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const trainer = await Trainer.findOne({ email });

    if (!trainer){
      res.status(404).send('Trainer not found');
      return;
    }

    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch){
      res.status(400).send('Invalid credentials');
      return;
    }

    const token = jwt.sign({ email: trainer.email, role: 'trainer' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ 
      success: true,
      message: 'Trainer Login successful',
      data: {
        token,
        user: { name: trainer.name, email: trainer.email }
      }
     });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};



export const viewTrainerSchedules = async (req: Request, res: Response): Promise<void> => {
  const { email } = (req as any).user; // Extract email from the authenticated token

  try {
    const schedules = await ClassSchedule.find({ trainer: email });

    res.status(200).json({
      success: true,
      message: 'Trainer schedules retrieved successfully',
      schedules,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving trainer schedules', error });
  }
};