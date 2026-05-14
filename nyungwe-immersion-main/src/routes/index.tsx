import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { HeroScene } from "@/components/site/HeroScene";
import { tours, popularTours } from "@/lib/tours";
import h11 from "@/assets/hotel/h11.jpg";
import h8 from "@/assets/hotel/h8.jpg";
import h6 from "@/assets/hotel/h6.jpg";
import h2 from "@/assets/hotel/h2.jpg";
import h3 from "@/assets/hotel/h3.jpg";
import h1 from "@/assets/hotel/h1.jpg";
import hero from "@/assets/hotel/hero.jpg";
import tea from "@/assets/pkg/tea.jpg";
import wellness from "@/assets/pkg/wellness.jpg";
import birds from "@/assets/pkg/birds.jpg";
import culture from "@/assets/pkg/culture.jpg";
import { ArrowRight, Compass, Leaf, Mountain, Star, Calendar, Users, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nyungwe Top View Hill Hotel — Rainforest Sanctuary in Rwanda" },
      { name: "description", content: "A hilltop hotel above Nyungwe National Park, Rwanda. Twelve cottages, 360° views and curated chimpanzee, canopy, tea, wellness and cultural experiences." },
      { property: "og:title", content: "Nyungwe Top View Hill Hotel" },
      { property: "og:description", content: "Hilltop sanctuary above Africa's oldest rainforest." },
      { property: "og:image", content: hero },
    ],
  }),
  component: HomePage,
});

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`;
    };
    const onLeave = () => (el.style.transform = "perspective(900px) rotateY(0) rotateX(0)");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useTilt();
  return (
    <div ref={ref} style={{ transition: "transform 400ms cubic-bezier(.2,.8,.2,1)", transformStyle: "preserve-3d" }} className={className}>
      {children}
    </div>
  );
}

const blogPosts = [
  {
    title: "A Beautiful Morning in the Cyamudongo Chimpanzee Forest",
    excerpt: "What it's really like to wake at 4am, lace up your boots and follow a habituated chimpanzee family at first light.",
    date: "April 28, 2026",
    image: h8,
    tag: "Wildlife",
  },
  {
    title: "Five Attractive Reasons to Walk East Africa's Only Canopy Bridge",
    excerpt: "From the dawn turaco chorus to the dizzying drop, here's why our guests rank the canopy walk their favourite hour in Nyungwe.",
    date: "April 15, 2026",
    image: h6,
    tag: "Adventure",
  },
  {
    title: "From Leaf to Cup: Inside the Gisakura Tea Estate",
    excerpt: "A short story about the cooperatives, the volcanic soil, and the women whose hands have shaped Rwandan tea for generations.",
    date: "March 30, 2026",
    image: tea,
    tag: "Culture",
  },
];

function HomePage() {
  return (
    <Layout>
      {/* HERO — clean, no dark text box */}
      <HeroScene>
        <div className="container-x h-full flex flex-col justify-end pb-20 md:pb-28 text-white">
          <p className="eyebrow !text-clay fade-up">Nyungwe National Park · Rwanda · Since 2011</p>
          <h1 className="fade-up mt-4 font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            On the hill,<br />above the forest.
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg text-white/90 leading-relaxed">
            Twelve cottages on a hilltop in Bushekeri, with 360° views of Nyungwe's canopy, Lake Kivu and — on clear days — the volcanoes of the Virungas.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-4">
            <Link to="/tours" className="group inline-flex items-center gap-3 bg-clay text-white px-7 py-4 text-sm tracking-wide uppercase rounded-sm hover:bg-clay/90 transition">
              Explore Experiences
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/booking" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/40 text-white px-7 py-4 text-sm tracking-wide uppercase rounded-sm hover:bg-white/20 transition">
              Reserve a Cottage
            </Link>
          </div>
        </div>
      </HeroScene>

      {/* QUICK BOOKING BAR — floats over hero/under header */}
      <QuickBooking />

      {/* POPULAR PACKAGES — replaces the old shadow CTA, sits right under the hero on the same forest backdrop */}
      <section
        className="relative py-24 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(20,32,24,0.92), rgba(20,32,24,0.92)), url(${h11})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-x text-mist">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="eyebrow !text-clay">Most Popular</p>
              <h2 className="mt-3 font-serif text-4xl md:text-6xl leading-tight">
                The packages our guests love.
              </h2>
              <p className="mt-5 text-white/75 text-lg leading-relaxed">
                Five attractive and beautiful experiences — handpicked from the full Nyungwe collection.
              </p>
            </div>
            <Link to="/tours" className="text-clay border-b border-clay pb-1 inline-flex items-center gap-2 hover:gap-3 transition-all uppercase text-sm tracking-wider">
              See all packages <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularTours.map((t, i) => (
              <TiltCard key={t.slug}>
                <Link to="/tours" hash={t.slug} className="group relative overflow-hidden rounded-sm aspect-[4/5] block">
                  <img src={t.image} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1400ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-clay text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    Popular · 0{i + 1}
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <span className="eyebrow !text-white/60">{t.duration}</span>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">{t.name}</h3>
                    <p className="mt-2 text-sm text-white/80 line-clamp-2">{t.tagline}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-serif text-lg text-clay">{t.price}</span>
                      <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-white/80 group-hover:text-clay transition">
                        Discover <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-x grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow">About the Hotel</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight text-foreground">
              A Rwandese rondavel,<br />reimagined.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              In operation since February 2011, Nyungwe Top View Hill Hotel sits in Buvungira Cell, Bushekeri Sector — owned by a Rwandese entrepreneur and conservationist. Its main building is a two-tiered <em className="text-forest font-serif not-italic">rondavel</em> with a phenomenally high roof, a modern take on the traditional Rwandan round house.
            </p>
            <p>
              Twelve red-brick cottages spread across two wings — one facing sunrise, one facing sunset. Each cottage has its own lounge, fireplace and balcony framing a particular view: <em className="text-forest font-serif not-italic">Kivu</em>, <em className="text-forest font-serif not-italic">Nyungwe</em> and more.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-medium border-b border-primary pb-1 hover:gap-3 transition-all">
              Read the full story <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="container-x mt-20 grid md:grid-cols-3 gap-px bg-border">
          {[
            { icon: Mountain, title: "360° hilltop views", text: "Forest canopy, Lake Kivu, and on clear days the volcanoes Karisimbi, Mikeno, Nyamuragira and Nyiragongo." },
            { icon: Leaf, title: "12 cottages", text: "Two wings — sunrise & sunset — each cottage with private lounge, fireplace and a view-named balcony." },
            { icon: Compass, title: "Park at the door", text: "Less than 2 km from the Kigali–Bukavu highway and minutes from Nyungwe's canopy walk and Gisakura tea estate." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-background p-10">
              <Icon className="text-clay" size={28} strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ALL EXPERIENCES — split layout with image stack */}
      <section className="py-24 bg-mist">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">All Experiences</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Eight beautiful ways into Nyungwe.</h2>
            <p className="mt-5 text-muted-foreground text-lg">Browse the full collection — from sunrise yoga to nocturnal forest discovery.</p>
          </div>

          <div className="mt-14 grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {tours.map((t, i) => (
              <Link
                key={t.slug}
                to="/tours"
                hash={t.slug}
                className="group relative overflow-hidden rounded-sm aspect-[3/4] block bg-foreground/5"
              >
                <img src={t.image} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1400ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/20 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-widest text-clay">0{i + 1} · {t.duration.split("·")[0].trim()}</span>
                  <h3 className="mt-1.5 font-serif text-xl leading-tight">{t.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/80 group-hover:text-clay transition">
                    {t.price} <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAP / PROXIMITY */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-x grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow">Location</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">A forest at your doorstep.</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Buvungira Cell, Bushekeri Sector, Nyamasheke District — Western Province, Rwanda. Less than 2 km off the Kigali–Bukavu highway and 45 minutes by road from Kamembe Airport.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                ["Gisakura Tea Estate", "8 min drive"],
                ["Nyungwe Canopy Walkway", "20 min drive"],
                ["Kamiranzovu Marsh & Waterfall", "30 min drive"],
                ["Cyamudongo Chimpanzee Sector", "60 min drive"],
                ["Lake Kivu shore", "30 min drive"],
                ["Kamembe Airport", "45 min drive"],
              ].map(([place, time]) => (
                <li key={place} className="flex items-baseline justify-between border-b border-border pb-3">
                  <span className="font-serif text-xl text-foreground">{place}</span>
                  <span className="text-sm text-muted-foreground tracking-wide">{time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl">
            <iframe
              title="Hotel location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=29.00%2C-2.55%2C29.30%2C-2.35&amp;layer=mapnik&amp;marker=-2.4500,29.1500"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur px-4 py-3 rounded-sm text-sm">
              <p className="font-serif text-base text-foreground">Nyungwe Top View Hill Hotel</p>
              <p className="text-muted-foreground text-xs mt-0.5">Bushekeri · Nyamasheke · Rwanda</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW with captions */}
      <section className="py-24 bg-mist">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">From the property</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">A beautiful living gallery.</h2>
            </div>
            <Link to="/gallery" className="text-primary border-b border-primary pb-1 inline-flex items-center gap-2 hover:gap-3 transition-all">
              See full gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: h11, caption: "Beautiful sunrise terrace" },
              { src: h8, caption: "The attractive rondavel" },
              { src: wellness, caption: "Misty wellness deck" },
              { src: h2, caption: "Cottage interior" },
              { src: birds, caption: "Great Blue Turaco" },
              { src: culture, caption: "Intore heritage" },
              { src: h3, caption: "Sunset wing bedroom" },
              { src: h1, caption: "Hilltop view" },
              { src: h6, caption: "Forest grounds" },
            ].map((img, i) => (
              <TiltCard key={i} className={`relative overflow-hidden rounded-sm group ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
                <img src={img.src} alt={img.caption} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-white text-xs font-serif italic bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </figcaption>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST BLOG */}
      <section className="py-24 bg-background">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Journal</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">From our latest stories.</h2>
            </div>
            <Link to="/about" className="text-primary border-b border-primary pb-1 inline-flex items-center gap-2 hover:gap-3 transition-all">
              All journal entries <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((p) => (
              <TiltCard key={p.title}>
                <article className="group cursor-pointer rounded-sm overflow-hidden bg-mist">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                    <span className="absolute top-4 left-4 bg-clay text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.date}</p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                      Read story <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-28 bg-forest-deep text-mist">
        <div className="container-x max-w-4xl text-center">
          <div className="flex justify-center gap-1 mb-8 text-clay">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
          </div>
          <p className="font-serif text-3xl md:text-4xl leading-snug text-white">
            "The views from the veranda are stunning — on clear days you can even see Lake Kivu and the volcanoes of far North Rwanda. A peaceful retreat after a day of trekking in Nyungwe."
          </p>
          <p className="mt-8 eyebrow !text-white/50">— Guest review · Nyungwe Top View Hill Hotel</p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <img src={h6} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <div className="relative container-x text-center text-white">
          <h2 className="font-serif text-4xl md:text-6xl">Begin your forest story.</h2>
          <p className="mt-6 max-w-xl mx-auto text-white/80 text-lg">
            Reserve a cottage and a curated experience together — and let us shape the rest.
          </p>
          <Link to="/booking" className="inline-flex mt-10 items-center gap-3 bg-clay text-white px-8 py-4 text-sm uppercase tracking-wide rounded-sm hover:bg-clay/90 transition">
            Plan Your Stay <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

/* Compact, easy 4-field booking widget */
function QuickBooking() {
  const [date, setDate] = useState("");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [tour, setTour] = useState(tours[0].slug);

  return (
    <section className="relative -mt-14 z-20">
      <div className="container-x">
        <form
          action="/booking"
          className="bg-background border border-border shadow-2xl rounded-sm p-5 md:p-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <Field label="Arrival">
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="qb-input pl-9" />
            </div>
          </Field>
          <Field label="Nights">
            <input type="number" min={1} max={14} value={nights} onChange={(e) => setNights(+e.target.value)} className="qb-input" />
          </Field>
          <Field label="Guests">
            <div className="relative">
              <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input type="number" min={1} max={6} value={guests} onChange={(e) => setGuests(+e.target.value)} className="qb-input pl-9" />
            </div>
          </Field>
          <Field label="Experience">
            <select name="tour" value={tour} onChange={(e) => setTour(e.target.value)} className="qb-input">
              {tours.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>
          </Field>
          <Link
            to="/booking"
            search={{ tour }}
            className="bg-forest-deep text-white text-center px-6 py-3 text-sm uppercase tracking-wider rounded-sm hover:bg-forest transition inline-flex items-center justify-center gap-2"
          >
            Check Availability <ArrowRight size={14} />
          </Link>
        </form>
      </div>
      <style>{`
        .qb-input {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          padding: 0.7rem 0.875rem;
          font-size: 0.9rem;
          color: var(--color-foreground);
          transition: border-color 0.2s;
        }
        .qb-input:focus { outline: none; border-color: var(--color-primary); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
