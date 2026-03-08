"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  { v: "item-1", q: "How do I track my order?",          a: "Once your order ships, you'll receive an email with a tracking link. You can also go to Account → Orders to track in real-time." },
  { v: "item-2", q: "What is the return policy?",         a: "We accept returns within 7 days of delivery. The product must be unused and in original packaging. Refunds are processed in 3–5 business days." },
  { v: "item-3", q: "Do products come with a warranty?",  a: "Yes! All products carry the manufacturer warranty. Most electronics have a 1-year warranty. Extended plans are available at checkout." },
  { v: "item-4", q: "How long does delivery take?",       a: "Metro cities: 1–2 business days. Tier-2 cities: 3–4 days. Remote areas: 5–7 days. Express delivery available for an extra ₹149." },
  { v: "item-5", q: "Is my payment information secure?",  a: "Absolutely. We use 256-bit SSL encryption. We never store full card details. Payments are processed via Razorpay." },
  { v: "item-6", q: "Can I change or cancel my order?",   a: "Orders can be modified or cancelled within 2 hours of placing them. After that, wait for delivery and use the return process." },
  { v: "item-7", q: "Do you offer student discounts?",    a: "Yes! Verify your college email in Account settings to unlock an extra 10% off your entire cart, stacked on existing deals." },
  { v: "item-8", q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and EMI options on orders above ₹3,000." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const channels = [{ icon: "📞", title: "Call Us", detail: "+91 80001 23456", sub: "Mon–Sat, 9am–7pm IST", href: "tel:+918000123456", cta: "Call Now" }, { icon: "✉️", title: "Email Us", detail: "support@electron.in", sub: "Reply within 2 hours", href: "mailto:support@electron.in", cta: "Send Email" }, { icon: "💬", title: "Live Chat", detail: "Chat with an agent", sub: "Available 9am–9pm", href: "#contact", cta: "Start Chat" }, { icon: "📦", title: "Track Order", detail: "Real-time tracking", sub: "Enter your order ID", href: "/account", cta: "Track Now" }]

  return (
    <div className="">
      {/* Hero */}
      <div className="flex items-center justify-around min-h-screen bg-color2">
        <div className="flex flex-col items-center justify-around gap-5 max-w-4/5 text-center font-poppins text-white">
          <h1 className="text-4xl font-black md:text-8xl">How can we help you?</h1>
          <p className="text-md md:text-xl font-light">Our support team is available Mon–Sat, 9am–7pm IST. Average response time: 2 hours.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-around gap-20 min-h-screen">
        {/* Channels */}
        <div className="flex items-center justify-evenly min-w-[99vw] mt-4">
          {channels.map(ch => (
            <div key={ch.title} className="flex flex-col items-center justify-around gap-2 px-8 py-6 bg-zinc-100 border-2 border-color1 rounded-lg font-opensans">
              <span className="text-4xl">{ch.icon}</span>
              <h3 className="text-2xl font-bold pt-4">{ch.title}</h3>
              <p className="text-sm">{ch.detail}</p>
              <p className="text-sm font-light pb-4">{ch.sub}</p>
              <a href={ch.href} className="bg-color3 text-white font-opensans text-md py-1 px-6  border-0 rounded-xl">{ch.cta}</a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="flex flex-col min-w-lg max-w-lg border-2 border-black rounded-xl p-4">
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", marginBottom: "1.25rem" }}>Frequently Asked Questions</h2>
          <Accordion type="single"
            collapsible
            defaultValue="item-1"
            className="max-w-lg">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.v} value={faq.v}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact form */}
        <section id="contact" className="border-2 border-black p-4 rounded-xl">
          <h2 className="text-2xl font-poppins font-bold">Send us a message</h2>
          <div className="card p-8">
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
