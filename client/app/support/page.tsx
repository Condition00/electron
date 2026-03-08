"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  { q: "How do I track my order?",          a: "Once your order ships, you'll receive an email with a tracking link. You can also go to Account → Orders to track in real-time." },
  { q: "What is the return policy?",         a: "We accept returns within 7 days of delivery. The product must be unused and in original packaging. Refunds are processed in 3–5 business days." },
  { q: "Do products come with a warranty?",  a: "Yes! All products carry the manufacturer warranty. Most electronics have a 1-year warranty. Extended plans are available at checkout." },
  { q: "How long does delivery take?",       a: "Metro cities: 1–2 business days. Tier-2 cities: 3–4 days. Remote areas: 5–7 days. Express delivery available for an extra ₹149." },
  { q: "Is my payment information secure?",  a: "Absolutely. We use 256-bit SSL encryption. We never store full card details. Payments are processed via Razorpay." },
  { q: "Can I change or cancel my order?",   a: "Orders can be modified or cancelled within 2 hours of placing them. After that, wait for delivery and use the return process." },
  { q: "Do you offer student discounts?",    a: "Yes! Verify your college email in Account settings to unlock an extra 10% off your entire cart, stacked on existing deals." },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and EMI options on orders above ₹3,000." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#eff6ff,#f8f9fc)", padding: "3.5rem 0 2.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>How can we help you?</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto 1.75rem", lineHeight: 1.7 }}>Our support team is available Mon–Sat, 9am–7pm IST. Average response time: 2 hours.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "#fff", border: "1.5px solid var(--border)", borderRadius: 99, padding: "0.6rem 1.25rem", maxWidth: 520, margin: "0 auto", boxShadow: "var(--shadow-sm)" }}>
            <span>🔍</span>
            <input style={{ flex: 1, border: "none", outline: "none", fontSize: "0.9rem", color: "var(--text)", fontFamily: "var(--font)", background: "none" }} placeholder="Search for help — e.g. return policy, track order..." />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem 4rem" }}>
        {/* Channels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
          {[{ icon: "📞", title: "Call Us", detail: "+91 80001 23456", sub: "Mon–Sat, 9am–7pm IST", href: "tel:+918000123456", cta: "Call Now" }, { icon: "✉️", title: "Email Us", detail: "support@electron.in", sub: "Reply within 2 hours", href: "mailto:support@electron.in", cta: "Send Email" }, { icon: "💬", title: "Live Chat", detail: "Chat with an agent", sub: "Available 9am–9pm", href: "#contact", cta: "Start Chat" }, { icon: "📦", title: "Track Order", detail: "Real-time tracking", sub: "Enter your order ID", href: "/account", cta: "Track Now" }].map(ch => (
            <div key={ch.title} className="card" style={{ padding: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "2rem" }}>{ch.icon}</span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, margin: "0.5rem 0 0.2rem" }}>{ch.title}</h3>
              <p style={{ fontWeight: 700, color: "var(--accent)", fontSize: "0.92rem" }}>{ch.detail}</p>
              <p style={{ color: "var(--text-light)", fontSize: "0.8rem", marginBottom: "1rem" }}>{ch.sub}</p>
              <a href={ch.href} className="btn-outline" style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem" }}>{ch.cta}</a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", marginBottom: "1.25rem" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 760 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: "1.1rem 1.25rem", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem" }}>{faq.q}</span>
                  <span style={{ color: "var(--accent)", fontSize: "1.3rem", display: "inline-block", transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ padding: "0 1.25rem 1.1rem", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" style={{ marginTop: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", marginBottom: "1.25rem" }}>Send us a message</h2>
          <div className="card" style={{ padding: "2rem", maxWidth: 640 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "3rem" }}>✅</span>
                <h3 style={{ fontFamily: "var(--font-heading)" }}>Message sent!</h3>
                <p style={{ color: "var(--text-muted)" }}>We'll reply to {form.email} within 2 business hours.</p>
                <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[["Your Name *", "name", "text", "Arjun Sharma"], ["Email Address *", "email", "email", "arjun@example.com"]].map(([label, field, type, placeholder]) => (
                    <div key={field}>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
                      <input required type={type} style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: "0.9rem", color: "var(--text)", background: "var(--bg-muted)", outline: "none", fontFamily: "var(--font)" }} placeholder={placeholder} value={form[field as keyof typeof form]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Subject *</label>
                  <select required style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: "0.9rem", color: "var(--text)", background: "var(--bg-muted)", outline: "none", fontFamily: "var(--font)" }} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select a topic</option>
                    {["Order issue", "Return or refund", "Product question", "Payment problem", "Warranty claim", "Other"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Message *</label>
                  <textarea required rows={5} style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: "0.9rem", color: "var(--text)", background: "var(--bg-muted)", outline: "none", resize: "vertical", fontFamily: "var(--font)" }} placeholder="Describe your issue in detail..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button className="btn-primary" style={{ marginTop: "1.25rem", padding: "0.85rem 2rem" }} onClick={() => { if (form.name && form.email && form.subject && form.message) setSent(true); }}>Send Message →</button>
              </div>
            )}
          </div>
        </section>

        {/* Returns info */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", marginBottom: "1.25rem" }}>Returns & Warranty</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
            {[{ icon: "↩️", title: "7-Day Returns", body: "Return any product within 7 days of delivery. Must be unused, in original packaging with all accessories." }, { icon: "🔧", title: "Warranty Claims", body: "All products come with manufacturer warranty. Log your claim through Account → Orders → Warranty." }, { icon: "💰", title: "Refund Timeline", body: "Refunds processed in 3–5 working days after we receive and inspect the returned item." }, { icon: "🔄", title: "Exchanges", body: "Exchange requests can be made within 7 days. Subject to stock availability." }].map(info => (
              <div key={info.title} className="card" style={{ padding: "1.5rem" }}>
                <span style={{ fontSize: "1.8rem" }}>{info.icon}</span>
                <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, margin: "0.6rem 0 0.3rem" }}>{info.title}</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.65 }}>{info.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
