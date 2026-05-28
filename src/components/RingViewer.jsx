import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  OrbitControls,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import useRingStore from "../store/useRingStore";


useGLTF.preload("/models/chapelhills_monahan.glb");


const METAL_MATERIALS = {
  "14k White Gold": new THREE.MeshStandardMaterial({
    color: "#d9d9d9",
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 5,
  }),

  "18k White Gold": new THREE.MeshStandardMaterial({
    color: "#f0f0f0",
    metalness: 1,
    roughness: 0.1,
    envMapIntensity: 5,
  }),

  "14k Yellow Gold": new THREE.MeshStandardMaterial({
    color: "#dfba54",
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 5,
  }),

  "18k Yellow Gold": new THREE.MeshStandardMaterial({
    color: "#f1c94a",
    metalness: 1,
    roughness: 0.1,
    envMapIntensity: 5,
  }),

  "14k Rose Gold": new THREE.MeshStandardMaterial({
    color: "#B76E79",
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 5,
  }),

  "18k Rose Gold": new THREE.MeshStandardMaterial({
    color: "#E0A96D",
    metalness: 1,
    roughness: 0.1,
    envMapIntensity: 5,
  }),

  "Pure Platinum": new THREE.MeshStandardMaterial({
    color: "#cfcfcf",
    metalness: 1,
    roughness: 0.06,
    envMapIntensity: 6,
  }),

  "Palladium Gray": new THREE.MeshStandardMaterial({
    color: "#bdbdbd",
    metalness: 1,
    roughness: 0.08,
    envMapIntensity: 5,
  }),
};


const solidDiamondMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  roughness: 0.0,            
  metalness: 0.0,           
  ior: 2.417,                
  transmission: 0.98,       
  thickness: 2.5,            
  opacity: 1.0,
  transparent: true,
  envMapIntensity: 22,       
  clearcoat: 1.0,
  clearcoatRoughness: 0.0,
  side: THREE.DoubleSide,    
  dispersion: 7.0,           
  bounces: 4,                
});

function RingModel({ metal, stone, isMobile }) {
  const { scene } = useGLTF("/models/chapelhills_monahan.glb");

  useEffect(() => {
    const metalMaterial =
      METAL_MATERIALS[metal] ||
      METAL_MATERIALS["14k White Gold"];

    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      obj.frustumCulled = false;
      if (obj.geometry) {
        obj.geometry.computeVertexNormals();
      }

      const name = obj.name.toLowerCase();

     
      if (name.includes("diamond_round_12_material_1_0")) {
        obj.rotation.set(0, 0, 0);

        
        switch (stone?.toLowerCase()) {
          case "oval":
            obj.scale.set(0.75, 1.05, 1);
            break;

          case "princess":
            obj.scale.set(0.85, 0.85, 1);
            break;

          case "emerald":
            obj.scale.set(0.7, 1.0, 1.0);
            break;

          case "pear":
            obj.scale.set(0.75, 1.15, 1);
            obj.rotation.z = Math.PI;
            break;

          default:
            obj.scale.set(0.9, 0.9, 1);
        }

        obj.position.set(0, 0.12, 0);
        obj.material = solidDiamondMaterial;
        obj.visible = true;
        return;
      }

      
      if (
        name.includes("diamond_round_material_1_0") || 
        name.includes("diamond_round_13_material_1_0") || 
        name.includes("diamond") || 
        name.includes("gem") || 
        name.includes("stone")
      ) {
        obj.material = solidDiamondMaterial;
        obj.visible = true; 
        return;
      }

    
      obj.material = metalMaterial;
    });

  }, [metal, stone, scene]);

 
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    scene.position.set(
      -center.x,
      -center.y,
      -center.z
    );

   
    const scale = isMobile ? 27 : 41;
    scene.scale.set(scale, scale, scale);

  }, [scene, isMobile]);

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
}

export default function RingViewer() {
  const { metal, stone } = useRingStore();
  const controlsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping, 
        }}
        camera={{
          position: [0, 0, 2.2],
          fov: 35,
        }}
      >
        <color attach="background" args={["#050505"]} />

        
        <ambientLight intensity={1.2} />

       
        <directionalLight
          position={[8, 12, 6]} 
          intensity={9}          
        />

        
        <directionalLight
          position={[-6, 8, -4]} 
          intensity={3}
        />

       
        <pointLight
          position={[0, 2, 8]}
          intensity={2}
          distance={20}
          decay={2}
        />

      
        <pointLight
          position={[4, 6, 4]}
          intensity={6}
          distance={15}
          decay={1}
        />

        <Suspense fallback={null}>
         
          <Environment preset="studio" />
          <Float
            speed={0.8}
            rotationIntensity={0.05}
            floatIntensity={0.03}
          >
            <RingModel
              metal={metal}
              stone={stone}
              isMobile={isMobile}
            />
          </Float>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.05}
          target={[0, 0, 0]}
          rotateSpeed={isMobile ? 0.7 : 0.45}
        />
      </Canvas>
    </div>
  );
}