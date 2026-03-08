import Link from "next/link";
import { fmt } from "@/lib/format";

type Product = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  badge: string;
  category: string;
  rating: number;
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="card" style={{ padding: "1.2rem", textAlign: "center" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{p.emoji}</div>
      <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "var(--accent)", color: "#fff", borderRadius: 99, padding: "0.2rem 0.6rem" }}>
        {p.badge}
      </span>
      <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.92rem", margin: "0.5rem 0 0.25rem" }}>
        {p.name}
      </h4>
      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{p.category}</p>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.05rem", color: "var(--accent)", marginBottom: "0.25rem" }}>
        ₹{fmt(p.price)}
      </p>
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>⭐ {p.rating}</p>
      <Link href="/categories" className="btn-outline" style={{ fontSize: "0.82rem", padding: "0.4rem 0.9rem" }}>
        View Product
      </Link>
    </div>
  );
}
