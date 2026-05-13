import { Reveal, SectionHeader } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 paper-texture">
      <div className="max-w-5xl mx-auto">
        <SectionHeader kicker="Our Heritage" title="About Kalakruti" />

        <Reveal delay={0.1}>
          <div className="bg-card/60 border border-gold/30 rounded-xl p-8 md:p-12 shadow-elegant backdrop-blur">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-serif">
              <span className="font-display text-5xl text-gold-deep float-left mr-3 leading-none">K</span>
              alakruti 2.0 is a cultural fest conducted at <span className="text-maroon font-medium">Basaveshwar Engineering College</span>, organized by the
              Mechanical Engineering Association (MEA) in association with PIESA. The fest showcases
              dance, music, art, fashion, and theatre performances while blending creativity with
              artistic expression.
            </p>
            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gold-deep/40" />
              <span className="font-script text-2xl text-gold-deep">कलाकृति</span>
              <span className="h-px w-20 bg-gold-deep/40" />
            </div>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 font-serif italic">
              Kalakruti symbolizes artistic creation and cultural heritage through dance, music,
              painting, sculpture, and craft. It reflects imagination, emotion, and artistic talent
              while preserving traditions.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { n: "4",       l: "Major Events" },
            { n: "19 May",  l: "Event Date" },
            { n: "₹25",     l: "Entry Fee" },
            { n: "BEC",     l: "Bagalkot" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="text-center p-6 rounded-lg border border-gold/30 bg-parchment/50 hover-lift">
                <p className="font-cinzel text-3xl md:text-4xl font-semibold text-gradient-gold tracking-wide">{s.n}</p>
                <p className="font-cinzel text-xs tracking-widest text-muted-foreground uppercase mt-2">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
