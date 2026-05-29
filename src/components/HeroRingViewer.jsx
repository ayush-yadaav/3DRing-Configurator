import { motion } from "framer-motion";

export default function HeroRingViewer() {
  const ringImagePng = "/ring2.png";

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none">

      
      <motion.div
        className="
          relative
          w-full
          h-full
          max-w-[340px]
          sm:max-w-[460px]
          lg:max-w-[560px]
          aspect-square
          flex
          items-center
          justify-center
        "

        
        initial={{
          y: 550,
          opacity: 0,
          scale: 0.35,
          rotate: -20,
        }}

        
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}

        transition={{
          duration: 2.2,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >

        
        <motion.img
          src={ringImagePng}
          alt="Maison Lumière Premium Ring"
          className="
            relative
            z-10
            w-full
            h-full
            object-contain
            drop-shadow-[0_40px_80px_rgba(212,175,55,0.25)]
          "
          style={{
            transformOrigin: "center bottom",
          }}

         
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1.2, -1.2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.1,
          }}
        />

       
        <motion.div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            w-[58%]
            h-[18px]
            rounded-full
            bg-black/35
            blur-xl
          "
          animate={{
            scale: [1, 0.82, 1],
            opacity: [0.45, 0.22, 0.45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.1,
          }}
        />

      </motion.div>
    </div>
  );
}