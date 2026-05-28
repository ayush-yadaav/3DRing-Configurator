import { motion } from "framer-motion";

export default function Navbar({ cartItemsCount, onCartOpen, ease }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: ease }}
      className="fixed top-0 left-0 right-0 z-50 px-5 lg:px-14 py-5 lg:py-7 flex items-center justify-between backdrop-blur-md"
    >
     
      <div className="flex items-baseline gap-2">
        <span className="text-xl lg:text-2xl tracking-wide">Maison</span>
        <span className="italic text-xl lg:text-2xl text-yellow-400">Lumière</span>
      </div>

      
      <button
        onClick={onCartOpen}
        className="text-[10px] lg:text-[11px] tracking-[0.32em] uppercase"
      >
        Cart ({cartItemsCount})
      </button>
    </motion.header>
  );
}

