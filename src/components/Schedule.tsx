import { Reveal, SectionHeader } from "./Reveal";

const items = [
  {
    time: "09:00 AM",
    title: "Registration & Check-in",
    venue: "Gallery Hall",
    desc: "",
  },
  {
    time: "10:00 AM",
    title: "Inauguration Ceremony",
    venue: "Gallery Hall",
    desc: "",
  },
  {
    time: "11:00 AM",
    title: "Drawing & Rangoli",
    venue: "Main Building — Open Quadrangle",
    desc: "",
  },
  {
    time: "12:30 PM",
    title: "Solo & Group Singing",
    venue: "Gallery Hall",
    desc: "",
  },
  {
    time: "02:30 PM",
    title: "Solo & Group Dance",
    venue: "Gallery Hall",
    desc: "",
  },
  {
    time: "05:00 PM",
    title: "Fashion Show — Theme Walk",
    venue: "Gallery Hall",
    desc: "",
  },
  {
    time: "07:00 PM",
    title: "Prize Distribution & Closing",
    venue: "Gallery Hall",
    desc: "",
  },
];

export function Schedule() {
  return (
    <section id="schedule" className="relative py-24 md:py-32 px-6 paper-texture scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader kicker="19 May 2026" title="Event Schedule" kickerClass="font-cinzel text-lg tracking-[0.2em]" />

        <Reveal>
          <p className="text-center text-foreground/70 max-w-2xl mx-auto -mt-6 mb-14">
            One full day of celebrations across the Basaveshwar Engineering College campus,
            Bagalkot. All timings are tentative — please arrive 15 minutes prior to your event.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-deep to-transparent" />

          {items.map((it, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={it.title + i} delay={i * 0.06}>
                <div className={`relative flex md:items-center mb-10 ${left ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />
                  {/* Diamond dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-4 h-4 rotate-45 bg-gradient-gold shadow-glow z-10" />
                  {/* Card — fixed width on both sides */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${left ? "md:pr-10" : "md:pl-10"}`}>
                    <div className="bg-card/70 backdrop-blur border border-gold/30 rounded-xl p-5 shadow-elegant hover-lift w-full min-h-[120px] flex flex-col justify-center">
                      <p className="font-cinzel text-base text-gold-deep font-semibold tracking-widest">{it.time}</p>
                      <h3 className="font-display text-2xl font-bold text-maroon mt-1">{it.title}</h3>
                      <p className="flex items-center gap-2 text-sm text-foreground/80 mt-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-deep flex-shrink-0">
                          <path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z" />
                          <circle cx="12" cy="9" r="3" />
                        </svg>
                        <span>{it.venue}</span>
                      </p>
                      {it.desc && <p className="text-sm text-foreground/60 mt-2 italic">{it.desc}</p>}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl border border-gold/30 bg-card/60 backdrop-blur">
              <p className="font-cinzel text-xs text-gold-deep tracking-[0.2em] uppercase">Date</p>
              <p className="font-cinzel text-lg text-maroon mt-2 tracking-wide">19 May 2026</p>
            </div>
            <div className="p-6 rounded-xl border border-gold/30 bg-card/60 backdrop-blur">
              <p className="font-cinzel text-xs text-gold-deep tracking-[0.2em] uppercase">Venue</p>
              <p className="font-cinzel text-lg text-maroon mt-2 tracking-wide">BEC Campus, Bagalkot</p>
            </div>
            <div className="p-6 rounded-xl border border-gold/30 bg-card/60 backdrop-blur">
              <p className="font-cinzel text-xs text-gold-deep tracking-[0.2em] uppercase">Entry Fee</p>
              <p className="font-cinzel text-lg text-maroon mt-2 tracking-wide">₹25 per person</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
