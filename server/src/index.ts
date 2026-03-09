import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import collectionsRouter from './routes/collections';
import productsRouter from './routes/products';

const app = express();
const mongoDBURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/electron-store';
const PORT = process.env.PORT || 3000;

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
      productsByCategory: '/api/products/category/:category',
      productById: '/api/products/:id'
    }
  });
});

app.use('/api/collections', collectionsRouter);
app.use('/api/products', productsRouter);

// Connect to MongoDB and start server
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("✓ MongoDB database connection established successfully");
    app.listen(PORT, () => {
      console.log(`✓ Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("✗ MongoDB connection error:", err));
