import Image from "next/image";
import { HeroCollectionCard, Collection } from "@/components/CollectionCard";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselItem } from "@/components/ui/carousel";

async function getCollections(): Promise<Collection[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collections`, {
    cache: "no-store"
  });

  if(!res.ok) {
    throw new Error("Failed to fetch all collections!")
  }

  return res.json()
}

export default async function Home() {
  const collections = await getCollections();
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-around min-h-screen bg-color1">
        <div className="font-poppins text-white">
          <div className="text-4xl lg:text-8xl font-black">ELECTRON</div>
          <div className="text-xs md:text-sm font-extralight text-right">Plug into the future</div>
        </div>
        <div className="flex flex-col justify-around gap-1">
          <div>
            <Image
              src="/heroimage1.png"
              width={505}
              height={250}
              alt="Hero Image 1"
              className="lg:w-[505px] lg:h-[250px] w-[304px] h-[150px]"
            />
          </div>
          <div className="flex flex-row justify-around gap-1">
            <Image
              src="/heroimage2.png"
              width={250}
              height={250}
              alt="Hero Image 2"
              className="lg:w-[250px] lg:h-[250px] w-[150px] h-[150px]"
              />
            <Image
              src="/heroimage3.png"
              width={250}
              height={250}
              alt="Hero Image 3"
              className="lg:w-[250px] lg:h-[250px] w-[150px] h-[150px]"
            />
          </div>
        </div>
      </div>
      {/* # Our Philosophy */}
      <div className="flex items-center justify-around min-h-screen bg-color4">
        <div className="flex flex-col justify-around min-h-fit max-w-4/5 gap-5 font-poppins text-black">
          <div className="text-3xl md:text-4xl font-bold">
            Our Philosophy
          </div>
          <div className="text-md font-light">
            Technology should be easy to find, not hard to discover.<br/>
            At Electron, we believe searching for tech should feel as precise as writing a query.<br/>
            Because when you know what you want, you shouldn't have to scroll through thousands of products to find it.<br/>
            Just query it.
          </div>
        </div>
      </div>
      {/* # Shop All Categories */}
      <div className="flex flex-col items-center justify-evenly min-h-screen bg-color5">
        <h2 className="font-inter font-bold text-3xl md:text-4xl">Shop All Categories</h2>

        <Carousel 
          opts={{
          align: "center",
          loop: true,
          }}
          
          className="w-30/31 flex items-center justify-evenly">
          <CarouselContent className="flex items-center w-full">
            {collections.map(c => (
              <CarouselItem key={c._id} className="lg:basis-1/3 pl-17">
                <HeroCollectionCard key={c._id} c={c}></HeroCollectionCard>
              </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
      </div>
      {/* # Footer
      note from Vishesh: soon to be converted to a component: Footer */}
      <div className="flex items-center justify-around min-h-screen bg-color3"></div>
    </>
  );
}
