import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import h11 from "@/assets/hotel/h11.jpg";
import h8 from "@/assets/hotel/h8.jpg";
import h6 from "@/assets/hotel/h6.jpg";
import h2 from "@/assets/hotel/h2.jpg";
import h3 from "@/assets/hotel/h3.jpg";
import h1 from "@/assets/hotel/h1.jpg";
import hero from "@/assets/hotel/hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Nyungwe Top View Hill Hotel" },
      { name: "description", content: "Real photographs of Nyungwe Top View Hill Hotel — cottages, the rondavel main building, terrace and 360° views over the rainforest." },
      { property: "og:image", content: h11 },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: hero, caption: "Nyungwe Top View Hill Hotel — exterior view", tall: true },
  { src: h11, caption: "Cottage exterior" },
  { src: h8, caption: "The rondavel main building" },
  { src: h6, caption: "Hilltop grounds" },
  { src: h2, caption: "Interior detail", tall: true },
  { src: h3, caption: "Bedroom" },
  { src: h1, caption: "View from the property" },
];

function GalleryPage() {
  return (
    <Layout>
      <section className="pt-16 pb-16 bg-mist">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">Photo Gallery</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">From the hilltop.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Real photographs from the property — cottages, the rondavel, terraces and views.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-x">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {images.map((img, i) => (
              <figure key={i} className="mb-5 break-inside-avoid relative overflow-hidden rounded-sm group">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className={`w-full object-cover ${img.tall ? "aspect-[3/4]" : "aspect-[4/3]"} group-hover:scale-105 transition-transform duration-[1400ms] ease-out`}
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 text-white text-sm font-serif italic bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
