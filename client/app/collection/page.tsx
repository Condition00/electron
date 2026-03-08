"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

function CategoriesContent() {
  const params  = useSearchParams();
  const [cat,    setCat]    = useState(params.get("cat") || "");
  const [search, setSearch] = useState(params.get("q")   || "");
  const [sort,   setSort]   = useState("popular");

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (cat)    list = list.filter(p => p.category === cat);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-low")  return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating")     return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, search, sort]);

  return (
    <div className="container" style={{ padding: "2rem 1.5rem 4rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 900 }}>{cat || "All Products"}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{filtered.length} products</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-muted)", border: "1.5px solid var(--border)", borderRadius: 99, padding: "0.45rem 1rem", minWidth: 260 }}>
          <span style={{ color: "var(--text-light)" }}>🔍</span>
          <input style={{ border: "none", background: "none", outline: "none", fontSize: "0.88rem", color: "var(--text)", width: "100%", fontFamily: "var(--font)" }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.75rem", alignItems: "center" }}>
        <button className={`chip ${cat === "" ? "active" : ""}`} onClick={() => setCat("")}>All</button>
        {CATEGORIES.map(c => (
          <button key={c.name} className={`chip ${cat === c.name ? "active" : ""}`} onClick={() => setCat(cat === c.name ? "" : c.name)}>
            {c.emoji} {c.name}
          </button>
        ))}
        <select style={{ marginLeft: "auto", background: "var(--bg-muted)", border: "1.5px solid var(--border)", borderRadius: 8, padding: "0.45rem 0.85rem", fontSize: "0.85rem", color: "var(--text)", cursor: "pointer", fontFamily: "var(--font)" }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ fontSize: "2.5rem" }}>🔍</p>
          <h3 style={{ fontFamily: "var(--font-heading)" }}>No products found</h3>
          <p style={{ color: "var(--text-muted)" }}>Try a different search or category.</p>
          <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => { setCat(""); setSearch(""); }}>Clear filters</button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}