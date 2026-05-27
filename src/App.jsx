import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

import { getProducts } from "./lib/woocommerce";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ConfiguratorPanel from "./components/ConfiguratorPanel";
import CartDrawer from "./components/CartDrawer";

const RingViewer = lazy(() => import("./components/RingViewer"));
const EASE = [0.22, 1, 0.36, 1];

export default function App() {
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  /* SMOOTH SCROLL */
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
  }, []);

  /* PRODUCTS FETCH */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        console.log("WooCommerce Products:", data);
        if (data?.length > 0) {
          setProduct(data[0]);
        }
      } catch (error) {

        console.error(error);

        /* if api fall so hardcoded PRODUCT */
        setProduct({

          name: "Filigree Solitaire",

          description:
            "Luxury configurable engagement ring prototype with live 3D customization.",

          prices: {
            price: 6000,
          },

          attributes: [

            {
              name: "Metal",

              options: [
                "14k White Gold",
                "18k White Gold",
                "14k Yellow Gold",
                "18k Yellow Gold",
                "Rose Gold",
                "Platinum",
              ],
            },

            {
              name: "Stone",

              options: [
                "Round",
                "Oval",
                "Princess",
                "Emerald",
                "Pear",
              ],
            },
          ],
        });

      }
    }
    loadProducts();
  }, []);

  
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



     
      <section className="relative min-h-screen bg-[#050505] overflow-hidden">

        
        <div className="absolute inset-0 bg-[#050505]" />

       
        <div
          className="
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2

      w-[700px]
      h-[700px]

      rounded-full

      bg-yellow-400/5

      blur-[180px]
    "
        />

        
        <div
          className="
      relative
      z-20

      min-h-screen

      flex
      flex-col
      lg:flex-row

      items-center
      justify-between

      gap-8

      px-4
      md:px-10
      xl:px-20
    "
        >


          {/* LEFT SIDE — 3D RING */}
          <div
            className="
    relative

    w-full
    lg:w-[58%]

    h-[55vh]
    md:h-[70vh]
    lg:h-screen

    flex
    items-center
    justify-center

    lg:pl-10
    xl:pl-16
  "
          >

            
            <div
              className="
      absolute

      top-1/2
      left-1/2

      -translate-x-1/2
      -translate-y-1/2

      w-[420px]
      h-[420px]

      md:w-[520px]
      md:h-[520px]

      rounded-full

      bg-yellow-400/10

      blur-[120px]

      pointer-events-none
    "
            />

            <div className="w-full h-full">

              <Suspense fallback={<LoadingShimmer />}>

                <RingViewer />

              </Suspense>

            </div>

          </div>

       
          <div
            className="
        relative

        w-full
        lg:w-[42%]

        flex
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

       
        <div
          className="
      pointer-events-none
      absolute
      inset-0
      z-10
      hidden
      md:block
    "
          style={{
            background:
              "radial-gradient(circle at center, transparent 30%, rgba(5,5,5,0.65) 100%)",
          }}
        />

       
        <div
          className="
      md:hidden
      relative
      z-20
      px-4
      pb-10
      -mt-4
    "
        >

          <div
            className="
        rounded-[28px]
        border
        border-white/10
        bg-black/70
        backdrop-blur-2xl
        p-3
      "
          >

            <ConfiguratorPanel
              product={product}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />

          </div>

        </div>

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
        className="italic text-yellow-400 text-xl tracking-widest"
      >
        crafting your ring…
      </motion.div>
    </div>
  );
}

