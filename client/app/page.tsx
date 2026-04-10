import Image from "next/image";
import { HeroCollectionCard, Collection } from "@/components/CollectionCard";
import { API_BASE_URL } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";

async function getCollections(): Promise<Collection[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/collections`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch all collections!");
  }

  return res.json();
}

export default async function Home() {
  const collections = await getCollections();
  return (
    <>
      <section className="relative overflow-hidden min-h-screen bg-color1 px-5 pb-12 pt-24 md:px-10 md:pt-28 lg:px-16 lg:pt-30">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-color3/30 blur-3xl" />
        <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-color4/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.02fr] lg:gap-10">
          <div className="font-poppins text-white lg:pr-3">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 px-3.5 py-1 text-[11px] tracking-[0.18em] text-white/80">
              NEW ARRIVALS · PREMIUM TECH
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              ELECTRON
            </h1>

            <p className="mt-2.5 text-sm font-light text-white/70 md:text-base">
              Plug into the future
            </p>

            <p className="mt-6 max-w-lg text-sm leading-6 text-white/75 md:text-base md:leading-7">
              Discover high-performance electronics with a clean shopping
              experience. Fast search, curated categories, and products that
              match your exact vibe.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5 md:gap-3">
              <a
                href="/collection/all"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-color1"
              >
                Shop Now
              </a>
              <a
                href="/deals"
                className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                View Deals
              </a>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-155 grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/heroimage1.png"
                width={505}
                height={250}
                alt="Hero Image 1"
                className="h-42 w-full object-cover md:h-52 lg:h-60"
                priority
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/heroimage2.png"
                width={250}
                height={250}
                alt="Hero Image 2"
                className="h-36 w-full object-cover md:h-46 lg:h-52"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/heroimage3.png"
                width={250}
                height={250}
                alt="Hero Image 3"
                className="h-36 w-full object-cover md:h-46 lg:h-52"
              />
            </div>
          </div>
        </div>
      </section>
      {/* # Our Philosophy */}
      <div className="flex items-center justify-around min-h-screen bg-color4">
        <div className="flex flex-col justify-around min-h-fit max-w-4/5 gap-5 font-poppins text-black">
          <div className="text-3xl md:text-4xl font-bold">Our Philosophy</div>
          <div className="text-md font-light">
            Technology should be easy to find, not hard to discover.
            <br />
            At Electron, we believe searching for tech should feel as precise as
            writing a query.
            <br />
            Because when you know what you want, you shouldn't have to scroll
            through thousands of products to find it.
            <br />
            Just query it.
          </div>
        </div>
      </div>
      {/* # Shop All Categories */}
      <div className="flex flex-col items-center justify-evenly min-h-screen bg-color5">
        <h2 className="font-inter font-bold text-3xl md:text-4xl">
          Shop All Categories
        </h2>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-30/31 flex items-center justify-evenly"
        >
          <CarouselContent className="flex items-center w-full">
            {collections.map((c) => (
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
