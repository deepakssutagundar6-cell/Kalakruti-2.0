import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 30 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ kicker, title, kickerClass }: { kicker?: string; title: string; kickerClass?: string }) {
  return (
    <Reveal>
      <div className="text-center mb-14">
        {kicker && <p className={kickerClass ?? "font-script text-3xl md:text-4xl text-gold-deep"}>{kicker}</p>}
        <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mt-2">{title}</h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="h-px w-12 bg-gold-deep/60" />
          <span className="w-2 h-2 rotate-45 bg-gold-deep" />
          <span className="h-px w-12 bg-gold-deep/60" />
        </div>
      </div>
    </Reveal>
  );
}
