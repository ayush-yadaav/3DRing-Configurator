import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { useRef, Suspense } from "react";


function RingModel() {
  const meshRef = useRef();
  

  const { scene } = useGLTF("/public/models/ring.glb"); 

 
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25; 
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={1.5} 
    />
  );
}


export default function HeroRingViewer() {
  return (
    <div className="w-full h-[50vh] lg:h-[75vh] relative z-10 flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          
          <Stage environment="studio" intensity={0.6} adjustCamera={false}>
            <Center>
              <RingModel />
            </Center>
          </Stage>
        </Suspense>
        
       
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}


useGLTF.preload("/ring.glb");