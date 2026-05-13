export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 20 H70" stroke="currentColor" strokeWidth="1" />
      <path d="M130 20 H200" stroke="currentColor" strokeWidth="1" />
      <g transform="translate(100,20)" stroke="currentColor" strokeWidth="1.2" fill="none">
        <circle r="8" />
        <circle r="4" />
        <path d="M-20 0 Q-12 -8 0 -8 Q12 -8 20 0 Q12 8 0 8 Q-12 8 -20 0 Z" />
        <circle cx="-26" cy="0" r="2" fill="currentColor" />
        <circle cx="26" cy="0" r="2" fill="currentColor" />
      </g>
    </svg>
  );
}

export function CornerFloral({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M0 0 H40 M0 0 V40" />
      <path d="M0 0 Q60 10 80 30 Q100 60 110 110" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <path d="M10 30 Q25 35 35 25 Q40 18 30 12" />
      <path d="M30 10 Q45 22 55 40 Q65 55 60 70" />
      <circle cx="55" cy="40" r="2" fill="currentColor" />
      <circle cx="80" cy="60" r="2" fill="currentColor" />
      <path d="M70 50 Q85 55 90 70 Q92 85 80 90" />
      <path d="M40 0 Q50 8 45 18 Q38 22 32 16" />
      <path d="M0 40 Q8 50 18 45 Q22 38 16 32" />
    </svg>
  );
}
