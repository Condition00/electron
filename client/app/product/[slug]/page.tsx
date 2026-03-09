import { Button } from "@/components/ui/button";

export default async function page({params,} : {
    params : Promise<{slug : string}>
}) {
    const slug = await params
    const p = {
        productId: 123,
        productName: 'Samsung Galaxy Book',
        productDescription: 'blah blah blah blah blah....',
        price: 129000,
    }
    return(
        <div className="flex min-h-screen bg-color3 pt-20 px-8">
            <img
            src='/heroimage1.png'
            className="max-h-96"
            />
            <div className="flex flex-col item-start font-poppins text-white p-8">
                <h2 className="font-black text-4xl">{p.productName}</h2>
                <p className="font-light text-md text-zinc-100 py-6">{p.productDescription}</p>
                <p className="text-md text-zinc-200 py-8">{p.price} INR</p>
                <div className="flex flex-row gap-6 w-full pt-10">
                <Button variant="outline" className="w-1/2 h-10 text-black hover:bg-color2 hover:text-white">Add to Card</Button>
                <Button className="w-1/2 h-10">Buy Now</Button>
                </div>
            </div>
        </div>
    );
}