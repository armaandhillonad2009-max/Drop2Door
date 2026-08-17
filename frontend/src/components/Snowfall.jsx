import { useMemo } from "react";

export default function Snowfall() {
  const month = new Date().getMonth();
  const winter = month <= 2 || month >= 10;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const flakes = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: (i * 97) % 100,
        delay: -((i * 1.7) % 12),
        dur: 9 + (i % 7) * 1.4,
        size: 2 + (i % 3),
        opacity: 0.14 + (i % 5) * 0.05,
      })),
    [],
  );

  if (!winter || reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
      data-testid="snowfall-overlay"
    >
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
