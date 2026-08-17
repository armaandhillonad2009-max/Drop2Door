import { Droplets } from "lucide-react";

const ITEMS = [
  "Spring Water",
  "Distilled Water",
  "Sparkling Water",
  "24-Hour Scheduled Delivery",
  "Minimum 10 Cases",
  "Homes · Businesses · Events",
  "Brampton · Mississauga · Toronto · GTA",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-cyan-400/10 bg-[#040b18] py-5"
      data-testid="editorial-marquee"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-display px-8 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {item}
                </span>
                <Droplets className="h-3.5 w-3.5 text-cyan-500/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
