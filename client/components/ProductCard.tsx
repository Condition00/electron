import Link from "next/link";
import { fmt } from "@/lib/format";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// product type is intentionally permissive so that various pages can pass different shapes
// (legacy data uses `id`/`name`, newer code might use `productId`/`productName`).
// We display whichever fields are available.

export type Product = {
  _id?: string,
  name: string,
  description?: string,
  category: string,
  price: number,
  images: string[],
};

interface ProductCardProps {
  p: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ p, onAddToCart }: ProductCardProps) {
  const displayName = p.name || 'Untitled';
  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(p);
    }
  };

  return (
    <Card className="relative flex flex-col items-center mx-auto w-full max-w-xs pt-0">
      {/* placeholder image if none is provided */}
      <img
        src={p.images[0] || ""}
        alt={displayName}
        className="relative rounded-t-xl aspect-video w-full object-cover brightness-90"
      />
      <CardHeader className="justify-center w-full">
        {displayName}
      </CardHeader>
      <CardDescription>
        ₹{p.price}
      </CardDescription>
      <CardFooter>
        {onAddToCart ? (
          <CardAction>
            <Button onClick={handleAdd} className="w-full">
              Add to cart
            </Button>
          </CardAction>
        ) : (
          <CardAction>
            <Button className="w-full">
              <Link href={`/product/${p._id}`}>View Product</Link>
            </Button>
          </CardAction>
        )}
      </CardFooter>
    </Card>
  );
}
