import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nyungwe Top View Hill Hotel" },
      { name: "description", content: "Get in touch with the Nyungwe Top View Hill Hotel team for reservations, custom itineraries, and group enquiries." },
      { property: "og:title", content: "Contact — Nyungwe Top View Hill Hotel" },
      { property: "og:description", content: "We answer every enquiry personally, within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="pt-16 pb-16 bg-mist">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.05]">Say hello.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            We answer every enquiry personally, usually within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-x grid md:grid-cols-2 gap-16">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-5"
          >
            <input required placeholder="Your name" className="contact-input" />
            <input required type="email" placeholder="Email address" className="contact-input" />
            <input placeholder="Subject" className="contact-input" />
            <textarea required placeholder="How can we help?" rows={6} className="contact-input resize-none" />
            <button className="bg-primary text-primary-foreground px-8 py-3.5 text-sm uppercase tracking-wide rounded-sm hover:bg-forest transition">
              Send message
            </button>
            {sent && <p className="text-forest font-serif text-lg">Thank you — your message is on its way.</p>}
          </form>

          <div className="space-y-8">
            <div>
              <p className="eyebrow">Reach us</p>
              <ul className="mt-5 space-y-5 text-foreground">
                <li className="flex gap-4"><MapPin className="text-clay mt-1" size={20} /><span>Buvungira Cell, Bushekeri Sector<br />Nyamasheke District, Western Province, Rwanda</span></li>
                <li className="flex gap-4"><Mail className="text-clay mt-1" size={20} /><a href="mailto:reservations@nyungwehotel.com" className="hover:text-primary">reservations@nyungwehotel.com</a></li>
                <li className="flex gap-4"><Phone className="text-clay mt-1" size={20} /><a href="tel:+250787109335" className="hover:text-primary">+250 787 109 335</a></li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Follow the forest</p>
              <p className="mt-3 text-muted-foreground">
                Daily moments from the canopy on Instagram <a href="#" className="text-primary border-b border-primary">@nyungwetopview</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-input {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          transition: border-color 0.2s;
        }
        .contact-input:focus { outline: none; border-color: var(--color-primary); }
      `}</style>
    </Layout>
  );
}
