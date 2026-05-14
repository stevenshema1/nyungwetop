import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { tours } from "@/lib/tours";
import { useMemo, useState } from "react";
import { z } from "zod";
import suite from "@/assets/hotel/h2.jpg";
import { Check } from "lucide-react";

const search = z.object({ tour: z.string().optional() });

export const Route = createFileRoute("/booking")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Booking — Nyungwe Top View Hill Hotel" },
      { name: "description", content: "Reserve a room and a curated tour together. Seamless integrated booking for Nyungwe Top View Hill Hotel." },
      { property: "og:title", content: "Reserve Your Stay — Nyungwe Top View Hill Hotel" },
      { property: "og:description", content: "Pair a forest suite with one of our curated experiences in a single booking." },
    ],
  }),
  component: BookingPage,
});

const rooms = [
  { id: "sunrise", name: "Sunrise Wing Cottage", price: 220, desc: "Red-brick cottage with lounge, fireplace and balcony facing the eastern sunrise over Nyungwe." },
  { id: "sunset", name: "Sunset Wing Cottage", price: 240, desc: "West-facing cottage with views of Lake Kivu, terraces and the volcanoes on clear days." },
  { id: "kivu", name: "Kivu View Cottage", price: 280, desc: "Premium cottage named for its uninterrupted view across to Lake Kivu and the Kahuzi-Biega range." },
];

function BookingPage() {
  const { tour: preselect } = Route.useSearch();
  const [room, setRoom] = useState(rooms[0].id);
  const [tour, setTour] = useState(preselect ?? tours[0].slug);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(() => {
    const r = rooms.find((x) => x.id === room)!;
    const t = tours.find((x) => x.slug === tour)!;
    const tourPrice = parseInt(t.price.replace(/\D/g, ""), 10);
    return r.price * nights + tourPrice * guests;
  }, [room, tour, nights, guests]);

  return (
    <Layout>
      <section className="pt-16 pb-12 bg-mist">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">Reserve</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">Plan your stay.</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Pair a suite with a curated experience in one seamless booking. Our team will confirm within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Room */}
            <fieldset>
              <legend className="eyebrow mb-4">01 · Choose your room</legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {rooms.map((r) => (
                  <label
                    key={r.id}
                    className={`cursor-pointer rounded-sm border p-5 transition ${
                      room === r.id ? "border-primary bg-mist" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <input type="radio" name="room" className="sr-only" checked={room === r.id} onChange={() => setRoom(r.id)} />
                    <p className="font-serif text-xl">{r.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                    <p className="mt-3 text-sm text-foreground">${r.price} <span className="text-muted-foreground">/ night</span></p>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Tour */}
            <fieldset>
              <legend className="eyebrow mb-4">02 · Add an experience</legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {tours.map((t) => (
                  <label
                    key={t.slug}
                    className={`cursor-pointer rounded-sm border p-5 transition flex gap-4 ${
                      tour === t.slug ? "border-primary bg-mist" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <input type="radio" name="tour" className="sr-only" checked={tour === t.slug} onChange={() => setTour(t.slug)} />
                    <img src={t.image} alt="" className="w-20 h-20 object-cover rounded-sm shrink-0" />
                    <div>
                      <p className="font-serif text-lg leading-tight">{t.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{t.duration}</p>
                      <p className="mt-2 text-sm">{t.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Details */}
            <fieldset>
              <legend className="eyebrow mb-4">03 · Your details</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Arrival date">
                  <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
                </Field>
                <Field label="Nights">
                  <input required type="number" min={1} max={14} value={nights} onChange={(e) => setNights(+e.target.value)} className="input" />
                </Field>
                <Field label="Guests">
                  <input required type="number" min={1} max={6} value={guests} onChange={(e) => setGuests(+e.target.value)} className="input" />
                </Field>
                <Field label="Full name">
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
                </Field>
                <Field label="Email" className="sm:col-span-2">
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                </Field>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-wide rounded-sm hover:bg-forest transition"
            >
              Request reservation
            </button>

            {submitted && (
              <p className="flex items-center gap-2 text-forest font-serif text-lg">
                <Check size={20} /> Thank you, {name || "guest"}. We'll be in touch shortly.
              </p>
            )}
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-sm overflow-hidden bg-mist border border-border">
              <img src={suite} alt="" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="p-6">
                <p className="eyebrow">Reservation summary</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <Row k="Room" v={rooms.find((r) => r.id === room)!.name} />
                  <Row k="Experience" v={tours.find((t) => t.slug === tour)!.name} />
                  <Row k="Nights" v={String(nights)} />
                  <Row k="Guests" v={String(guests)} />
                </dl>
                <div className="mt-6 pt-6 border-t border-border flex items-baseline justify-between">
                  <span className="eyebrow">Estimated total</span>
                  <span className="font-serif text-3xl text-foreground">${total.toLocaleString()}</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Final pricing confirmed by our reservations team. Park fees & taxes included.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          padding: 0.75rem 0.875rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          transition: border-color 0.2s;
        }
        .input:focus { outline: none; border-color: var(--color-primary); }
      `}</style>
    </Layout>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-foreground text-right">{v}</dd>
    </div>
  );
}
