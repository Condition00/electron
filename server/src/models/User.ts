import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  country?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  country: { type: String },
  dateOfBirth: { type: String },
  phoneNumber: { type: String },
  address: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
