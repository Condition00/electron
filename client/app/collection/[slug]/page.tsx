import ProductCard from "@/components/ProductCard";

export default async function page({
    params,
} : {
    params: Promise<{slug : string}>
}) {
    const { slug } = await params
    const products = [{
        productId: 123,
        productName: 'Samsung Galaxy Book',
        category: 'Laptop',
        price: 129000
    },
    {
        productId: 124,
        productName: 'HP Victus 15',
        category: 'Laptop',
        price: 69000
    },]

    return(
        <div>
        <div className="flex items-center justify-around min-h-[40vh] font-opensans font-black text-8xl text-white bg-black">
            {slug.toUpperCase()}
        </div>
        <div className="flex items-center justify-evenly gap-20 max-w=[100vw] flex-wrap px-4 py-10">
            {products.map(p => 
                <ProductCard key={p.productId} p={p}/>
            )}
        </div>
        </div>
    );
}