import { GALLERY } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";

const SPAN_CLS = {
  tall: "row-span-2 h-full min-h-[420px]",
  wide: "sm:col-span-2 h-72 sm:h-80",
  std: "h-72 sm:h-80",
};

export default function Gallery() {
  return (
    <main>
      <PageHeader
        kicker="Gallery"
        lines={["Real water.", "Real deliveries."]}
        sub="No stock photography here. This is our stock, our vehicles and our customers' doorsteps across the GTA."
        image="/images/panel-glacier.webp"
        title="Gallery | Drop2Door Water Delivery Services"
      />

      <section className="bg-[#030712] py-20 sm:py-28" data-testid="gallery-grid">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={Math.min(i * 0.06, 0.4)} className={SPAN_CLS[g.span]}>
                <figure
                  className="group relative h-full w-full overflow-hidden rounded-3xl border border-cyan-400/10"
                  data-testid={`gallery-item-${i}`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  {g.cap && (
                    <figcaption className="absolute bottom-5 left-5 right-5">
                      <span className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-cyan-200/90">
                        {g.cap}
                      </span>
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-slate-500">
              Every photo on this site is a real Drop2Door delivery, vehicle or product. What you
              see is what shows up at your door.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        kicker="Your turn"
        title="Next delivery photo could be yours."
        sub="Homes, offices, events. Ten cases minimum, scheduled around your day."
      />
    </main>
  );
}
