import { Request, Response, Router } from 'express';
import User from '../models/User';

const router = Router();

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

    const user = await User.create({
      fullName,
      email: String(email).toLowerCase(),
      password,
      country,
      dateOfBirth,
      address: [],
    });

    res.status(201).json({
      message: 'Account created successfully',
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
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    res.json({
      message: 'Login successful',
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

router.get('/profile', async (req: Request, res: Response) => {
  try {
    const email = String(req.query.email ?? '').trim().toLowerCase();
    if (!email) {
      res.status(400).json({ message: 'email query parameter is required' });
      return;
    }

    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

export default router;
