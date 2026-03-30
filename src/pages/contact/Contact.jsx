import { useState } from "react";
import MainLayout from "../../layout/MainLayout";

// ── 1. HERO ───────────────────────────────────────────────────────────────────
function ContactHero() {
  return (
    <section className="py-20 px-6 text-center">
      <span className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-sm mb-6">Contact Us</span>
      <h1 className="text-5xl font-black text-white mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
        Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Talk.</span>
      </h1>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        Have a question, idea, or just want to say hi? We'd love to hear from you. Fill out the form below!
      </p>
    </section>
  );
}

// ── 2. CONTACT INFO CARDS ─────────────────────────────────────────────────────
function ContactInfoCards() {
  const info = [
    { icon: "📧", title: "Email Us", value: "hello@faceapp.com", sub: "We reply within 24 hours" },
    { icon: "💬", title: "Live Chat", value: "Start a Conversation", sub: "Available 9AM – 6PM PST" },
    { icon: "📍", title: "Our Office", value: "Lahore, Pakistan", sub: "Come visit us anytime" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {info.map(({ icon, title, value, sub }) => (
          <div key={title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="text-white font-bold mb-1">{title}</h3>
            <p className="text-cyan-400 text-sm font-medium">{value}</p>
            <p className="text-gray-500 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 3. CONTACT FORM (Formspree + Validation) ──────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setStatus("sending");
    try {
      // Replace "YOUR_FORM_ID" with actual Formspree form ID
      const res = await fetch("https://formspree.io/f/xzdjzgye", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full bg-gray-800 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500 focus:border-red-400" : "border-gray-700 focus:border-cyan-500"
    }`;

  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Send a Message</h2>

        {status === "success" && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-green-400 text-xl">✓</span>
            <p className="text-green-400 text-sm font-medium">Message sent! We'll get back to you within 24 hours.</p>
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-red-400 text-xl">✗</span>
            <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass("name")} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Email Address *</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass("email")} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Subject *</label>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className={inputClass("subject")} />
          {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Message *</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Write your message here (min 20 characters)..." className={`${inputClass("message")} resize-none`} />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          <p className="text-gray-600 text-xs mt-1 text-right">{form.message.length} / 500</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {status === "sending" ? "Sending..." : "Send Message →"}
        </button>
        <p className="text-gray-600 text-xs text-center mt-3">We typically respond within 24 hours.</p>
      </div>
    </section>
  );
}

// ── 4. MAP PLACEHOLDER ────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-4">
      <div className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-gray-800 rounded-2xl h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-gray-400 font-medium">Lahore, Punjab, Pakistan</p>
          <p className="text-gray-600 text-sm">Find us on Google Maps</p>
        </div>
      </div>
    </section>
  );
}

// ── 5. SOCIAL LINKS ───────────────────────────────────────────────────────────
function SocialLinks() {
  const socials = [
    { name: "Twitter / X", handle: "@faceapp", icon: "𝕏", color: "hover:border-sky-500/40 hover:text-sky-400" },
    { name: "Instagram", handle: "@faceapp.official", icon: "📸", color: "hover:border-pink-500/40 hover:text-pink-400" },
    { name: "LinkedIn", handle: "FaceApp Inc.", icon: "in", color: "hover:border-blue-500/40 hover:text-blue-400" },
    { name: "GitHub", handle: "github.com/faceapp", icon: "</>" , color: "hover:border-gray-400/40 hover:text-gray-300" },
  ];
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-black text-white mb-6 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>Find Us Online</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socials.map(({ name, handle, icon, color }) => (
          <a key={name} href="#" className={`bg-gray-900 border border-gray-800 ${color} rounded-xl p-4 text-center transition-all`}>
            <div className="text-2xl mb-2">{icon}</div>
            <p className="text-white text-xs font-bold">{name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{handle}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <MainLayout>
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <MapSection />
      <SocialLinks />
    </MainLayout>
  );
}
