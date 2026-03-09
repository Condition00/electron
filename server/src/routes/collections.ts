import { Router, Request, Response } from 'express';
import Collection from '../models/Collection';
import { upload } from '../middleware/upload';
import { cropToSquare } from '../utils/imageProcessor';
import path from 'path';

const router = Router();

// Get all collections
router.get('/', async (_req: Request, res: Response) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections', error });
  }
});

// Get single collection
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      res.status(404).json({ message: 'Collection not found' });
      return;
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collection', error });
  }
});

// Create collection
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Image is required' });
      return;
    }

    // Process and crop image to square
    const processedPath = await cropToSquare(req.file.path);
    const imagePath = `/uploads/processed/${path.basename(processedPath)}`;

    const collection = new Collection({
      title: req.body.title,
      description: req.body.description,
      image: imagePath
    });

    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection', error });
  }
});

// Update collection
router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const updateData: any = {
      title: req.body.title,
      description: req.body.description
    };

    if (req.file) {
      const processedPath = await cropToSquare(req.file.path);
      updateData.image = `/uploads/processed/${path.basename(processedPath)}`;
    }

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!collection) {
      res.status(404).json({ message: 'Collection not found' });
      return;
    }

    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Error updating collection', error });
  }
});

// Delete collection
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) {
      res.status(404).json({ message: 'Collection not found' });
      return;
    }
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting collection', error });
  }
});

export default router;
