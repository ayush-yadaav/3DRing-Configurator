// import { lazy, Suspense, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Lenis from "lenis";

// import { getProducts } from "./lib/woocommerce";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import ConfiguratorPanel from "./components/ConfiguratorPanel";
// import CartDrawer from "./components/CartDrawer";
// import Catalog from "./components/Catalog";

// const RingViewer = lazy(() => import("./components/RingViewer"));
// const EASE = [0.22, 1, 0.36, 1];

// export default function App() {
//   const [product, setProduct] = useState(null);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   /* SMOOTH SCROLL */
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       smoothWheel: true,
//     });
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//   }, []);

//   /* PRODUCTS FETCH */
//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const data = await getProducts();
//         console.log("WooCommerce Products:", data);
//         if (data?.length > 0) {
//           setProduct(data[0]);
//         }
//       } catch (error) {

//         console.error(error);

//         /* if api fall so hardcoded PRODUCT */
//         setProduct({

//           name: "Filigree Solitaire",

//           description:
//             "Luxury configurable engagement ring prototype with live 3D customization.",

//           prices: {
//             price: 6000,
//           },

//           attributes: [

//             {
//               name: "Metal",

//               options: [
//                 "14k White Gold",
//                 "18k White Gold",
//                 "14k Yellow Gold",
//                 "18k Yellow Gold",
//                 "14k Rose Gold",  // 👈 Ye add karein
//                 "18k Rose Gold",
//                 // "Rose Gold",,
//               ],
//             },

//             {
//               name: "Stone",

//               options: [
//                 "Round",
//                 "Oval",
//                 "Princess",
//                 "Emerald",
//                 "Pear",
//               ],
//             },
//           ],
//         });

//       }
//     }
//     loadProducts();
//   }, []);


//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("ring-cart")) || [];
//     setCartItems(savedCart);
//   }, []);


//   const handleRemoveItem = (indexToRemove) => {
//     const updated = cartItems.filter((_, i) => i !== indexToRemove);
//     setCartItems(updated);
//     localStorage.setItem("ring-cart", JSON.stringify(updated));
//   };



//   return (
//     <main className="bg-[#050505] text-white overflow-x-hidden">


//       <Navbar
//         cartItemsCount={cartItems.length}
//         onCartOpen={() => setCartOpen(true)}
//         ease={EASE}
//       />


//       <Hero product={product} ease={EASE} />




//       <section className="relative min-h-screen bg-[#050505] overflow-hidden">


//         <div className="absolute inset-0 bg-[#050505]" />


//         <div
//           className="
//       absolute
//       top-1/2
//       left-1/2
//       -translate-x-1/2
//       -translate-y-1/2

//       w-[700px]
//       h-[700px]

//       rounded-full

//       bg-yellow-400/5

//       blur-[180px]
//     "
//         />


//         <div
//           className="
//       relative
//       z-20

//       min-h-screen

//       flex
//       flex-col
//       lg:flex-row

//       items-center
//       justify-between

//       gap-8

//       px-4
//       md:px-10
//       xl:px-20
//     "
//         >


//           {/* LEFT SIDE — 3D RING */}
//           <div
//             className="
//     relative

//     w-full
//     lg:w-[65%]

//    h-[70vh]
// md:h-[85vh]
// lg:h-screen

//     flex
//     items-center
//     justify-center
//     lg:pl-10
//     xl:pl-16
//   "
//           >


//             <div
//               className="
//       absolute

//       top-1/2
//       left-1/2

//       -translate-x-1/2
//       -translate-y-1/2

//       w-[420px]
//       h-[420px]

//       md:w-[520px]
//       md:h-[520px]

//       rounded-full

//       bg-yellow-400/10

//       blur-[120px]

//       pointer-events-none
//     "
//             />

//             <div className="w-full h-full">

//               <Suspense fallback={<LoadingShimmer />}>

//                 <RingViewer />

//               </Suspense>

//             </div>

//           </div>


//           <div
//             className="
//         relative

//         w-full
//         lg:w-[42%]

//         flex
//         justify-center
//         lg:justify-end

//         lg:pr-8
//       "
//           >

//             <ConfiguratorPanel
//               product={product}
//               cartItems={cartItems}
//               setCartItems={setCartItems}
//             />

//           </div>

//         </div>


//         <div
//           className="
//       pointer-events-none
//       absolute
//       inset-0
//       z-10
//       hidden
//       md:block
//     "
//           style={{
//             background:
//               "radial-gradient(circle at center, transparent 30%, rgba(5,5,5,0.65) 100%)",
//           }}
//         />


//         <div
//           className="
//       md:hidden
//       relative
//       z-20
//       px-4
//       pb-10
//       -mt-4
//     "
//         >

//           <div
//             className="
//         rounded-[28px]
//         border
//         border-white/10
//         bg-black/70
//         backdrop-blur-2xl
//         p-3
//       "
//           >

//             <ConfiguratorPanel
//               product={product}
//               cartItems={cartItems}
//               setCartItems={setCartItems}
//             />

//           </div>

//         </div>

//       </section>

//       <section className="relative min-h-screen bg-[#050505] overflow-hidden" >

