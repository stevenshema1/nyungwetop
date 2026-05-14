import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { tours } from "@/lib/tours";
import { Check, Clock, Mountain, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Tour Packages — Nyungwe Top View Hill Hotel" },
      { name: "description", content: "Curated experience-based tour packages in Nyungwe National Park: primate trekking, canopy walks, tea & tradition, and nocturnal wonders." },
      { property: "og:title", content: "Tour Packages — Nyungwe Top View Hill Hotel" },
      { property: "og:description", content: "Four uncrowded ways into the forest. Expert-led, low-impact, place-rooted." },
    ],
  }),
  component: ToursPage,
});

function ToursPage() {
  return (
    <Layout>
      <section className="pt-16 pb-20 bg-mist">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">Curated Experiences</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.05]">Four ways into the forest.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Each package is designed for small groups, paired with the right specialist, and timed to the forest's own rhythms.
          </p>
        </div>
      </section>

      <section className="bg-background">
        {tours.map((t, i) => (
          <article
            key={t.slug}
            id={t.slug}
            className={`scroll-mt-24 border-b border-border ${i % 2 === 1 ? "bg-mist" : ""}`}
          >
            <div className="container-x py-24 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative overflow-hidden rounded-sm aspect-[4/5] shadow-xl">
                  <img src={t.image} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <p className="eyebrow">Experience 0{i + 1}</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">{t.name}</h2>
                <p className="mt-4 font-serif italic text-xl text-forest">{t.tagline}</p>
                <p className="mt-6 text-muted-foreground leading-relaxed text-lg">{t.description}</p>

                <div className="mt-8 flex flex-wrap gap-6 text-sm">
                  <span className="inline-flex items-center gap-2 text-foreground"><Clock size={16} className="text-clay" /> {t.duration}</span>
                  <span className="inline-flex items-center gap-2 text-foreground"><Mountain size={16} className="text-clay" /> {t.difficulty}</span>
                </div>

                <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                  {t.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check size={16} className="text-forest mt-0.5 shrink-0" /> {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
                  <span className="font-serif text-3xl text-foreground">{t.price}<span className="text-sm text-muted-foreground"> / person</span></span>
                  <Link
                    to="/booking"
                    search={{ tour: t.slug }}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wide rounded-sm hover:bg-forest transition"
                  >
                    Reserve <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
