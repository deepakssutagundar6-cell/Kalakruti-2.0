import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "schedule", label: "Schedule" },
  { id: "gallery", label: "Gallery" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-md border-b border-gold/40 shadow-elegant"
          : "bg-parchment/70 backdrop-blur-sm border-b border-gold/20"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <a href="#hero" className="flex items-end gap-2.5 group leading-none">
          <span className="text-3xl md:text-4xl font-display font-bold text-gradient-gold leading-none">Kalakruti</span>
          <span className="text-[1.7rem] md:text-[2.15rem] text-maroon font-cinzel font-semibold leading-none">2.0</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative text-base font-semibold tracking-wide text-maroon hover:text-gold-deep transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#events"
            className="px-6 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-base font-semibold shadow-elegant hover:shadow-glow transition-shadow"
          >
            Register
          </a>
        </nav>

        <button
          aria-label="Menu"
          className="md:hidden text-maroon p-2"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-parchment/95 backdrop-blur-md border-t border-border"
        >
          <div className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="text-foreground/80 hover:text-maroon">
                {l.label}
              </a>
            ))}
            <a href="#events" onClick={() => setOpen(false)}
              className="mt-2 text-center px-6 py-2.5 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-elegant">
              Register
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
