import { useState } from "react";

export interface CartItem {
  id: number;
  name?: string; // optional since some product shapes use `productName` or may omit
  price: number;
  quantity: number;
  image?: string;
}

interface CartProps {
  cartItems: CartItem[];
  total: number;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onContinueShopping: () => void;
}

export default function Cart({
  cartItems,
  total,
  onRemove,
  onUpdateQuantity,
  onContinueShopping,
}: CartProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">
                    {item.name || 'Unnamed product'}
                  </p>
                  <p className="text-sm text-slate-600">
                    ₹{item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 rounded bg-gray-200"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 rounded bg-gray-200"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold">
            Total: ₹{total.toFixed(2)}
          </div>
        </div>
      )}
      <button
        onClick={onContinueShopping}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Continue shopping
      </button>
    </div>
  );
}
