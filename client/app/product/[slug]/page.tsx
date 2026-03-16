"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { API_BASE_URL, type ApiProduct } from "@/lib/api";
import { useCart } from "@/lib/CartContext";

export default function ProductPage() {
    const params = useParams<{ slug: string }>();
    const router = useRouter();
    const { addItem } = useCart();

    const [product, setProduct] = useState<ApiProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${API_BASE_URL}/api/products/${params.slug}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await res.json();
                setProduct(data as ApiProduct);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unexpected error");
            } finally {
                setLoading(false);
            }
        };

        if (params?.slug) {
            loadProduct();
        }
    }, [params?.slug]);

    const handleAddToCart = () => {
        if (!product) return;
        addItem(product, 1);
    };

    const handleBuyNow = () => {
        if (!product) return;
        addItem(product, 1);
        router.push('/cart');
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-color3 text-white">Loading product...</div>;
    }

    if (error || !product) {
        return <div className="flex min-h-screen items-center justify-center bg-color3 text-white">{error || 'Product not found'}</div>;
    }

    return (
        <div className="flex min-h-screen bg-color3 pt-20 px-8">
            <Carousel className="w-full max-w-[16rem] sm:max-w-md">
                <CarouselContent className="flex aspect-square items-center justify-center p-6">
                    {product.images.map((im, i) => (
                        <CarouselItem key={i}>
                            <img src={im} alt={`${product.name}-${i + 1}`} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex flex-col item-start font-poppins text-white p-8">
                <h2 className="font-black text-4xl">{product.name}</h2>
                <p className="font-light text-md text-zinc-100 py-6">{product.description}</p>
                <p className="text-md text-zinc-200 py-8">{product.price} INR</p>
                <div className="flex flex-row gap-6 w-full pt-10">
                    <Button
                        variant="outline"
                        onClick={handleAddToCart}
                        className="w-1/2 h-10 text-black hover:bg-color2 hover:text-white"
                    >
                        Add to Cart
                    </Button>
                    <Button onClick={handleBuyNow} className="w-1/2 h-10">Buy Now</Button>
                </div>
            </div>
        </div>
    );
}