import { PRODUCTS } from "@/lib/data";
import { fmt } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

const deals = PRODUCTS.filter(p => p.deal && p.emoji).sort((a, b) => (1 - b.price / b.originalPrice!) - (1 - a.price / a.originalPrice!)).map(p => ({ ...p, reviews: [] }));
const maxDiscount = Math.round((1 - Math.min(...deals.map(p => p.price / p.originalPrice!))) * 100);
const minSaving   = Math.min(...deals.map(p => p.originalPrice! - p.price));

export default function DealsPage() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#fff7ed 0%,#fef2f2 60%,#f8f9fc 100%)", padding: "3rem 0 2.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <span style={{ display: "inline-block", background: "#fef2f2", color: "var(--red)", fontWeight: 700, fontSize: "0.78rem", padding: "0.3rem 0.9rem", borderRadius: 99, marginBottom: "0.75rem", border: "1px solid #fecaca", textTransform: "uppercase", letterSpacing: "0.06em" }}>Limited-time offers</span>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>🔥 Today's Best Deals</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: 440, lineHeight: 1.7 }}>
              {deals.length} products on sale right now. Prices can change — grab yours before it's gone.
            </p>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[{ label: "Products on sale", value: deals.length }, { label: "Max discount", value: `${maxDiscount}%` }, { label: "Min. saving", value: `₹${fmt(minSaving)}` }].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.8rem", color: "var(--red)" }}>{stat.value}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem 4rem" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.5rem" }}>All Deals — Biggest Discount First</h2>
        <div className="products-grid">
          {deals.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}