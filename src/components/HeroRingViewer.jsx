// import { Canvas, useFrame } from "@react-three/fiber";
// import { Center, OrbitControls, Stage, useGLTF } from "@react-three/drei";
// import { useRef, Suspense } from "react";


// function RingModel() {
//   const meshRef = useRef();
  

//   const { scene } = useGLTF("/models/ring.glb"); 

 
//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += delta * 0.25; 
//     }
//   });

//   return (
//     <primitive 
//       ref={meshRef} 
//       object={scene} 
//       scale={1.5} 
//     />
//   );
// }


// export default function HeroRingViewer() {
//   return (
//     <div className="w-full h-[50vh] lg:h-[75vh] relative z-10 flex items-center justify-center">
//       <Canvas 
//         camera={{ position: [0, 0, 5], fov: 40 }}
//         gl={{ antialias: true, alpha: true }}
//       >
//         <Suspense fallback={null}>
          
//           <Stage environment="studio" intensity={0.6} adjustCamera={false}>
//             <Center>
//               <RingModel />
//             </Center>
//           </Stage>
//         </Suspense>
        
       
//         <OrbitControls enableZoom={false} />
//       </Canvas>
//     </div>
//   );
// }


// useGLTF.preload("/ring.glb");


import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, Suspense } from "react";

function RingModel() {
  const meshRef = useRef();

  const { scene } = useGLTF("/models/ring.glb");

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={2}
      position={[0, -1, 0]}
    />
  );
}

export default function HeroRingViewer() {
  return (
    <div className="w-full h-[50vh] lg:h-[75vh] relative z-10 flex items-center justify-center">
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <directionalLight
          position={[-5, -5, -5]}
          intensity={1}
        />

        <Suspense fallback={null}>
          <RingModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/ring.glb");