import { motion } from "framer-motion";

export default function HeroRingViewer() {
  const ringImagePng = "/ring1.png"; 

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      
      {/* Background Glow */}
      <div className="absolute w-[75%] h-[75%] bg-yellow-400/15 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse duration-[5000ms]" />

      {/* 🚀 Image Container Size Increased here */}
      <motion.div
        className="relative w-full h-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] aspect-square flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: 0 
        }}
        transition={{ 
          duration: 1.6, 
          ease: [0.16, 1, 0.3, 1], 
          delay: 0.3 
        }}
      >
        
        <motion.img
          src={ringImagePng}
          alt="Maison Lumière Premium Ring"
          className="w-full h-full object-contain filter drop-shadow-[0_35px_70px_rgba(253,224,71,0.22)]"
          style={{ transformOrigin: "center bottom" }}
          animate={{
            y: [0, -12, 0], 
            rotate: [0, 2, -2, 0], 
          }}
          transition={{
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🕳️ Realism Shadow under the ring (Adjusted width for larger image) */}
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-[15px] bg-black/50 rounded-full blur-md"
          animate={{
            scale: [1, 0.88, 1],
            opacity: [0.6, 0.35, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}