"use client";

import { useState } from "react";
import Link from "next/link";
import { fmt } from "@/lib/format";

export const PRODUCTS = [
  { id: 1, name: "Product 1", price: 9999, emoji: "📱", badge: "Top Rated" },
  { id: 2, name: "Product 2", price: 19999, emoji: "💻", badge: "Best Seller" },
  { id: 3, name: "Product 3", price: 29999, emoji: "🎧", badge: "Top Rated" },
  { id: 4, name: "Product 4", price: 39999, emoji: "⌚", badge: "Best Seller" },
  { id: 5, name: "Product 5", price: 49999, emoji: "📷", badge: "Top Rated" },
  { id: 6, name: "Product 6", price: 59999, emoji: "🎮", badge: "Best Seller" },
];

const ORDERS = [
  { id: "#EL-10821", date: "Feb 28, 2025", items: "Sony WH-1000XM5, USB-C Hub", total: 28498,  status: "Delivered"  },
  { id: "#EL-10765", date: "Feb 10, 2025", items: "MacBook Air M3",             total: 114900, status: "Delivered"  },
  { id: "#EL-10612", date: "Jan 15, 2025", items: "iPhone 15 Pro",              total: 129900, status: "Processing" },
  { id: "#EL-10401", date: "Dec 22, 2024", items: "PS5 Slim, Extra Controller", total: 57990,  status: "Delivered"  },
];

const STATUS_COLOR: Record<string, string> = {
  Delivered: "var(--green)", Processing: "var(--orange)", Cancelled: "var(--red)",
};

const wishlist = PRODUCTS.filter(p => p.badge === "Top Rated" || p.badge === "Best Seller").slice(0, 6);
const TABS = ["Profile", "Orders", "Wishlist", "Settings"];
const NOTIF_KEYS = ["Email notifications", "Deal alerts & promotions", "Order status updates", "Weekly newsletter", "New arrivals alerts"];

export default function AccountPage() {
  const [tab, setTab] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Arjun Sharma", email: "arjun@college.edu", phone: "+91 98765 43210", college: "IIT Bombay", address: "", city: "", pin: "", state: "" });
  const [notifs, setNotifs] = useState<Record<string, boolean>>(Object.fromEntries(NOTIF_KEYS.map(k => [k, true])));

  function handleChange(field: string, value: string) { setSaved(false); setProfile(prev => ({ ...prev, [field]: value })); }
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 3000); }

  return (
    <div className="container" style={{ padding: "2rem 1.5rem 4rem" }}>

      {/* Banner */}
      <div className="card" style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: "1.8rem", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-heading)" }}>
          {profile.name.charAt(0)}
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.4rem", margin: 0 }}>{profile.name}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "2px 0" }}>{profile.email}</p>
          <p style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>Member since January 2024</p>
        </div>
        <span style={{ marginLeft: "auto", background: "#f0fdf4", color: "var(--green)", border: "1px solid #bbf7d0", fontSize: "0.8rem", fontWeight: 700, padding: "0.3rem 0.9rem", borderRadius: 99 }}>🎓 Student Verified</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "2px solid var(--border)", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", padding: "0.6rem 1.1rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent", color: tab === t ? "var(--accent)" : "var(--text-muted)", marginBottom: -2, transition: "all 0.15s" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "Profile" && (
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", marginBottom: "1.25rem" }}>Personal Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.1rem" }}>
            {[["Full Name", "name", "text", "Your full name"], ["Email Address", "email", "email", "your@email.com"], ["Phone Number", "phone", "tel", "+91 XXXXX XXXXX"], ["College / Institution", "college", "text", "Your college name"]].map(([label, field, type, placeholder]) => (
              <div key={field}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
                <input style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: "0.9rem", color: "var(--text)", background: "#fff", outline: "none", fontFamily: "var(--font)" }} type={type} placeholder={placeholder} value={profile[field as keyof typeof profile]} onChange={e => handleChange(field, e.target.value)} />
              </div>
            ))}
          </div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", margin: "1.5rem 0 1.25rem" }}>Delivery Address</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.1rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Address Line</label>
              <input style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: "0.9rem", color: "var(--text)", background: "#fff", outline: "none", fontFamily: "var(--font)" }} placeholder="House / flat number, street, area" value={profile.address} onChange={e => handleChange("address", e.target.value)} />
            </div>
            {[["City", "city", "Mumbai"], ["PIN Code", "pin", "400001"], ["State", "state", "Maharashtra"]].map(([label, field, placeholder]) => (
              <div key={field}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
                <input style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: "0.9rem", color: "var(--text)", background: "#fff", outline: "none", fontFamily: "var(--font)" }} placeholder={placeholder} value={profile[field as keyof typeof profile]} onChange={e => handleChange(field, e.target.value)} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
            <button className="btn-primary" style={{ padding: "0.75rem 2rem" }} onClick={handleSave}>Save Changes</button>
            {saved && <span style={{ color: "var(--green)", fontWeight: 700, fontSize: "0.9rem" }}>✅ Saved successfully!</span>}
          </div>
        </div>
      )}

      {/* Orders */}
      {tab === "Orders" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {ORDERS.map(o => (
            <div key={o.id} className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{o.id}</span>
                  <span style={{ color: "var(--text-light)", fontSize: "0.82rem", marginLeft: "0.75rem" }}>{o.date}</span>
                </div>
                <span style={{ color: STATUS_COLOR[o.status] || "var(--text)", fontWeight: 700, fontSize: "0.85rem" }}>● {o.status}</span>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0.4rem 0" }}>{o.items}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.05rem" }}>₹{fmt(o.total)}</span>
                <button className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 0.9rem" }}>Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist */}
      {tab === "Wishlist" && (
        <div className="products-grid">
          {wishlist.map(p => (
            <div key={p.id} className="card" style={{ padding: "1.2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{p.emoji}</div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.92rem", marginBottom: "0.3rem" }}>{p.name}</h4>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.05rem", color: "var(--accent)", marginBottom: "0.75rem" }}>₹{fmt(p.price)}</p>
              <Link href="/categories" className="btn-outline" style={{ fontSize: "0.82rem", padding: "0.4rem 0.9rem" }}>View Product</Link>
            </div>
          ))}
        </div>
      )}

      {/* Settings */}
      {tab === "Settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 520 }}>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", marginBottom: "1.25rem" }}>Notification Preferences</h3>
            {NOTIF_KEYS.map(setting => (
              <div key={setting} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{setting}</span>
                <div onClick={() => setNotifs(prev => ({ ...prev, [setting]: !prev[setting] }))} style={{ width: 44, height: 24, borderRadius: 99, cursor: "pointer", position: "relative", background: notifs[setting] ? "var(--accent)" : "var(--border)", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 2, width: 20, height: 20, background: "#fff", borderRadius: "50%", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", left: notifs[setting] ? "auto" : 2, right: notifs[setting] ? 2 : "auto" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", marginBottom: "0.75rem", color: "var(--red)" }}>Danger Zone</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>These actions are permanent and cannot be undone.</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button style={{ background: "none", border: "1.5px solid #fca5a5", color: "var(--red)", padding: "0.5rem 1.1rem", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Change Password</button>
              <button style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", color: "var(--red)", padding: "0.5rem 1.1rem", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
