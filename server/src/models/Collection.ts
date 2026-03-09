import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  title: string;
  description: string;
  image: string;
  createdAt: Date;
}

const CollectionSchema = new Schema<ICollection>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICollection>('Collection', CollectionSchema);
