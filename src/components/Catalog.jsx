import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Saare combinations ka final static data
// const catalogCombinations = [

//   {
//     id: "filigree-round-white",
//     name: "Filigree Solitaire",
//     shape: "Cushion",
//     metal: "18k Rose Gold",
//     price: 6250,
//     displayPrice: "$6,250",
//     image: "/rings/ring0.2.png",
//   },
//   {
//     id: "filigree-oval-yellow",
//     name: "Filigree Solitaire",
//     shape: "Cushion",
//     metal: "Brushed Black Titanium",
//     price: 6400,
//     displayPrice: "$6,400",
//     image: "/rings/ring3.png",
//   },

//   {
//     id: "filigree-princess-yellow",
//     name: "Filigree Solitaire",
//     shape: "Marquise ",
//     metal: "Champagne Gold",
//     price: 6300,
//     displayPrice: "$6,300",
//     image: "/rings/ring4.png",
//   },
//   {
//     id: "filigree-princess-white",
//     name: "Filigree Solitaire",
//     shape: "Marquise",
//     metal: "White Tungsten ",
//     price: 6350,
//     displayPrice: "$6,350",
//     image: "/rings/ring5.png",
//   },
//   {
//     id: "filigree-oval-white",
//     name: "Filigree Solitaire",
//     shape: "radiant ",
//     metal: "Rose Gold",
//     price: 6450,
//     displayPrice: "$6,450",
//     image: "/rings/ring6.png",
//   },
//   {
//     id: "filigree-pear-yellow",
//     name: "Filigree Solitaire",
//     shape: "Asscher ",
//     metal: "Hammered White Gold",
//     price: 6500,
//     displayPrice: "$6,500",
//     image: "/rings/ring7.png",
//   },
//   {
//     id: "filigree-pear-white",
//     name: "Filigree Solitaire",
//     shape: "Asscher",
//     metal: "Brushed Rose Gold Gold",
//     price: 6550,
//     displayPrice: "$6,550",
//     image: "/rings/ring8.png",
//   },
//   {
//     id: "filigree-round-yellow",
//     name: "Filigree Solitaire",
//     shape: "Asscher",
//     metal: "Satin-Finish Yellow  Gold",
//     price: 6200, 
//     displayPrice: "$6,200",
//     image: "/rings/ring9.png",
//   }
// ];

const catalogCombinations = [
  {
    id: "cushion-rose-gold-18k",
    name: "Cushion Cut 18k Rose Gold Solitaire",
    shape: "Cushion",
    metal: "18k Rose Gold",
    price: 6250,
    displayPrice: "$6,250",
    image: "/rings/ring0.2.png",
  },
  {
    id: "cushion-brushed-black-titanium",
    name: "Cushion Cut Brushed Black Titanium Solitaire",
    shape: "Cushion",
    metal: "Brushed Black Titanium",
    price: 6400,
    displayPrice: "$6,400",
    image: "/rings/ring3.png",
  },
  {
    id: "marquise-champagne-gold",
    name: "Marquise Cut Champagne Gold Solitaire",
    shape: "Marquise",
    metal: "Champagne Gold",
    price: 6300,
    displayPrice: "$6,300",
    image: "/rings/ring4.png",
  },
  {
    id: "marquise-white-tungsten",
    name: "Marquise Cut White Tungsten Solitaire",
    shape: "Marquise",
    metal: "White Tungsten",
    price: 6350,
    displayPrice: "$6,350",
    image: "/rings/ring5.png",
  },
  {
    id: "radiant-rose-gold",
    name: "Radiant Cut Rose Gold Solitaire",
    shape: "Radiant",
    metal: "Rose Gold",
    price: 6450,
    displayPrice: "$6,450",
    image: "/rings/ring6.png",
  },
  {
    id: "asscher-hammered-white-gold",
    name: "Asscher Cut Hammered White Gold Solitaire",
    shape: "Asscher",
    metal: "Hammered White Gold",
    price: 6500,
    displayPrice: "$6,500",
    image: "/rings/ring7.png",
  },
  {
    id: "asscher-brushed-rose-gold",
    name: "Asscher Cut Brushed Rose Gold Solitaire",
    shape: "Asscher",
    metal: "Brushed Rose Gold",
    price: 6550,
    displayPrice: "$6,550",
    image: "/rings/ring8.png",
  },
  {
    id: "asscher-satin-finish-yellow-gold",
    name: "Asscher Cut Satin-Finish Yellow Gold Solitaire",
    shape: "Asscher",
    metal: "Satin-Finish Yellow Gold",
    price: 6200,
    displayPrice: "$6,200",
    image: "/rings/ring9.png",
  }
];

