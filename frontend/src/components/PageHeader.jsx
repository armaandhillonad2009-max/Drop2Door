import { useEffect } from "react";
import { Kicker, MaskedLine, Reveal } from "@/components/Motion";

export default function PageHeader({ kicker, lines, sub, image, title }) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <section className="noise relative overflow-hidden bg-[#030712] pb-12 pt-32 sm:pb-16 sm:pt-40">
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <img src={image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/85 to-[#030712]" />
        </div>
      )}
      <div
        className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <h1 className="font-display mt-5 text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {lines.map((l, i) => (
            <MaskedLine key={l} delay={0.08 * i}>
              {i === lines.length - 1 ? <span className="text-gradient-ice">{l}</span> : l}
            </MaskedLine>
          ))}
        </h1>
        {sub && (
          <Reveal delay={0.25} className="mt-6 max-w-2xl">
            <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
