// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import useRingStore from "../store/useRingStore";

// const EASE = [0.22, 1, 0.36, 1];

// const METAL_STYLES = {
//   "14k White Gold":
//     "bg-[#cbd3cf] border border-zinc-400/30",

//   "18k White Gold":
//     "bg-[#d1d5db]",

//   "14k Yellow Gold":
//     "bg-[#dfba54]",

//   "18k Yellow Gold":
//     "bg-[#e1b13c]",

//   "14k Rose Gold":
//     "bg-[#B76E79]",

//   "18k Rose Gold":
//     "bg-[#E0A96D]",

//   "Pure Platinum":
//     "bg-[#c4c4c6]",

//   "Palladium Gray":
//     "bg-[#bcbcbc]",
// };

// export default function ConfiguratorPanel({
//   product,
//   cartItems,
//   setCartItems,
// }) {

//   const {
//     metal,
//     stone,
//     setMetal,
//     setStone,
//   } = useRingStore();

//   const [added, setAdded] =
//     useState(false);

//   const [loading, setLoading] =
//     useState(false);

//   /* BACKEND ATTRIBUTES */
//   const metals =
//     product?.attributes?.find(
//       (attr) =>
//         attr.name.toLowerCase() ===
//         "metal"
//     )?.options || [];

//   const stones = product?.attributes
//     ?.find(
//       (attr) =>
//         attr.name ===
//         "Stone"
//     )
//     ?.options || [
//       "Round",
//       "Oval",
//       "Princess",
//       "Emerald",
//       "Pear",
//     ];

//   const currentMetal =
//     metals.find(
//       (m) => m === metal
//     ) || metals[0];

//   const currentStone =
//     stones.find(
//       (s) => s === stone
//     ) || stones[0];


//  const METAL_PRICES = {

//   "14k White Gold": 6200,

//   "18k White Gold": 7100,

//   "14k Yellow Gold": 6400,

//   "18k Yellow Gold": 7600,

//   "14k Rose Gold": 6500,

//   "18k Rose Gold": 7700,

//   "Pure Platinum": 8900,

//   "Palladium Gray": 7200,
// };

// const STONE_PRICES = {

//   round: 0,

//   oval: 300,

//   princess: 450,

//   emerald: 600,

//   pear: 500,
// };

// const total =
//   (METAL_PRICES[
//     currentMetal
//   ] || 6000) +

//   (STONE_PRICES[
//     currentStone?.toLowerCase()
//   ] || 0);

//   const handleAdd = async () => {

//     try {

//       setLoading(true);

//       const cartItem = {

//         productName:
//           product?.name ||
//           "Maison Lumière Ring",

//         metal: currentMetal,

//         stone: currentStone,

//         total,
//       };

//       const existingCart =
//         JSON.parse(
//           localStorage.getItem(
//             "ring-cart"
//           )
//         ) || [];

//       const updatedCart = [
//         ...existingCart,
//         cartItem,
//       ];

//       localStorage.setItem(
//         "ring-cart",
//         JSON.stringify(updatedCart)
//       );

//       setCartItems(updatedCart);

//       setAdded(true);

//       setTimeout(() => {

//         setAdded(false);

//       }, 2200);

//     } catch (error) {

//       console.error(error);

