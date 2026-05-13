import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Ornament, CornerFloral } from "./Ornament";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 scroll-mt-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-parchment/60 via-parchment/30 to-parchment" aria-hidden />

      {/* Corners */}
      <CornerFloral className="absolute top-24 left-6 w-24 md:w-36 text-gold-deep/70" />
      <CornerFloral className="absolute top-24 right-6 w-24 md:w-36 text-gold-deep/70" flip />
      <CornerFloral className="absolute bottom-6 left-6 w-24 md:w-36 text-gold-deep/70 rotate-[270deg]" />
      <CornerFloral className="absolute bottom-6 right-6 w-24 md:w-36 text-gold-deep/70 rotate-180" />

      {/* Floating motifs */}
      <motion.div
        className="absolute top-1/4 left-[12%] w-3 h-3 rounded-full bg-gold/60 hidden md:block"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-[14%] w-2 h-2 rounded-full bg-maroon/50 hidden md:block"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-script text-3xl md:text-5xl text-gold-deep mb-2"
        >
          Mechanical Engineering Association presents
        </motion.p>

        <Ornament className="mx-auto w-48 text-gold-deep mb-4" />

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-gold leading-none"
        >
          KALAKRUTI
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-2"
        >
          <span className="h-px w-16 bg-gold-deep" />
          <span className="font-cinzel text-2xl md:text-3xl text-maroon tracking-[0.3em]">2.0</span>
          <span className="h-px w-16 bg-gold-deep" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-display italic text-2xl md:text-3xl text-foreground/80 mt-6"
        >
          A Fusion Work of Art
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6"
        >
          A celebration of dance, music, art, fashion and theatre — where tradition meets
          modern creative expression at Basaveshwar Engineering College.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <a
            href="#events"
            className="px-8 py-3 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-elegant hover:shadow-glow hover:scale-105 transition-all"
          >
            Register Now
          </a>
          <a
            href="#events"
            className="px-8 py-3 rounded-full border-2 border-maroon/60 text-maroon font-medium hover:bg-maroon hover:text-primary-foreground transition-all"
          >
            Explore Events
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <Countdown target="2026-05-19T09:00:00" />
        </motion.div>
      </div>
    </section>
  );
}
