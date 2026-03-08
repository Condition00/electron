import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-around min-h-screen bg-color1">
        <div className="font-poppins text-white">
          <div className="text-8xl font-black">ELECTRON</div>
          <div className="text-sm font-extralight text-right">Plug into the future</div>
        </div>
        <div className="flex flex-col justify-around gap-1">
          <div>
            <Image
              src="/heroimage1.png"
              width={505}
              height={250}
              alt="Hero Image 1"
            />
          </div>
          <div className="flex flex-row justify-around gap-1">
            <Image
              src="/heroimage2.png"
              width={250}
              height={250}
              alt="Hero Image 2"
            />
            <Image
              src="/heroimage3.png"
              width={250}
              height={250}
              alt="Hero Image 3"
            />
          </div>
        </div>
      </div>
      {/* # Our Philosophy */}
      <div className="flex items-center justify-around min-h-screen bg-color4">
        <div className="flex flex-col justify-around min-h-fit gap-5 font-poppins text-black">
          <div className="text-4xl font-bold">
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
      <div className="flex items-center justify-around min-h-screen bg-color5">
        {/* We will use component: HeroPageCategoryCard to render all our categories 
        I am adding dummy cards here rn*/}
      </div>
      {/* # Footer
      note from Vishesh: soon to be converted to a component: Footer */}
      <div className="flex items-center justify-around min-h-screen bg-color3"></div>
    </>
  );
}
