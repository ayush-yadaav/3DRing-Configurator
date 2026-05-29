import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const catalogCombinations = [
  {
    id: "cushion-rose-gold-18k",
    name: "Cushion Cut 18k Rose Gold Solitaire",
    shape: "Cushion",
    metal: "18k Rose Gold",
    price: 6250,
    displayPrice: "$6,250",
    image: "/rings/ring0.2.png",
    modelPath: "/models/chapelhills_monahan.glb",
    stoneName: "Diamond_Round_12_Material_1_0",
    config: { metalColor: "#C58F76", roughness: 0.1, metalness: 1.0 }
  },
  {
    id: "cushion-brushed-black-titanium",
    name: "Cushion Cut Brushed Black Titanium Solitaire",
    shape: "Cushion",
    metal: "Brushed Black Titanium",
    price: 6400,
    displayPrice: "$6,400",
    image: "/rings/ring3.png",
    modelPath: "/models/chapelhills_monahan.glb",
    stoneName: "Object_2",
    config: { metalColor: "#222222", roughness: 0.5, metalness: 0.8 }
  },
  {
    id: "marquise-champagne-gold",
    name: "Marquise Cut Champagne Gold Solitaire",
    shape: "Marquise",
    metal: "Champagne Gold",
    price: 6300,
    displayPrice: "$6,300",
    image: "/rings/ring4.png",
    modelPath: "/models/ring_gold_with_diamond.glb",
    stoneName: "Gem_Material002_0",
    config: { metalColor: "#ebd09b", roughness: 0.15, metalness: 1.0 }
  },
  {
    id: "marquise-white-tungsten",
    name: "Marquise Cut White Tungsten Solitaire",
    shape: "Marquise",
    metal: "White Tungsten",
    price: 6350,
    displayPrice: "$6,350",
    image: "/rings/ring5.png",
    modelPath: "/models/ring_gold_with_diamond.glb",
    stoneName: "Gem_Material002_0",
    config: { metalColor: "#dcdcdc", roughness: 0.2, metalness: 0.9 }
  },
  {
    id: "radiant-rose-gold",
    name: "Radiant Cut Rose Gold Solitaire",
    shape: "Radiant",
    metal: "Rose Gold",
    price: 6450,
    displayPrice: "$6,450",
    image: "/rings/ring6.png",
    modelPath: "/models/ring_gold_with_diamond.glb",
    stoneName: "Gem_Material002_0",
    config: { metalColor: "#b97a6b", roughness: 0.1, metalness: 1.0 }
  },
  {
    id: "asscher-hammered-white-gold",
    name: "Asscher Cut Hammered White Gold Solitaire",
    shape: "Asscher",
    metal: "Hammered White Gold",
    price: 6500,
    displayPrice: "$6,500",
    image: "/rings/ring7.png",
    modelPath: "/models/diamond_engagement_ring.glb",
    stoneName: "Object_2",
    config: { metalColor: "#f5f5f7", roughness: 0.3, metalness: 1.0 }
  },
  {
    id: "asscher-brushed-rose-gold",
    name: "Asscher Cut Brushed Rose Gold Solitaire",
    shape: "Asscher",
    metal: "Brushed Rose Gold",
    price: 6550,
    displayPrice: "$6,550",
    image: "/rings/ring8.png",
    modelPath: "/models/diamond_engagement_ring.glb",
    stoneName: "Diamond_Round_12_Material_1_0",
    config: { metalColor: "#e49b82", roughness: 0.4, metalness: 0.9 }
  },
  {
    id: "asscher-satin-finish-yellow-gold",
    name: "Asscher Cut Satin-Finish Yellow Gold Solitaire",
    shape: "Asscher",
    metal: "Satin-Finish Yellow Gold",
    price: 6200,
    displayPrice: "$6,200",
    image: "/rings/ring9.png",
    modelPath: "/models/diamond_engagement_ring.glb",
    stoneName: "Object_2",
    config: { metalColor: "#C29E6B", roughness: 0.35, metalness: 0.95 }
  }
];



