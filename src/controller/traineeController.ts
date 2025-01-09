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



import ClassSchedule from '../models/ClassSchedule';


export const joinClass = async (req: Request, res: Response): Promise<void> => {
  const { classId } = req.body; // classId from the request body
  const { email } = (req as any).user;  // email extracted from the JWT token

  try {
    // Find the class schedule
    const classSchedule = await ClassSchedule.findById(classId);
    if (!classSchedule) {
      res.status(404).json({ success: false, message: 'Class schedule not found' });
      return;
    }

    // Check if the trainee is already added
    if (classSchedule.trainees.includes(email)) {
      res.status(400).json({ success: false, message: 'Trainee already joined the class' });
      return;
    }

    // Check if the class has room
    if (classSchedule.trainees.length >= 10) {
      res.status(400).json({ success: false, message: 'Class is full' });
      return;
    }

    // Add the trainee to the class
    classSchedule.trainees.push(email);
    await classSchedule.save();

    res.status(200).json({
      success: true,
      message: 'Trainee successfully joined the class',
      classSchedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};
