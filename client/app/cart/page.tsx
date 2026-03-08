"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  id: string;
  emoji: string;
  category: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  qty: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CHANGE_QTY'; payload: { id: string; delta: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Implement add logic (e.g., increment qty if exists)
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'CHANGE_QTY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: Math.max(0, item.qty + action.payload.delta) }
            : item
        ).filter(item => item.qty > 0),
      };
    case 'CLEAR_CART':
      return { cart: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  total: number;
  count: number;
  clearCart: () => void;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, qty: 1 } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const changeQty = (id: string, delta: number) => {
    dispatch({ type: 'CHANGE_QTY', payload: { id, delta } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, changeQty, total, count, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};