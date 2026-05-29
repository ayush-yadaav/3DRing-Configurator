import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
          
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="
              relative 
              z-10 
              w-full 
              sm:w-[440px] 
              h-full 
              bg-[#0a0a0a] 
              border-l 
              border-white/5 
              p-6 
              md:p-8 
              flex 
              flex-col 
              shadow-[[-20px_0_50px_rgba(0,0,0,0.8)]]
            "
          >
           
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div>
                <h2 className="text-xl font-light tracking-widest uppercase text-white">Your Cart</h2>
                <p className="text-[10px] text-white/40 tracking-wider uppercase mt-1">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} Selected
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                ✕
              </button>
            </div>

            
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
              <style dangerouslySetInnerHTML={{__html: `
                .scrollbar-none::-webkit-scrollbar { display: none; }
              `}} />

              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                  <span className="text-3xl">✨</span>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">Your cart is empty</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="
                        relative 
                        group 
                        border 
                        border-white/5 
                        rounded-2xl 
                        p-5 
                        bg-[#0e0e0e]/60 
                        backdrop-blur-md
                        hover:border-white/10 
                        transition-all 
                        duration-500
                      "
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-light tracking-wide text-white">{item.productName}</h3>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-[10px] uppercase tracking-widest text-red-400/70 hover:text-red-400 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 space-y-1 text-xs text-white/50 font-mono">
                        <p><span className="text-white/30 uppercase tracking-wider text-[10px] inline-block w-14">Metal:</span> {item.metal}</p>
                        <p><span className="text-white/30 uppercase tracking-wider text-[10px] inline-block w-14">Stone:</span> {item.stone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-baseline">
                        <span className="text-[10px] uppercase tracking-wider text-white/30">Subtotal</span>
                        <p className="text-yellow-400 text-base font-light font-mono">
                          ${item.total?.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

           
            {cartItems.length > 0 && (
              <div className="pt-6 border-t border-white/5 mt-auto space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">Est. Total</span>
                  <span className="text-xl text-yellow-400 font-light font-mono">
                    ${cartItems.reduce((acc, curr) => acc + (curr.total || 0), 0).toLocaleString()}
                  </span>
                </div>
                <button className="w-full py-4 bg-yellow-400 text-black text-xs font-semibold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-lg shadow-yellow-400/5">
                  Proceed To Checkout
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}