// App.jsx se cart state aur control pass ho raha h
export default function Catalog({ cartItems, setCartItems, onCartOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Card click context setter
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  // ADD TO CART FUNCTIONALITY
  // const handleAddToCart = () => {
  //   if (!selectedItem) return;

  //   // 1. Ek standardized format taiyar karo jo tumhare CartDrawer se match karta ho
  //   const itemToAdd = {
  //     id: `${selectedItem.id}-${Date.now()}`, // Unique timestamp taaki duplicate item handler break na ho
  //     name: selectedItem.name,
  //     price: selectedItem.price,
  //     displayPrice: selectedItem.displayPrice,
  //     image: selectedItem.image,
  //     // Metadata fields
  //     selectedMetal: selectedItem.metal,
  //     selectedStone: selectedItem.shape,
  //     quantity: 1
  //   };

  //   // 2. Local state update karo
  //   const updatedCart = [...cartItems, itemToAdd];
  //   setCartItems(updatedCart);

  //   // 3. Sync directly with LocalStorage taaki refresh par save rahe
  //   localStorage.setItem("ring-cart", JSON.stringify(updatedCart));

  //   // 4. Close the modal view layer and slide open the Cart Drawer sheet
  //   setIsOpen(false);
  //   onCartOpen();
  // };

  // ADD TO CART FUNCTIONALITY
  const handleAddToCart = () => {
    if (!selectedItem) return;

    // CartDrawer ke render variables se keys ko exact map kar diya
    const itemToAdd = {
      id: `${selectedItem.id}-${Date.now()}`, // Unique index tracker
      productName: selectedItem.name,         // Match with: {item.productName}
      metal: selectedItem.metal,               // Match with: {item.metal}
      stone: selectedItem.shape,               // Match with: {item.stone}
      carat: "1.00 ct",                        // Match with: {item.carat} (Default static metadata)
      total: selectedItem.price,               // Match with: ${item.total} (Number value direct use)
      image: selectedItem.image                // Backup for thumbnail views
    };

    // App state controller update logic
    const updatedCart = [...cartItems, itemToAdd];
    setCartItems(updatedCart);

    // Synchronize direct with LocalStorage
    localStorage.setItem("ring-cart", JSON.stringify(updatedCart));

    // UI sheet viewport toggles
    setIsOpen(false); // Details layout popup close karo
    onCartOpen();     // Cart side drawer sheet slide open karo
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12 md:px-12 relative">

    
      {/* Title */}
      <div className="text-center mb-16">
        <p className="text-[#c1a055] text-xs tracking-widest uppercase mb-2">Maison Lumière — Collections</p>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide">
          Our Bespoke <span className="italic text-[#c1a055]">Combinations</span>
        </h1>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {catalogCombinations.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group bg-[#111111] border border-neutral-800 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#c1a055] hover:shadow-[0_0_20px_rgba(193,160,85,0.08)]"
          >
            {/* Image Wrapper */}
            <div className="w-full h-64 overflow-hidden rounded-lg bg-neutral-900/50 flex items-center justify-center mb-5 relative">
              <img
                src={item.image}
                alt={`${item.name} - ${item.shape}`}
                className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300?text=Ring+Image";
                }}
              />
            </div>

            {/* Info details */}
            <div className="space-y-1 px-1">
              <h3 className="text-lg font-medium tracking-wide group-hover:text-[#c1a055] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-neutral-400">
                {item.shape} Cut • {item.metal}
              </p>
              <div className="flex justify-between items-center pt-3 border-t border-neutral-900 mt-2">
                <span className="text-[#c1a055] font-medium">{item.displayPrice}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">
                  View Details <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* deatil view section */}
      <AnimatePresence>
        {isOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto flex items-center justify-center p-4 md:p-10"
          >
            {/* Close Trigger Action */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-xs font-mono tracking-widest text-neutral-400 hover:text-[#c1a055] transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
              ✕ CLOSE DETAILS
            </button>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">

              {/* Left Side: Premium Animated 3D Showcase Image */}
              <div className="lg:col-span-7 h-[400px] lg:h-[550px] w-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900/20 to-transparent border border-neutral-800/40">
                <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

                {/* Framer-Motion Linear Float/Spin Animation Layer */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full p-8 flex items-center justify-center"
                >
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_15px_50px_rgba(193,160,85,0.15)]"
                  />
                </motion.div>
              </div>

              {/* Right Side: Clean Fixed Specifications Layout */}
              <div className="lg:col-span-5 bg-[#111111] border border-neutral-800 rounded-2xl p-8 space-y-6 shadow-2xl">
                <div>
                  <p className="text-[#c1a055] text-xs tracking-widest uppercase mb-1">Maison Lumière</p>
                  <h1 className="text-3xl font-light tracking-wide">{selectedItem.name}</h1>
                </div>

                <hr className="border-neutral-800" />

                {/* Specs List Block */}
                <div className="space-y-4 font-light text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">Metal Quality</span>
                    <span className="text-neutral-200 font-medium">{selectedItem.metal}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">Center Stone Shape</span>
                    <span className="text-neutral-200 font-medium">{selectedItem.shape} Cut</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">Collection</span>
                    <span className="text-neutral-200 font-medium">Bespoke Solitaire</span>
                  </div>
                </div>

                {/* Pricing & CTA Sheet */}
                <div className="pt-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Price</span>
                    <span className="text-3xl font-semibold text-[#c1a055]">{selectedItem.displayPrice}</span>
                  </div>
                  {/* ON CLICK FUNCTION ATTACHED */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#c1a055] hover:bg-[#b09045] text-black font-semibold text-xs uppercase tracking-widest py-4 rounded-lg transition-all shadow-lg hover:shadow-[#c1a055]/10"
                  >
                    Add To Cart
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}