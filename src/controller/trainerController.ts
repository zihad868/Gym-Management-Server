import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Trainer from '../models/Trainer';

export const registerTrainer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, expertise } = req.body;
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) return res.status(400).send('Trainer already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrainer = new Trainer({ name, email, password: hashedPassword, expertise });
    await newTrainer.save();
    res.status(201).send('Trainer registered successfully');
  } catch (error) {
    res.status(500).send('Error registering trainer');
  }
};

export const loginTrainer = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const trainer = await Trainer.findOne({ email });
    if (!trainer) return res.status(404).send('Trainer not found');

    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: trainer._id, role: 'trainer' }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
