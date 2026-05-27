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

/* PRELOAD MODEL */
useGLTF.preload("/models/chapelhills_monahan.glb");

/* PREMIUM METAL MATERIALS */
const METAL_MATERIALS = {
  "14k White Gold": new THREE.MeshStandardMaterial({
    color: "#d9d9d9",
    metalness: 1,
    roughness: 0.15,
    envMapIntensity: 5,
  }),

  "18k White Gold": new THREE.MeshStandardMaterial({
    color: "#f0f0f0",
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 5,
  }),

  "14k Yellow Gold": new THREE.MeshStandardMaterial({
    color: "#dfba54",
    metalness: 1,
    roughness: 0.14,
    envMapIntensity: 5,
  }),

  "18k Yellow Gold": new THREE.MeshStandardMaterial({
    color: "#f1c94a",
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 5,
  }),

  "14k Rose Gold": new THREE.MeshStandardMaterial({
    color: "#E5A493",
    metalness: 1,
    roughness: 0.14,
    envMapIntensity: 5,
  }),

  "18k Rose Gold": new THREE.MeshStandardMaterial({
    color: "#dca993",
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 5,
  }),

  "Pure Platinum": new THREE.MeshStandardMaterial({
    color: "#cfcfcf",
    metalness: 1,
    roughness: 0.08,
    envMapIntensity: 6,
  }),

  "Palladium Gray": new THREE.MeshStandardMaterial({
    color: "#bdbdbd",
    metalness: 1,
    roughness: 0.1,
    envMapIntensity: 5,
  }),
};

function RingModel({ metal, stone, isMobile }) {
  const { scene } = useGLTF("/models/chapelhills_monahan.glb");

  useEffect(() => {
    const metalMaterial =
      METAL_MATERIALS[metal] ||
      METAL_MATERIALS["14k White Gold"];

    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      obj.frustumCulled = false;

      const name = obj.name.toLowerCase();

      /* 💎 MAIN DIAMOND */
      if (name.includes("diamond_round_12_material_1_0")) {

        obj.rotation.set(0, 0, 0);

        /* 💍 STONE SHAPE */
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

        /* ✅ PERFECT TOP CENTER POSITION */
        obj.position.set(0, 0.12, 0);

        /* 💎 DIAMOND MATERIAL */
        obj.material = new THREE.MeshPhysicalMaterial({
          color: "#ffffff",
          transmission: 1,
          roughness: 0,
          metalness: 0,
          ior: 2.417,
          thickness: 1.5,
          envMapIntensity: 18,
          clearcoat: 1,
          clearcoatRoughness: 0,
          reflectivity: 1,
        });

        return;
      }

      /* 💍 METAL MATERIAL */
      obj.material = metalMaterial;
    });

  }, [metal, stone, scene]);

  /* 📐 PERFECT CENTER */
  useEffect(() => {

    const box = new THREE.Box3().setFromObject(scene);

    const center = new THREE.Vector3();

    box.getCenter(center);

    scene.position.set(
      -center.x,
      -center.y,
      -center.z
    );

    /* 🔥 PERFECT SIZE */
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
        }}
        camera={{
          position: [0, 0, 2.2],
          fov: 45,
        }}
      >

        <color attach="background" args={["#050505"]} />

        {/* 💡 LIGHTS */}
        <ambientLight intensity={2.5} />

        <directionalLight
          position={[10, 10, 10]}
          intensity={6}
        />

        <directionalLight
          position={[-10, 10, 5]}
          intensity={4}
        />

        <pointLight
          position={[0, 5, 5]}
          intensity={3}
        />

        <Suspense fallback={null}>

          <Environment preset="city" />

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