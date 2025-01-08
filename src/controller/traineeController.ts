import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Trainee from '../models/Trainee';

export const registerTrainee = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) return res.status(400).send('Trainee already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrainee = new Trainee({ name, email, password: hashedPassword });
    await newTrainee.save();
    res.status(201).send('Trainee registered successfully');
  } catch (error) {
    res.status(500).send('Error registering trainee');
  }
};

export const loginTrainee = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const trainee = await Trainee.findOne({ email });
    if (!trainee) return res.status(404).send('Trainee not found');

    const isMatch = await bcrypt.compare(password, trainee.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: trainee._id, role: 'trainee' }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
