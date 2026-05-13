import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-36 h-36 mx-auto"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-gold-deep"
              />
              <div className="absolute inset-4 rounded-full bg-gradient-gold flex items-center justify-center font-display text-5xl text-primary-foreground font-bold shadow-glow">
                कृ
              </div>
            </motion.div>
            <p className="mt-8 font-display text-4xl md:text-5xl text-maroon font-bold">Kalakruti 2.0</p>
            <p className="font-script text-3xl md:text-4xl text-gold-deep mt-2">unfolding the canvas...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
