import { motion } from "framer-motion";

export default function FaintGlacier({ opacity = 0.3, testid = "faint-glacier" }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover brightness-[0.7] saturate-[1.15]"
        data-testid={testid}
      >
        <source src="/videos/glacier.mp4" type="video/mp4" media="(min-width: 641px)" />
        <source src="/videos/glacier.webm" type="video/webm" media="(min-width: 641px)" />
        <source src="/videos/glacier-mobile.mp4" type="video/mp4" />
        <source src="/videos/glacier-mobile.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/55 to-[#030712]" />
    </motion.div>
  );
}
