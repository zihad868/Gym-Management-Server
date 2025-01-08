import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Trainee from '../models/Trainee';

export const registerTrainee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee){
      res.status(400).send('Trainee already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrainee = new Trainee({ name, email, password: hashedPassword });
    await newTrainee.save();
    res.status(201).send('Trainee registered successfully');
  } catch (error) {
    res.status(500).send('Error registering trainee');
  }
};

export const loginTrainee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const trainee = await Trainee.findOne({ email });

    if (!trainee){
      res.status(404).send('Trainee not found');
      return;
    }

    const isMatch = await bcrypt.compare(password, trainee.password);
    if (!isMatch){
      res.status(400).send('Invalid credentials');
      return;
    }

    const token = jwt.sign({ email: trainee.email, role: 'trainee' }, process.env.JWT_SECRET as string , { expiresIn: '1h' });
    res.status(200).json({ 
      success: true,
      message: 'Trainee Login successful',
      data: {
        token,
        user: { name: trainee.name, email: trainee.email }
      }
     });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
