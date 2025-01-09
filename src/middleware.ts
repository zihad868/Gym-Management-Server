import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string; role: string };
    (req as any).user = decoded; // Use `any` to set the user property
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid or expired token', error });
  }
};
