import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export type AuthUser = {
  userId: string;
  email: string;
};

export interface AuthRequest extends Request {
  user?: AuthUser;
}

const getJwtSecret = (): string => {
  return process.env.JWT_SECRET || 'dev-jwt-secret-change-me';
};

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization token is required' });
    return;
  }

  const token = authHeader.slice(7).trim();

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    const userId = typeof decoded.sub === 'string' ? decoded.sub : '';
    const email = typeof decoded.email === 'string' ? decoded.email : '';

    if (!userId || !email) {
      res.status(401).json({ message: 'Invalid authorization token' });
      return;
    }

    req.user = { userId, email };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired authorization token' });
  }
};
