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

type Product = {
  productId: number;
  productName: string;
  price: number;
  category: string;
};

export default function ProductCard({ p }: { p: Product }) {
  // const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;
  return (
    <Card className="relative flex items-center mx-auto w-full max-w-xs pt-0">
      {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35"/> */}
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative rounded-t-xl aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader className="justify-center w-full">
        {p.productName}
      </CardHeader>
      <CardDescription>
        {p.price} INR
      </CardDescription>
      <CardFooter>
        <CardAction>
          <Button className="w-full">View Product</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
