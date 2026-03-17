import { API_BASE_URL, type ApiProduct } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

async function searchProducts(q: string): Promise<ApiProduct[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/products?q=${encodeURIComponent(q)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = query ? await searchProducts(query) : [];

  return (
    <div className="min-h-screen bg-color5">
      <div className="bg-color2 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-color6 text-sm font-opensans mb-1">
            {products.length} result{products.length !== 1 ? "s" : ""} found
          </p>
          <h1 className="text-white font-poppins font-bold text-2xl md:text-4xl">
            {query ? (
              <>
                Results for{" "}
                <span className="text-color6">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Search Products"
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {!query ? (
          <div className="flex flex-col items-center justify-center py-24 text-color3">
            <Search size={48} className="mb-4 opacity-40" />
            <p className="font-opensans text-lg">
              Enter a search term to find products
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-color3">
            <Search size={48} className="mb-4 opacity-40" />
            <p className="font-poppins font-semibold text-xl mb-2">
              No products found
            </p>
            <p className="font-opensans text-sm">
              Try different keywords or browse our{" "}
              <a href="/collection/all" className="underline hover:text-color1">
                collections
              </a>
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-start justify-evenly gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
