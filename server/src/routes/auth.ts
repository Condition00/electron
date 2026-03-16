import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest, requireAuth } from '../middleware/auth';

const router = Router();

const getJwtSecret = (): string => {
  return process.env.JWT_SECRET || 'dev-jwt-secret-change-me';
};

const signToken = (userId: string, email: string): string => {
  return jwt.sign({ email }, getJwtSecret(), {
    subject: userId,
    expiresIn: '7d',
  });
};

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, country, dateOfBirth } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({ message: 'fullName, email and password are required' });
      return;
    }

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      res.status(409).json({ message: 'Email is already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: String(email).toLowerCase(),
      password: hashedPassword,
      country,
      dateOfBirth,
      address: [],
    });

    const token = signToken(String(user._id), user.email);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'email and password are required' });
      return;
    }

    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = signToken(String(user._id), user.email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

router.get('/profile', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

router.post('/addresses', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const rawAddress = String(req.body?.address ?? '').trim();

    if (!rawAddress) {
      res.status(400).json({ message: 'address is required' });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const alreadyExists = user.address.some((addr) => addr.toLowerCase() === rawAddress.toLowerCase());
    if (alreadyExists) {
      res.status(409).json({ message: 'Address already exists' });
      return;
    }

    user.address.push(rawAddress);
    await user.save();

    res.status(201).json({
      message: 'Address added successfully',
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
});

router.delete('/addresses/:index', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const index = Number(req.params.index);
    if (!Number.isInteger(index)) {
      res.status(400).json({ message: 'Invalid address index' });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (index < 0 || index >= user.address.length) {
      res.status(404).json({ message: 'Address not found' });
      return;
    }

    user.address.splice(index, 1);
    await user.save();

    res.json({
      message: 'Address removed successfully',
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error removing address', error });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
});

export default router;
