// import { motion } from "framer-motion";

// export default function HeroRingViewer() {

//   const ringImagePng = "/ring2.png";

//   return (
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none">

//       {/* ✨ PREMIUM GOLD AMBIENT GLOW */}
//       <motion.div
//         className="
//           absolute
//           w-[80%]
//           h-[80%]
//           rounded-full
//           blur-[120px]
//           bg-gradient-to-br
//           from-[#D4AF37]/20
//           via-[#F4E2B8]/10
//           to-transparent
//         "
//         animate={{
//           opacity: [0.45, 0.7, 0.45],
//           scale: [1, 1.06, 1],
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* ✨ SECONDARY SOFT LIGHT */}
//       <div className="
//         absolute
//         inset-0
//         bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_65%)]
//       " />

//       {/* 💍 RING POP-UP CONTAINER */}
//       <motion.div

//         className="
//           relative
//           w-full
//           h-full
//           max-w-[340px]
//           sm:max-w-[460px]
//           lg:max-w-[560px]
//           aspect-square
//           flex
//           items-center
//           justify-center
//         "

//         /* 👇 BELOW BOX */
//         initial={{
//           y: 550,
//           opacity: 0,
//           scale: 0.35,
//           rotate: -20,
//         }}

//         /* 👇 POP TO CENTER */
//         animate={{
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           rotate: 0,
//         }}

//         transition={{
//           duration: 2.2,
//           delay: 0.15,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//       >

//         {/* ✨ GOLD LIGHT BEHIND RING */}
//         <motion.div
//           className="
//             absolute
//             w-[60%]
//             h-[60%]
//             rounded-full
//             bg-[#D4AF37]/15
//             blur-[80px]
//           "
//           animate={{
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         {/* 💎 MAIN RING IMAGE */}
//         <motion.img
//           src={ringImagePng}
//           alt="Maison Lumière Premium Ring"

//           className="
//             relative
//             z-10
//             w-full
//             h-full
//             object-contain
//             drop-shadow-[0_40px_80px_rgba(212,175,55,0.25)]
//           "

//           style={{
//             transformOrigin: "center bottom",
//           }}

//           /* ✨ FLOATING EFFECT */
//           animate={{
//             y: [0, -12, 0],
//             rotate: [0, 1.2, -1.2, 0],
//           }}

//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2.1,
//           }}
//         />

//         {/* 🌑 PREMIUM SHADOW */}
//         <motion.div
//           className="
//             absolute
//             bottom-8
//             left-1/2
//             -translate-x-1/2
//             w-[58%]
//             h-[18px]
//             rounded-full
//             bg-black/35
//             blur-xl
//           "

//           animate={{
//             scale: [1, 0.82, 1],
//             opacity: [0.45, 0.22, 0.45],
//           }}

//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2.1,
//           }}
//         />

//       </motion.div>
//     </div>
//   );
// }

import { motion } from "framer-motion";

export default function HeroRingViewer() {
  const ringImagePng = "/ring2.png";

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none">

      {/* 💍 RING POP-UP CONTAINER */}
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

        /* 👇 BELOW BOX */
        initial={{
          y: 550,
          opacity: 0,
          scale: 0.35,
          rotate: -20,
        }}

        /* 👇 POP TO CENTER */
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

        {/* 💎 MAIN RING IMAGE */}
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

          /* ✨ FLOATING EFFECT */
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

        {/* 🌑 PREMIUM SHADOW */}
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