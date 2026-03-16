import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// product type is intentionally permissive so that various pages can pass different shapes
// (legacy data uses `id`/`name`, newer code might use `productId`/`productName`).
// We display whichever fields are available.

export type Product = {
  _id?: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  images: string[];
};

interface ProductCardProps {
  p: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ p, onAddToCart }: ProductCardProps) {
  const displayName = p.name || "Untitled";
  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(p);
    }
  };

  return (
    <Card className="relative mx-auto flex w-full max-w-xs flex-col overflow-hidden bg-white pt-0">
      <img
        src={p.images[0] || ""}
        alt={displayName}
        className="relative aspect-video w-full rounded-t-[28px] object-cover"
      />
      <CardHeader className="w-full justify-center pb-2">{displayName}</CardHeader>
      <CardDescription className="px-6 text-black/55">₹{p.price}</CardDescription>
      <CardFooter className="pt-4">
        {onAddToCart ? (
          <CardAction>
            <Button onClick={handleAdd} className="w-full rounded-full bg-color2 px-5 text-white hover:bg-color1">
              Add to cart
            </Button>
          </CardAction>
        ) : (
          <CardAction>
            <Button className="w-full rounded-full bg-color2 px-5 text-white hover:bg-color1">
              <Link href={`/product/${p._id}`}>View Product</Link>
            </Button>
          </CardAction>
        )}
      </CardFooter>
    </Card>
  );
}
