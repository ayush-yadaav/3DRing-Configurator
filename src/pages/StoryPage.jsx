import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";

function LuxuryRing() {
  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[1.2, 0.22, 32, 200]} />

        <meshPhysicalMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>

      {/* Diamond */}
      <mesh position={[0, 1.1, 0]}>
        <octahedronGeometry args={[0.45]} />

        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          roughness={0}
          thickness={1}
          ior={2.4}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

export default function StorySection() {

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [0, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.7, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden"
    >

      {/* HERO */}
      <div className="h-screen flex flex-col items-center justify-center relative">

        {/* Background Glow */}
        <div className="absolute w-[700px] h-[700px] bg-yellow-500/10 blur-[160px] rounded-full" />

        <motion.div
          style={{ opacity, scale }}
          className="z-10 text-center px-6"
        >
          <p className="uppercase tracking-[0.4em] text-sm text-[#c1a055] mb-6">
            Maison Lumière
          </p>

          <h1 className="text-5xl md:text-8xl font-light leading-tight">
            Every Ring <br />
            Begins As A <span className="italic text-[#c1a055]">Story</span>
          </h1>

          <p className="mt-8 text-neutral-400 max-w-2xl mx-auto text-lg">
            Crafted from emotion, refined with precision,
            designed to last forever.
          </p>
        </motion.div>

        {/* 3D Ring */}
        <div className="absolute inset-0">

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>

            <ambientLight intensity={1.5} />

            <directionalLight
              position={[5, 5, 5]}
              intensity={2}
            />

            <Suspense fallback={null}>

              <Environment preset="city" />

              <LuxuryRing />

            </Suspense>

            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1}
            />

          </Canvas>
        </div>
      </div>

      {/* STORY BLOCK 1 */}
      <motion.div
        style={{ y }}
        className="min-h-screen flex items-center justify-center px-6 py-32 relative"
      >

        <div className="max-w-6xl grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="uppercase tracking-[0.3em] text-[#c1a055] text-sm mb-5">
              The Beginning
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">
              Born Under <br />
              Pressure.
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed">
              Every diamond begins deep within the earth —
              shaped over millions of years under immense
              pressure and heat.
            </p>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >

            <div className="absolute inset-0 bg-yellow-500/10 blur-[120px] rounded-full" />

            <img
              src="/rings/ring0.2.png"
              alt="Diamond"
              className="relative z-10 w-full object-contain"
            />

          </motion.div>

        </div>
      </motion.div>

      {/* STORY BLOCK 2 */}
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6 py-32 relative overflow-hidden">

        {/* Animated Background */}
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[800px] border border-[#c1a055]/10 rounded-full"
        />

        <div className="max-w-6xl grid lg:grid-cols-2 gap-20 items-center relative z-10">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <img
              src="/rings/ring4.png"
              alt="Craftsmanship"
              className="w-full object-contain"
            />

          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="uppercase tracking-[0.3em] text-[#c1a055] text-sm mb-5">
              Craftsmanship
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">
              Crafted With <br />
              Precision.
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed">
              Every curve, every reflection, every detail is
              handcrafted to create a timeless symbol of love.
            </p>

          </motion.div>

        </div>
      </div>

      {/* QUOTE SECTION */}
      <div className="relative py-40 px-6 text-center overflow-hidden">

        <motion.div
          animate={{
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c1a055]/10 to-transparent"
        />

        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-7xl font-light leading-tight relative z-10"
        >
          “Luxury is emotion <br />
          made tangible.”
        </motion.h2>

      </div>

      {/* FINAL REVEAL */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#c1a055]/20 blur-[140px] rounded-full" />

        {/* Ring Image */}
        <motion.img
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: -20
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0
          }}
          transition={{
            duration: 1.5
          }}
          src="/rings/ring6.png"
          alt="Luxury Ring"
          className="w-[300px] md:w-[500px] relative z-10"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mt-16 relative z-10 px-6"
        >

          <p className="uppercase tracking-[0.3em] text-[#c1a055] text-sm mb-5">
            Forever Starts Here
          </p>

          <h2 className="text-5xl md:text-8xl font-light leading-tight">
            Made For <br />
            Moments That <br />
            Last Forever.
          </h2>

          <button className="mt-10 px-10 py-5 border border-[#c1a055] text-[#c1a055] uppercase tracking-[0.3em] text-sm hover:bg-[#c1a055] hover:text-black transition-all duration-500 rounded-full">
            Explore Collection
          </button>

        </motion.div>
      </div>
    </section>
  );
}