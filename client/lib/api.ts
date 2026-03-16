export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

export type ApiProduct = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  badge?: string;
  deal?: boolean;
  images: string[];
};

export type ApiCategory = {
  name: string;
};

export type ApiCollection = {
  _id: string;
  title: string;
  description: string;
  image?: string;
};

export type ApiUserProfile = {
  _id: string;
  fullName: string;
  email: string;
  country?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string[];
  createdAt: string;
};

export type ApiOrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type ApiOrder = {
  _id: string;
  userId: string;
  items: ApiOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'placed' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
};
