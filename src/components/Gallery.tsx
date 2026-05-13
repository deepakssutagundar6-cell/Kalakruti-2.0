import { Reveal, SectionHeader } from "./Reveal";
import dance from "@/assets/event-dance.jpg";
import singing from "@/assets/event-singing.jpg";
import rangoli from "@/assets/event-rangoli.jpg";
import fashion from "@/assets/event-fashion.jpg";
import peacock from "@/assets/gemini-2.5-flash-image_remove_everything_just_create_one_image_of_peacock_thats_it-0.jpg";
import hero from "@/assets/hero-bg.jpg";

const imgs = [
  { src: dance,    h: "row-span-2" },
  { src: rangoli,  h: "" },
  { src: peacock,  h: "row-span-4 col-span-4" },
  { src: fashion,  h: "" },
  { src: singing,  h: "" },
  { src: hero,     h: "" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader kicker="Glimpses" title="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {imgs.map((im, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className={`group relative overflow-hidden rounded-lg border-2 border-gold/40 shadow-elegant ${im.h} h-full`}>
                <div className="absolute inset-1 border border-gold/60 z-10 pointer-events-none" />
                <img
                  src={im.src}
                  alt="Kalakruti gallery"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-maroon/10 group-hover:bg-maroon/0 transition-colors" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
