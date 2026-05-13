import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  // Start with zeros to match SSR output, then hydrate on client
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(diff(t));
    const i = setInterval(() => setTime(diff(t)), 1000);
    return () => clearInterval(i);
  }, [t]);

  const items = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="w-16 md:w-20 h-16 md:h-20 rounded-lg bg-card/70 border border-gold/40 backdrop-blur flex items-center justify-center font-display text-2xl md:text-3xl font-bold text-maroon shadow-elegant">
            {mounted ? String(it.value).padStart(2, "0") : "00"}
          </div>
          <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">{it.label}</p>
        </div>
      ))}
    </div>
  );
}
