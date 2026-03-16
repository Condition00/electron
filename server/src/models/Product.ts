import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  badge?: string;
  deal?: boolean;
  images: string[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  rating: { type: Number, min: 0, max: 5, default: 4.5 },
  badge: { type: String },
  deal: { type: Boolean, default: false },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