//  DYNAMIC 3D ENGINE 
function DynamicRing({ modelPath, stoneName, config }) {
  const { scene } = useGLTF(modelPath);

  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  const metalMaterial = React.useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.metalColor),
    roughness: config.roughness,
    metalness: config.metalness,
    envMapIntensity: 2.5,
  }), [config]);

  const diamondMaterial = React.useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.0,
    metalness: 0.1,
    transmission: 0.98,
    transparent: true,
    opacity: 1.0,
    ior: 2.417,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    side: THREE.DoubleSide
  }), []);

  React.useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        const nameLower = child.name.toLowerCase();
      
        const matNameLower = child.material && child.material.name ? child.material.name.toLowerCase() : "";
        
       
        if (
          child.name === stoneName || 
          nameLower.includes("diamond") || 
          nameLower.includes("gem") || 
          nameLower.includes("stone") ||
          nameLower.includes("crystal") ||
          matNameLower.includes("diamond") ||
          matNameLower.includes("gem") ||
          matNameLower.includes("stone") ||
          matNameLower.includes("crystal") ||
          matNameLower.includes("glass")
        ) {
          child.material = diamondMaterial;
        } else {
          child.material = metalMaterial;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, stoneName, metalMaterial, diamondMaterial]);

  return <primitive object={clonedScene} />;
}

export default function Catalog({ cartItems, setCartItems, onCartOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const itemToAdd = {
      id: `${selectedItem.id}-${Date.now()}`,
      productName: selectedItem.name,
      metal: selectedItem.metal,
      stone: selectedItem.shape,
      carat: "1.00 ct",
      total: selectedItem.price,
      image: selectedItem.image
    };

    const updatedCart = [...cartItems, itemToAdd];
    setCartItems(updatedCart);
    localStorage.setItem("ring-cart", JSON.stringify(updatedCart));

    setIsOpen(false);
    onCartOpen();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12 md:px-12 relative">
     
      <div className="text-center mb-16">
        <p className="text-[#c1a055] text-xs tracking-widest uppercase mb-2">Maison Lumière — Collections</p>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide">
          Our Bespoke <span className="italic text-[#c1a055]">Combinations</span>
        </h1>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {catalogCombinations.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group bg-[#111111] border border-neutral-800 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#c1a055] hover:shadow-[0_0_20px_rgba(193,160,85,0.08)]"
          >
            <div className="w-full h-64 overflow-hidden rounded-lg bg-neutral-900/50 flex items-center justify-center mb-5 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

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

     
      <AnimatePresence>
        {isOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-xs font-mono tracking-widest text-neutral-400 hover:text-[#c1a055] transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
              ✕ CLOSE DETAILS
            </button>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
              
              <div className="lg:col-span-7 h-[400px] lg:h-[550px] w-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900/20 to-transparent border border-neutral-800/40 cursor-grab active:cursor-grabbing">
                <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

                <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] uppercase tracking-widest text-neutral-500 pointer-events-none z-10">
                  Drag to rotate • Scroll to zoom
                </span>

               
                <Canvas key={selectedItem.id} camera={{ fov: 40, position: [0, 3, 5] }}>
                  <Stage intensity={1.5} environment="studio" adjustCamera={1.3}>
                    <Suspense fallback={null}>
                      <DynamicRing
                        modelPath={selectedItem.modelPath}
                        stoneName={selectedItem.stoneName}
                        config={selectedItem.config}
                      />
                    </Suspense>
                  </Stage>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.8}
                  />
                </Canvas>
              </div>

             
              <div className="lg:col-span-5 bg-[#111111] border border-neutral-800 rounded-2xl p-8 space-y-6 shadow-2xl">
                <div>
                  <p className="text-[#c1a055] text-xs tracking-widest uppercase mb-1">Maison Lumière</p>
                  <h1 className="text-3xl font-light tracking-wide">{selectedItem.name}</h1>
                </div>

                <hr className="border-neutral-800" />

                <div className="space-y-4 font-light text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">Metal Quality</span>
                    <span className="text-neutral-200 font-medium">{selectedItem.metal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">Center Stone Shape</span>
                    <span className="text-neutral-200 font-medium">{selectedItem.shape} Cut</span>
                  </div>
                </div>

              
                <div className="pt-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Price</span>
                    <span className="text-3xl font-semibold text-[#c1a055]">{selectedItem.displayPrice}</span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#c1a055] hover:bg-[#b09045] text-black font-semibold text-xs uppercase tracking-widest py-4 rounded-lg transition-all shadow-lg"
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
