import { Response, Router } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order';
import Product from '../models/Product';
import { AuthRequest, requireAuth } from '../middleware/auth';

const router = Router();

router.get('/mine', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { items } = req.body as {
      items?: Array<{ productId: string; quantity: number }>;
    };

    if (!items || items.length === 0) {
      res.status(400).json({ message: 'At least one cart item is required' });
      return;
    }

    const invalidItem = items.find(
      (item) =>
        !item?.productId ||
        !mongoose.Types.ObjectId.isValid(item.productId) ||
        typeof item.quantity !== 'number' ||
        item.quantity < 1
    );

    if (invalidItem) {
      res.status(400).json({ message: 'Invalid cart items payload' });
      return;
    }

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productsById = new Map(products.map((p) => [String(p._id), p]));

    const orderItems = items.map((item) => {
      const product = productsById.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const image = product.images[0];

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        ...(image ? { image } : {}),
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    const order = await Order.create({
      userId: req.user.userId,
      items: orderItems,
      subtotal,
      shipping,
      tax,
      total,
      status: 'placed',
    });

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Product not found:')) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: 'Error creating order', error });
  }
});

export default router;
