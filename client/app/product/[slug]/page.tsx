import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
};

async function getProduct(id: string) : Promise<Product> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        cache: "no-store"
    });

    if(!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json();
}

export default async function page({params,} : {
    params : Promise<{slug : string}>
}) {
    const slug = (await params).slug;
    const p = await getProduct(slug);
    
    // {
    //     productId: 123,
    //     productName: 'Samsung Galaxy Book',
    //     productDescription: 'blah blah blah blah blah....',
    //     price: 129000,
    // }

    return(
        <div className="flex min-h-screen bg-color3 pt-20 px-8">
            <Carousel className="w-full max-w-[16rem] sm:max-w-md">
                <CarouselContent className="flex aspect-square items-center justify-center p-6">
                    {p.images.map((im, i) => 
                        <CarouselItem key={i}>
                            <img
                            src={im}
                            />
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            <div className="flex flex-col item-start font-poppins text-white p-8">
                <h2 className="font-black text-4xl">{p.name}</h2>
                <p className="font-light text-md text-zinc-100 py-6">{p.description}</p>
                <p className="text-md text-zinc-200 py-8">{p.price} INR</p>
                <div className="flex flex-row gap-6 w-full pt-10">
                <Button variant="outline" className="w-1/2 h-10 text-black hover:bg-color2 hover:text-white">Add to Card</Button>
                <Button className="w-1/2 h-10">Buy Now</Button>
                </div>
            </div>
        </div>
    );
}