//         <Catalog
//           cartItems={cartItems}
//           setCartItems={setCartItems}
//           onCartOpen={() => setCartOpen(true)}
//         />
//       </section>



//       <CartDrawer
//         isOpen={cartOpen}
//         onClose={() => setCartOpen(false)}
//         cartItems={cartItems}
//         onRemoveItem={handleRemoveItem}
//       />

//     </main>
//   );
// }

// function LoadingShimmer() {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center">
//       <motion.div
//         animate={{ opacity: [0.3, 0.8, 0.3] }}
//         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         className="italic text-yellow-400 text-xl tracking-widest"
//       >
//         crafting your ring…
//       </motion.div>
//     </div>
//   );
// }



import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

import { getProducts } from "./lib/woocommerce";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ConfiguratorPanel from "./components/ConfiguratorPanel";
import CartDrawer from "./components/CartDrawer";
import Catalog from "./components/Catalog";

const RingViewer = lazy(() => import("./components/RingViewer"));
const EASE = [0.22, 1, 0.36, 1];

export default function App() {
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  /* SMOOTH SCROLL (LENIS ENGINE) */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* PRODUCTS FETCH */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        if (data?.length > 0) {
          setProduct(data[0]);
        }
      } catch (error) {
        console.error(error);
        setProduct({
          name: "Filigree Solitaire",
          description: "Luxury configurable engagement ring prototype with live 3D customization.",
          prices: { price: 6000 },
          attributes: [
            {
              name: "Metal",
              options: [
                "14k White Gold",
                "18k White Gold",
                "14k Yellow Gold",
                "18k Yellow Gold",
                "14k Rose Gold",
                "18k Rose Gold",
              ],
            },
            {
              name: "Stone",
              options: ["Round", "Oval", "Princess", "Emerald", "Pear"],
            },
          ],
        });
      }
    }
    loadProducts();
  }, []);

  /* LOCALSTORAGE SYNC */
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("ring-cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (indexToRemove) => {
    const updated = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updated);
    localStorage.setItem("ring-cart", JSON.stringify(updated));
  };

  return (
    <main className="bg-[#050505] text-white overflow-x-hidden">
      
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => setCartOpen(true)}
        ease={EASE}
      />

      <Hero product={product} ease={EASE} />

      {/* --- LIVE 3D CUSTOMIZER STAGE --- */}
      <section className="relative min-h-screen lg:min-h-0 lg:h-screen bg-[#050505] overflow-hidden flex flex-col justify-center pb-6 lg:pb-0">
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Global ambient aura reflection */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-400/5 blur-[150px]" />

        {/* --- MAIN INTERACTION LAYOUT --- */}
        <div
          className="
            relative
            z-20
            w-full
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-1
            lg:gap-8
            px-4
            md:px-10
            xl:px-20
            lg:h-full
          "
        >
          {/* LEFT SIDE — 3D RING CANVAS INTERACTOR */}
          {/* FIX: h-[42vh] se badal kar perfectly balanced h-[52vh] kiya hai taaki ring badi dikhe */}
          <div
            className="
              relative
              w-full
              lg:w-[65%]
              h-[52vh]
              md:h-[55vh]
              lg:h-[85vh]
              flex
              items-center
              justify-center
              lg:pl-10
              xl:pl-16
            "
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[520px] md:h-[520px] rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />
            <div className="w-full h-full flex items-center justify-center">
              <Suspense fallback={<LoadingShimmer />}>
                <RingViewer />
              </Suspense>
            </div>
          </div>

          {/* RIGHT SIDE — DESKTOP CONFIGURATOR PANEL */}
          <div
            className="
              relative
              w-full
              lg:w-[42%]
              hidden
              lg:flex
              justify-center
              lg:justify-end
              lg:pr-8
            "
          >
            <ConfiguratorPanel
              product={product}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
        </div>

        {/* Vignette effect layer */}
        <div
          className="pointer-events-none absolute inset-0 z-10 hidden md:block"
          style={{
            background: "radial-gradient(circle at center, transparent 30%, rgba(5,5,5,0.65) 100%)",
          }}
        />

        {/* MOBILE VIEW — BOTTOM SHEET PANEL CONTAINER */}
        <div
          className="
            lg:hidden
            relative
            z-20
            px-4
            w-full
            max-w-[440px]
            mx-auto
            mt-1
          "
        >
          <div className="rounded-[28px] border border-white/5 bg-black/60 backdrop-blur-3xl p-1 shadow-[0_-15px_30px_rgba(0,0,0,0.8)]">
            <ConfiguratorPanel
              product={product}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
        </div>
      </section>

      {/* --- THE BESPOKE CATALOG MARKETPLACE --- */}
      <section className="relative min-h-screen bg-[#050505] overflow-hidden">
        <Catalog
          cartItems={cartItems}
          setCartItems={setCartItems}
          onCartOpen={() => setCartOpen(true)}
        />
      </section>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  );
}

function LoadingShimmer() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="italic text-yellow-400 text-base tracking-widest"
      >
        crafting your ring…
      </motion.div>
    </div>
  );
}