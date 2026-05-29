import { motion } from "framer-motion";
import HeroRingViewer from "../components/HeroRingViewer";
import TextDisintegrate from "../components/TextDisintegrate";

export default function Hero({ product, ease }) {
  const customSequence = [
    { line1: "Crafted", line2: "for forever." },
    { line1: "Designed", line2: "to inspire." },
    { line1: "Shaped by", line2: "timelessness." },
    { line1: "Born of", line2: "pure legacy." }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center pt-28 pb-12 md:py-20 lg:py-0">
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] rounded-full bg-yellow-400/10 blur-[100px] md:blur-[180px]" />
      <div className="absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full bg-yellow-400/10 blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.92)_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: "url('https://raw.githubusercontent.com/dentonbaird/grainy-gradients/main/noise.svg')",
        }}
      />

      <div className="absolute right-10 lg:right-20 bottom-10 z-10 hidden md:block select-none pointer-events-none">
        <p className="text-white/5 text-[100px] lg:text-[180px] leading-none font-light tracking-[-0.08em]">
          Lumière
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: ease, delay: 0.2 }}
        className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen"
      >
        <div className="order-2 lg:order-1 lg:col-span-7 max-w-[720px] text-center lg:text-left flex flex-col items-center lg:items-start">

          <div className="inline-flex items-center gap-3 mb-6 px-4 lg:px-5 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 backdrop-blur-xl">
            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-yellow-400" />
            <p className="text-[9px] lg:text-[10px] tracking-[0.35em] lg:tracking-[0.45em] uppercase text-yellow-300 whitespace-nowrap">
              Maison Lumière — Fine Jewelry
            </p>
          </div>

          {/* FIXED: Removed 'overflow-hidden' and added safety rendering space */}
          <h1 className="w-full flex items-center justify-center lg:justify-start relative">
            <TextDisintegrate sequence={customSequence} duration={4500} />
          </h1>

          <p className="mt-5 text-white/70 text-sm sm:text-base md:text-[17px] font-light tracking-wide leading-relaxed max-w-[480px] lg:max-w-[520px]">
            {product?.description
              ? product.description.replace(/<[^>]*>/g, "")
              : "Luxury configurable engagement ring prototype with immersive 3D customization and premium craftsmanship."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mt-8 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 lg:px-9 py-3.5 lg:py-4 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-xs font-medium tracking-[0.25em] lg:tracking-[0.3em] uppercase hover:border-yellow-400/40 hover:bg-white/[0.05] active:scale-95 transition-all duration-500">
              <a href="#ring">Craft Your Story</a>
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 w-full flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-0">
          <div className="w-full h-full max-w-[320px] sm:max-w-[450px] lg:max-w-none">
            <HeroRingViewer />
          </div>
        </div>
      </motion.div>
    </section>
  );
}