//       alert("Add to cart failed");

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (

//     <motion.aside
//       initial={{
//         opacity: 0,
//         x: 40,
//         filter: "blur(12px)",
//       }}

//       animate={{
//         opacity: 1,
//         x: 0,
//         filter: "blur(0px)",
//       }}

//       transition={{
//         duration: 1.1,
//         ease: EASE,
//       }}

//       className="
//         backdrop-blur-xl
//   bg-white/[0.03]
//   border
//   border-white/10
//   rounded-3xl

//   p-6

//   w-full
  
//   max-w-[440px]

//   xl:max-w-[470px]

//   shadow-2xl
// relative
// z-30
//       "
//     >

      
//       <div className="space-y-1.5">

//         <p className="text-[10px] tracking-[0.4em] uppercase text-yellow-400">

//           Maison Lumière

//         </p>

//         <h2 className="text-2xl md:text-3xl text-white leading-tight">

//           {product?.name ||
//             "Luxury Ring"}

//         </h2>

//         <p className="text-xs text-white/60 leading-relaxed">

//           Crafted for timeless elegance.

//         </p>

//       </div>

//       <div className="h-px bg-white/10 my-4" />

      
//       <div className="space-y-2.5">

//         <div className="flex items-center justify-between">

//           <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">

//             Metal

//           </p>

//           <p className="text-xs italic text-white/80">

//             {currentMetal}

//           </p>

//         </div>

//         <div className="grid grid-cols-4 gap-2.5">

//           {metals.map((m) => {

//             const active =
//               metal === m;

//             return (

//               <button
//                 key={m}

//                 onClick={() =>
//                   setMetal(m)
//                 }

//                 className="
//                   relative
//                   group
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >

//                 <span
//                   className={`
//                     relative
//                     flex
//                     items-center
//                     justify-center
//                     h-9
//                     w-9
//                     md:h-10
//                     md:w-10
//                     rounded-full
//                     transition-all
//                     duration-500

//                     ${METAL_STYLES[
//                     m
//                     ] ||
//                     "bg-zinc-400"
//                     }

//                     ${active
//                       ? "scale-110 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
//                       : "opacity-80 group-hover:scale-105"
//                     }
//                   `}
//                 />

//                 {active && (
//                   <span className="absolute -inset-1 rounded-full border border-yellow-400" />
//                 )}

//               </button>
//             );
//           })}
//         </div>

//       </div>

//       <div className="h-px bg-white/10 my-4" />



  
//       <div className="space-y-2.5">

//         <div className="flex items-center justify-between">

//           <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">

//             Center Stone

//           </p>

//           <p className="text-xs italic text-white/80">

//             {currentStone}

//           </p>

//         </div>

//         <div className="grid grid-cols-3 gap-2">

//           {stones.map((s) => {

//             const normalizedStone =
//               s.toLowerCase();

//             const active =
//               stone.toLowerCase() ===
//               normalizedStone;

//             return (

//               <button
//                 key={s}

//                 onClick={() =>
//                   setStone(
//                     normalizedStone
//                   )
//                 }

//                 className={`
//             rounded-xl
//             border
//             p-2
//             flex
//             flex-col
//             items-center
//             justify-center
//             transition-all
//             duration-500

//             ${active
//                     ? "border-yellow-400 bg-white/[0.06]"
//                     : "border-white/10 bg-white/[0.02]"
//                   }
//           `}
//               >

//                 <div
//                   className={`
//               mb-2
//               ${active
//                       ? "text-yellow-400"
//                       : "text-white/50"
//                     }
//             `}
//                 >

//                   {normalizedStone ===
//                     "round" && (
//                       <div className="w-4 h-4 rounded-full bg-current" />
//                     )}

//                   {normalizedStone ===
//                     "oval" && (
//                       <div className="w-3 h-5 rounded-full bg-current" />
//                     )}

//                   {normalizedStone ===
//                     "princess" && (
//                       <div className="w-4 h-4 bg-current rotate-45" />
//                     )}

//                   {normalizedStone ===
//                     "emerald" && (
//                       <div className="w-5 h-4 border-2 border-current" />
//                     )}

//                   {normalizedStone ===
//                     "pear" && (
//                       <div className="w-4 h-5 bg-current rounded-full rotate-45" />
//                     )}

//                 </div>

//                 <p
//                   className={`
//               text-[10px]
//               uppercase
//               tracking-wider

//               ${active
//                       ? "text-yellow-400"
//                       : "text-white/60"
//                     }
//             `}
//                 >

//                   {s}

//                 </p>

//               </button>
//             );
//           })}

//         </div>

//       </div>

//       <div className="h-px bg-white/10 my-4" />

      
//       <div className="flex items-end justify-between">

//         <div>

//           <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">

//             Total

//           </p>

//           <AnimatePresence mode="wait">

//             <motion.h3
//               key={total}

//               initial={{
//                 opacity: 0,
//                 y: 10,
//               }}

//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}

//               exit={{
//                 opacity: 0,
//                 y: -10,
//               }}

//               transition={{
//                 duration: 0.4,
//               }}

//               className="text-2xl md:text-3xl text-yellow-400 font-light"
//             >

//               ${total.toLocaleString()}

//             </motion.h3>

//           </AnimatePresence>

//         </div>

//       </div>

  
//       <motion.button
//         whileHover={{
//           scale: 1.01,
//         }}

//         whileTap={{
//           scale: 0.99,
//         }}

//         onClick={handleAdd}

//         disabled={loading}

//         className="
//           mt-5
//           w-full
//           rounded-full
//           border
//           border-yellow-400
//           py-3
//           text-xs
//           uppercase
//           tracking-[0.35em]
//           text-white
//           bg-yellow-400/10
//           hover:bg-yellow-400
//           hover:text-black
//           transition-all
//           duration-500
//         "
//       >

//         {loading
//           ? "ADDING..."
//           : added
//             ? "Added To Cart ✦"
//             : "Add To Cart"}

//       </motion.button>

//     </motion.aside>
//   );
// }


import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useRingStore from "../store/useRingStore";

const EASE = [0.22, 1, 0.36, 1];

const METAL_STYLES = {
  "14k White Gold": "bg-[#cbd3cf] border border-zinc-400/30",
  "18k White Gold": "bg-[#d1d5db]",
  "14k Yellow Gold": "bg-[#dfba54]",
  "18k Yellow Gold": "bg-[#e1b13c]",
  "14k Rose Gold": "bg-[#B76E79]",
  "18k Rose Gold": "bg-[#E0A96D]",
  "Pure Platinum": "bg-[#c4c4c6]",
  "Palladium Gray": "bg-[#bcbcbc]",
};

export default function ConfiguratorPanel({
  product,
  cartItems,
  setCartItems,
}) {
  const { metal, stone, setMetal, setStone } = useRingStore();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  /* BACKEND ATTRIBUTES */
  const metals =
    product?.attributes?.find(
      (attr) => attr.name.toLowerCase() === "metal"
    )?.options || [];

  const stones = product?.attributes
    ?.find((attr) => attr.name === "Stone")
    ?.options || ["Round", "Oval", "Princess", "Emerald", "Pear"];

  const currentMetal = metals.find((m) => m === metal) || metals[0];
  const currentStone = stones.find((s) => s === stone) || stones[0];

  const METAL_PRICES = {
    "14k White Gold": 6200,
    "18k White Gold": 7100,
    "14k Yellow Gold": 6400,
    "18k Yellow Gold": 7600,
    "14k Rose Gold": 6500,
    "18k Rose Gold": 7700,
    "Pure Platinum": 8900,
    "Palladium Gray": 7200,
  };

  const STONE_PRICES = {
    round: 0,
    oval: 300,
    princess: 450,
    emerald: 600,
    pear: 500,
  };

  const total =
    (METAL_PRICES[currentMetal] || 6000) +
    (STONE_PRICES[currentStone?.toLowerCase()] || 0);

  const handleAdd = async () => {
    try {
      setLoading(true);
      const cartItem = {
        productName: product?.name || "Maison Lumière Ring",
        metal: currentMetal,
        stone: currentStone,
        total,
      };

      const existingCart =
        JSON.parse(localStorage.getItem("ring-cart")) || [];
      const updatedCart = [...existingCart, cartItem];

      localStorage.setItem("ring-cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2200);
    } catch (error) {
      console.error(error);
      alert("Add to cart failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: 40,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.1,
        ease: EASE,
      }}
      className="
        backdrop-blur-2xl
        bg-[#0a0a0a]/90 
        border
        border-white/5
        rounded-3xl
        p-6
        w-full
        max-w-[440px]
        xl:max-w-[470px]
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]
        relative
        z-30
      "
    >
      <div className="space-y-1.5">
        <p className="text-[10px] tracking-[0.4em] uppercase text-yellow-400">
          Maison Lumière
        </p>
        <h2 className="text-2xl md:text-3xl text-white leading-tight">
          {product?.name || "Luxury Ring"}
        </h2>
        <p className="text-xs text-white/60 leading-relaxed">
          Crafted for timeless elegance.
        </p>
      </div>

      <div className="h-px bg-white/10 my-4" />

      {/* METAL SECTION */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">
            Metal
          </p>
          <p className="text-xs italic text-white/80">{currentMetal}</p>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {metals.map((m) => {
            const active = metal === m;
            return (
              <button
                key={m}
                onClick={() => setMetal(m)}
                className="relative group flex items-center justify-center"
              >
                <span
                  className={`
                    relative
                    flex
                    items-center
                    justify-center
                    h-9
                    w-9
                    md:h-10
                    md:w-10
                    rounded-full
                    transition-all
                    duration-500
                    ${METAL_STYLES[m] || "bg-zinc-400"}
                    ${
                      active
                        ? "scale-110 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                        : "opacity-80 group-hover:scale-105"
                    }
                  `}
                />
                {active && (
                  <span className="absolute -inset-1 rounded-full border border-yellow-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-white/10 my-4" />

      {/* STONE SECTION */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">
            Center Stone
          </p>
          <p className="text-xs italic text-white/80">{currentStone}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {stones.map((s) => {
            const normalizedStone = s.toLowerCase();
            const active = stone.toLowerCase() === normalizedStone;

            return (
              <button
                key={s}
                onClick={() => setStone(normalizedStone)}
                className={`
                  rounded-xl
                  border
                  p-2
                  flex
                  flex-col
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  ${
                    active
                      ? "border-yellow-400 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02]"
                  }
                `}
              >
                <div
                  className={`
                    mb-2
                    ${active ? "text-yellow-400" : "text-white/50"}
                  `}
                >
                  {normalizedStone === "round" && (
                    <div className="w-4 h-4 rounded-full bg-current" />
                  )}
                  {normalizedStone === "oval" && (
                    <div className="w-3 h-5 rounded-full bg-current" />
                  )}
                  {normalizedStone === "princess" && (
                    <div className="w-4 h-4 bg-current rotate-45" />
                  )}
                  {normalizedStone === "emerald" && (
                    <div className="w-5 h-4 border-2 border-current" />
                  )}
                  {normalizedStone === "pear" && (
                    <div className="w-4 h-5 bg-current rounded-full rotate-45" />
                  )}
                </div>
                <p
                  className={`
                    text-[10px]
                    uppercase
                    tracking-wider
                    ${active ? "text-yellow-400" : "text-white/60"}
                  `}
                >
                  {s}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-white/10 my-4" />

      {/* PRICING SECTION */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.32em] uppercase text-white/50">
            Total
          </p>
          <AnimatePresence mode="wait">
            <motion.h3
              key={total}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl text-yellow-400 font-light"
            >
              ${total.toLocaleString()}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleAdd}
        disabled={loading}
        className="
          mt-5
          w-full
          rounded-full
          border
          border-yellow-400
          py-3
          text-xs
          uppercase
          tracking-[0.35em]
          text-white
          bg-yellow-400/10
          hover:bg-yellow-400
          hover:text-black
          transition-all
          duration-500
        "
      >
        {loading ? "ADDING..." : added ? "Added To Cart ✦" : "Add To Cart"}
      </motion.button>
    </motion.aside>
  );
}