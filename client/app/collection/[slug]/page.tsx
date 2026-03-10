import ProductCard from "@/components/ProductCard";

type Product = {
    id: string,
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
}

async function getProductByCategory(c : string): Promise<Product[]> {
    const res = await fetch(`http://localhost:5000/api/products/category/${c}`, {
        cache: "no-store"
    });

    if(!res.ok) {
        throw new Error("Failed to fetch products by their category!");
    }

    return res.json();
}

export default async function page({
    params,
} : {
    params: Promise<{slug : string}>
}) {
    const { slug } = (await params);
    const products = await getProductByCategory(slug);
    
    // [{
    //     productId: 123,
    //     productName: 'Samsung Galaxy Book',
    //     category: 'Laptop',
    //     price: 129000
    // },
    // {
    //     productId: 124,
    //     productName: 'HP Victus 15',
    //     category: 'Laptop',
    //     price: 69000
    // },]

    return(
        <div>
        <div className="flex items-center justify-around min-h-[40vh] font-opensans font-black text-8xl text-white bg-black">
            {slug.toUpperCase()}
        </div>
        <div className="flex items-center justify-evenly gap-20 max-w=[100vw] flex-wrap px-4 py-10">
            {products.map(p => 
                <ProductCard key={p.id} p={p}/>
            )}
        </div>
        </div>
    );
}