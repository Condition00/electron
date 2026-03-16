import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import collectionsRouter from './routes/collections';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import ordersRouter from './routes/orders';

const app = express();
const rawMongoDbUri = process.env.MONGODB_URI ?? process.env.FULL_MONGOURI;
const PORT = process.env.PORT || 5000;

const normalizeMongoUri = (value?: string): string => {
  if (!value) return '';

  return value
    .trim()
    .replace(/^['"]+|['"]+$/g, '');
};

const mongoDBURL = normalizeMongoUri(rawMongoDbUri);

if (!mongoDBURL) {
  console.error("✗ Missing MongoDB connection string. Set MONGODB_URI in .env (or FULL_MONGOURI for legacy config)");
  process.exit(1);
}

if (!mongoDBURL.startsWith('mongodb://') && !mongoDBURL.startsWith('mongodb+srv://')) {
  console.error('✗ Invalid MongoDB URI format. It must start with "mongodb://" or "mongodb+srv://".');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'ElectroHub API',
    endpoints: {
      collections: '/api/collections',
      products: '/api/products',
      productDeals: '/api/products/deals',
      productCategories: '/api/products/categories',
      productsByCategory: '/api/products/category/:category',
      productById: '/api/products/:id',
      orders: '/api/orders',
      myOrders: '/api/orders/mine',
      signup: '/api/auth/signup',
      login: '/api/auth/login',
      profile: '/api/auth/profile (Authorization: Bearer <token>)',
    }
  });
});

app.use('/api/collections', collectionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// Connect to MongoDB and start server
mongoose.connect(mongoDBURL || "")
  .then(() => {
    console.log("✓ MongoDB database connection established successfully");
    app.listen(PORT, () => {
      console.log(`✓ Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("✗ MongoDB connection error:", err));
