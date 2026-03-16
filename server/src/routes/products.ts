import { Router, Request, Response } from 'express';
import Product from '../models/Product';
import { upload } from '../middleware/upload';
import { cropToSquare } from '../utils/imageProcessor';
import path from 'path';

const router = Router();

// Get all products (with optional category filter)
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      category,
      q,
      sort = 'latest',
      deals,
    } = req.query;

    const filter: Record<string, unknown> = {};

    if (category && typeof category === 'string') {
      filter.category = { $regex: `^${category}$`, $options: 'i' };
    }

    if (q && typeof q === 'string') {
      filter.name = { $regex: q, $options: 'i' };
    }

    if (deals === 'true') {
      filter.$or = [
        { deal: true },
        {
          $expr: {
            $gt: ['$originalPrice', '$price']
          }
        }
      ];
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      latest: { createdAt: -1 },
      'price-low': { price: 1 },
      'price-high': { price: -1 },
      rating: { rating: -1, createdAt: -1 },
    };

    const mongoSort = sortMap[String(sort)] ?? sortMap.latest;

    const products = await Product.find(filter).sort(mongoSort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Get all product categories (distinct)
router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await Product.distinct('category');
    const normalized = categories
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ name }));

    res.json(normalized);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// Get products currently on deal
router.get('/deals', async (_req: Request, res: Response) => {
  try {
    const deals = await Product.find({
      $or: [
        { deal: true },
        {
          $expr: {
            $gt: ['$originalPrice', '$price']
          }
        }
      ]
    }).sort({ createdAt: -1 });

    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error });
  }
});

// Get products by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const category = decodeURIComponent(req.params.category as string).trim();
    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: 'i' }
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Get single product by ID with images
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// Create product with multiple images
router.post('/', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    // if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    //   res.status(400).json({ message: 'At least one image is required' });
    //   return;
    // }

    // // Process and crop all images to square
    // const files = req.files as Express.Multer.File[];
    // const imagePaths = await Promise.all(
    //   files.map(async (file) => {
    //     const processedPath = await cropToSquare(file.path);
    //     return `/uploads/processed/${path.basename(processedPath)}`;
    //   })
    // );

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price),
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : undefined,
      rating: req.body.rating ? parseFloat(req.body.rating) : undefined,
      badge: req.body.badge,
      deal: req.body.deal === 'true' || req.body.deal === true,
      images: req.body.images
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

// Update product
router.put('/:id', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const updateData: any = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price),
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : undefined,
      rating: req.body.rating ? parseFloat(req.body.rating) : undefined,
      badge: req.body.badge,
      deal: req.body.deal === 'true' || req.body.deal === true,
    };

    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const files = req.files as Express.Multer.File[];
      const imagePaths = await Promise.all(
        files.map(async (file) => {
          const processedPath = await cropToSquare(file.path);
          return `/uploads/processed/${path.basename(processedPath)}`;
        })
      );
      updateData.images = imagePaths;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

export default router;
