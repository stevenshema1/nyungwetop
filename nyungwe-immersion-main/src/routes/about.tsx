import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import hero from "@/assets/hotel/hero.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Philosophy — Nyungwe Top View Hill Hotel" },
      { name: "description", content: "Experience-based tourism: how we move guests from sightseeing to storytelling at the edge of Nyungwe National Park." },
      { property: "og:title", content: "Our Philosophy — Nyungwe Top View Hill Hotel" },
      { property: "og:description", content: "From sightseeing to storytelling. The principles that shape every stay." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest-deep/55" />
        <div className="relative container-x h-full flex flex-col justify-end pb-20 text-white">
          <p className="eyebrow !text-white/70">Our Philosophy</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            From sightseeing to storytelling.
          </h1>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="container-x max-w-3xl space-y-8 text-lg leading-relaxed text-foreground/85">
          <p>
            Nyungwe Top View Hill Hotel has been in operation since February 2011, set on a hilltop in Buvungira Cell, Bushekeri Sector, Nyamasheke District. It is owned by a Rwandese entrepreneur and conservationist, and built to belong to its place.
          </p>
          <p>
            The main building is a two-tiered <em className="font-serif text-forest not-italic">rondavel</em> — a modern interpretation of the traditional Rwandan round house — with a phenomenally high roof, a reception adorned with traditional Rwandan murals, circular wicker lights, and a bar entirely decorated from bottle tops. Above is a sweeping veranda where, on clear days, you can see Lake Kivu and the volcanoes of far North Rwanda and the eastern DRC.
          </p>
          <p>
            Twelve red-brick cottages are arranged in two wings — sunrise and sunset — each with a lounge, fireplace for cold evenings, and a balcony framing a particular view. Cottages are named after the views they hold, so guests can choose <em className="font-serif text-forest not-italic">Kivu</em>, <em className="font-serif text-forest not-italic">Nyungwe</em>, and others according to the landscape they want to wake up to.
          </p>
          <p>
            The hotel sits less than 2 km off the Kigali–Bukavu highway, 30 minutes from Lake Kivu and 45 minutes from Kamembe Airport, with Nyungwe National Park's canopy walk, chimpanzee tracking sectors and Gisakura tea estate all within easy reach.
          </p>
        </div>
      </section>

      <section className="py-24 bg-mist border-t border-border">
        <div className="container-x grid md:grid-cols-3 gap-10">
          {[
            { n: "01", t: "Small by design", d: "We cap experience groups at 6 guests so the forest stays the loudest voice." },
            { n: "02", t: "Locally rooted", d: "Every guide, cook, and host is from the communities surrounding Nyungwe." },
            { n: "03", t: "Quietly sustainable", d: "A measurable conservation contribution is built into every booking." },
          ].map((p) => (
            <div key={p.n}>
              <p className="font-serif text-5xl text-clay">{p.n}</p>
              <h3 className="mt-3 font-serif text-2xl">{p.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="container-x mt-20 text-center">
          <Link to="/tours" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-wide rounded-sm hover:bg-forest transition">
            See the Experiences <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
