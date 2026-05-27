// import { Suspense, useEffect, useRef, useState } from "react";

// import { Canvas } from "@react-three/fiber";

// import {
//   Environment,
//   useGLTF,
//   OrbitControls,
//   Float,
// } from "@react-three/drei";

// import * as THREE from "three";

// import useRingStore from "../store/useRingStore";


// useGLTF.preload("/models/ring.glb");

// const METAL_MATERIALS = {

//   "14k White Gold":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#cbd3cf"),
//       metalness: 1,
//       roughness: 0.11,
//       envMapIntensity: 2.8,
//     }),

//   "18k White Gold":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#d1d5db"),
//       metalness: 1,
//       roughness: 0.09,
//       envMapIntensity: 3,
//     }),

//   "14k Yellow Gold":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#dfba54"),
//       metalness: 1,
//       roughness: 0.12,
//       envMapIntensity: 3,
//     }),

//   "18k Yellow Gold":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#e1b13c"),
//       metalness: 1,
//       roughness: 0.10,
//       envMapIntensity: 3.2,
//     }),

//   "14k Rose Gold":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#dfbeae"),
//       metalness: 1,
//       roughness: 0.14,
//       envMapIntensity: 2.8,
//     }),

//   "18k Rose Gold":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#dca993"),
//       metalness: 1,
//       roughness: 0.12,
//       envMapIntensity: 3,
//     }),

//   "Pure Platinum":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#c4c4c6"),
//       metalness: 1,
//       roughness: 0.07,
//       envMapIntensity: 3.5,
//     }),

//   "Palladium Gray":
//     new THREE.MeshStandardMaterial({
//       color: new THREE.Color("#bcbcbc"),
//       metalness: 1,
//       roughness: 0.10,
//       envMapIntensity: 2.5,
//     }),
// };


// const STONE_GEOMETRIES = {

//   round:
//     new THREE.IcosahedronGeometry(
//       1,
//       3
//     ),

//   oval: (() => {

//     const geo =
//       new THREE.IcosahedronGeometry(
//         1,
//         3
//       );

//     geo.scale(
//       0.72,
//       1.15,
//       0.72
//     );

//     return geo;

//   })(),

//   princess:
//     new THREE.BoxGeometry(
//       1,
//       1,
//       1
//     ),

//   emerald:
//     new THREE.BoxGeometry(
//       0.75,
//       1.1,
//       0.6
//     ),

//   pear: (() => {

//     const geo =
//       new THREE.ConeGeometry(
//         0.6,
//         1.3,
//         4
//       );

//     geo.rotateX(Math.PI);

//     return geo;

//   })(),
// };

// // const STONE_CONFIGS = {

// //   round: {
// //     desktopScale: 0.30,
// //     mobileScale: 0.24,
// //     yOffset: 1.02,
// //   },

// //   oval: {
// //     desktopScale: 0.28,
// //     mobileScale: 0.22,
// //     yOffset: 1.04,
// //   },

// //   princess: {
// //     desktopScale: 0.28,
// //     mobileScale: 0.22,
// //     yOffset: 0.98,
// //   },

// //   emerald: {
// //     desktopScale: 0.29,
// //     mobileScale: 0.23,
// //     yOffset: 0.96,
// //   },

// //   pear: {
// //     desktopScale: 0.26,
// //     mobileScale: 0.20,
// //     yOffset: 1.05,
// //   },
// // };

// // const STONE_CONFIGS = {
// //   round: {
// //     desktopScale: 0.22,
// //     mobileScale: 0.18,
// //     yOffset: 0.78,
// //   },

// //   oval: {
// //     desktopScale: 0.22,
// //     mobileScale: 0.18,
// //     yOffset: 0.80,
// //   },

// //   princess: {
// //     desktopScale: 0.21,
// //     mobileScale: 0.17,
// //     yOffset: 0.76,
// //   },

// //   emerald: {
// //     desktopScale: 0.21,
// //     mobileScale: 0.17,
// //     yOffset: 0.74,
// //   },

// //   pear: {
// //     desktopScale: 0.20,
// //     mobileScale: 0.16,
// //     yOffset: 0.82,
// //   },
// // };


// const STONE_CONFIGS = {
//   round: {
//     desktopScale: 0.12,
//     mobileScale: 0.10,
//     yOffset: 0.34,
//   },

//   oval: {
//     desktopScale: 0.12,
//     mobileScale: 0.10,
//     yOffset: 0.34,
//   },

//   princess: {
//     desktopScale: 0.11,
//     mobileScale: 0.09,
//     yOffset: 0.33,
//   },

//   emerald: {
//     desktopScale: 0.11,
//     mobileScale: 0.09,
//     yOffset: 0.32,
//   },

//   pear: {
//     desktopScale: 0.11,
//     mobileScale: 0.09,
//     yOffset: 0.36,
//   },
// };

// function DiamondStone({
//   stoneType,
//   isMobile,
// }) {

//   const normalizedStone =
//     stoneType?.toLowerCase();

//   const geometry =
//     STONE_GEOMETRIES[
//     normalizedStone
//     ] ||
//     STONE_GEOMETRIES.round;

//   const config =
//     STONE_CONFIGS[
//     normalizedStone
//     ] ||
//     STONE_CONFIGS.round;

//   const scale =
//     isMobile
//       ? config.mobileScale
//       : config.desktopScale;

//   return (

//     <mesh
//       geometry={geometry}
//       position={[
//         0,
//         config.yOffset,
//         0,
//       ]}
//       scale={scale}
//     >

//       <meshPhysicalMaterial
//         color="#ffffff"
//         transmission={1}
//         roughness={0.02}
//         metalness={0}
//         ior={2.417}
//         thickness={1}
//         envMapIntensity={6}
//         clearcoat={1}
//         clearcoatRoughness={0}
//         reflectivity={1}
//       />

//     </mesh>
//   );
// }

// function RingModel({
//   metal,
//   stone,
//   isMobile,
// }) {

//   const { scene } =
//     useGLTF(
//       "/models/ring.glb"
//     );

//   useEffect(() => {

//     const material =
//       METAL_MATERIALS[
//       metal
//       ] ||
//       METAL_MATERIALS[
//       "14k White Gold"
//       ];

//     scene.traverse((obj) => {

//       if (!obj.isMesh)
//         return;

//       obj.frustumCulled =
//         false;

//       const name =
//         obj.name.toLowerCase();

//       if (
//         name.includes(
//           "diamond"
//         ) ||
//         name.includes(
//           "stone"
//         )
//       ) {

//         obj.visible =
//           false;

//         return;
//       }

//       obj.material =
//         material;

//     });

//   }, [metal, scene]);

//   // useEffect(() => {

//   //   const box =
//   //     new THREE.Box3().setFromObject(
//   //       scene
//   //     );

//   //   const size =
//   //     new THREE.Vector3();

//   //   const center =
//   //     new THREE.Vector3();

//   //   box.getSize(size);

//   //   box.getCenter(center);

//   //   scene.position.set(
//   //     -center.x,
//   //     -center.y - 0.1,
//   //     -center.z
//   //   );

//   //   const maxDim =
//   //     Math.max(
//   //       size.x,
//   //       size.y,
//   //       size.z
//   //     );

//   //   const scale =
//   // isMobile
//   //   ? 1.55 / maxDim
//   //   : 2.05 / maxDim;

//   //   scene.scale.setScalar(
//   //     scale
//   //   );

//   // }, [scene, isMobile]);


//   useEffect(() => {

//   scene.scale.setScalar(
//     isMobile ? 1.15 : 1.4
//   );

//   scene.position.set(
//     0,
//     -0.55,
//     0
//   );

// }, [scene, isMobile]);

//   return (

//     <group>

//       <primitive
//         object={scene}
//       />

//       <DiamondStone
//         stoneType={stone}
//         isMobile={isMobile}
//       />

//     </group>
//   );
// }

// export default function RingViewer() {

//   const {
//     metal,
//     stone,
//   } = useRingStore();

//   const controlsRef =
//     useRef();

//   const [
//     isMobile,
//     setIsMobile,
//   ] = useState(false);

//   useEffect(() => {

//     const checkMobile =
//       () =>
//         setIsMobile(
//           window.innerWidth <
//           768
//         );

//     checkMobile();

//     window.addEventListener(
//       "resize",
//       checkMobile
//     );

//     return () =>
//       window.removeEventListener(
//         "resize",
//         checkMobile
//       );

//   }, []);

//   return (

//     <div
//       className="w-full h-full"
//     >

//       <Canvas
//         camera={{
//           position: [
//             0,
//             0.5,
//             5,
//           ],
//           fov: 35,
//         }}
//       >

//         <color
//           attach="background"
//           args={["#080808"]}
//         />

//         <ambientLight
//           intensity={0.5}
//         />

//         <directionalLight
//           position={[
//             10,
//             15,
//             10,
//           ]}
//           intensity={2.5}
//         />

//         <directionalLight
//           position={[
//             8,
//             0,
//             -8,
//           ]}
//           intensity={2.5}
//         />

//         <Suspense
//           fallback={null}
//         >

//           <Environment preset="studio" />

//           <Float
//             speed={1.2}
//             rotationIntensity={0.15}
//             floatIntensity={0.3}
//           >

//             <RingModel
//               metal={metal}
//               stone={stone}
//               isMobile={
//                 isMobile
//               }
//             />

//           </Float>

//         </Suspense>

//         <OrbitControls
//           ref={controlsRef}
//           enablePan={false}
//           enableZoom={false}
//           enableDamping
//           dampingFactor={0.05}
//           rotateSpeed={
//             isMobile
//               ? 0.7
//               : 0.45
//           }
//         />

//       </Canvas>

//     </div>
//   );
// }


import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import useRingStore from "../store/useRingStore";

useGLTF.preload("/models/ring.glb");

const METAL_MATERIALS = {
  "14k White Gold": new THREE.MeshStandardMaterial({ color: new THREE.Color("#cbd3cf"), metalness: 1, roughness: 0.11, envMapIntensity: 2.8 }),
  "18k White Gold": new THREE.MeshStandardMaterial({ color: new THREE.Color("#d1d5db"), metalness: 1, roughness: 0.09, envMapIntensity: 3 }),
  "14k Yellow Gold": new THREE.MeshStandardMaterial({ color: new THREE.Color("#dfba54"), metalness: 1, roughness: 0.12, envMapIntensity: 3 }),
  "18k Yellow Gold": new THREE.MeshStandardMaterial({ color: new THREE.Color("#e1b13c"), metalness: 1, roughness: 0.10, envMapIntensity: 3.2 }),
  "14k Rose Gold": new THREE.MeshStandardMaterial({ color: new THREE.Color("#dfbeae"), metalness: 1, roughness: 0.14, envMapIntensity: 2.8 }),
  "18k Rose Gold": new THREE.MeshStandardMaterial({ color: new THREE.Color("#dca993"), metalness: 1, roughness: 0.12, envMapIntensity: 3 }),
  "Pure Platinum": new THREE.MeshStandardMaterial({ color: new THREE.Color("#c4c4c6"), metalness: 1, roughness: 0.07, envMapIntensity: 3.5 }),
  "Palladium Gray": new THREE.MeshStandardMaterial({ color: new THREE.Color("#bcbcbc"), metalness: 1, roughness: 0.10, envMapIntensity: 2.5 }),
};

const STONE_GEOMETRIES = {
  round: new THREE.IcosahedronGeometry(1, 3),
  oval: (() => { const geo = new THREE.IcosahedronGeometry(1, 3); geo.scale(0.72, 1.15, 0.72); return geo; })(),
  princess: new THREE.BoxGeometry(1, 1, 1),
  emerald: new THREE.BoxGeometry(0.75, 1.1, 0.6),
  pear: (() => { const geo = new THREE.ConeGeometry(0.6, 1.3, 4); geo.rotateX(Math.PI); return geo; })(),
};

const STONE_CONFIGS = {
  round: { desktopScale: 0.12, mobileScale: 0.10, yOffset: 0.34 },
  oval: { desktopScale: 0.12, mobileScale: 0.10, yOffset: 0.34 },
  princess: { desktopScale: 0.11, mobileScale: 0.09, yOffset: 0.33 },
  emerald: { desktopScale: 0.11, mobileScale: 0.09, yOffset: 0.32 },
  pear: { desktopScale: 0.11, mobileScale: 0.09, yOffset: 0.36 },
};

function DiamondStone({ stoneType, isMobile }) {
  const normalizedStone = stoneType?.toLowerCase();
  const geometry = STONE_GEOMETRIES[normalizedStone] || STONE_GEOMETRIES.round;
  const config = STONE_CONFIGS[normalizedStone] || STONE_CONFIGS.round;
  const scale = isMobile ? config.mobileScale : config.desktopScale;

  return (
    <mesh geometry={geometry} position={[0, config.yOffset, 0]} scale={scale}>
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={1}
        roughness={0.02}
        metalness={0}
        ior={2.417}
        thickness={1}
        envMapIntensity={6}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={1}
      />
    </mesh>
  );
}

// === IS WALE COMPONENT ME CHANGES KIYE HAIN ===
function RingModel({ metal, stone, isMobile }) {
  const { scene } = useGLTF("/models/ring.glb");

  useEffect(() => {
    const material = METAL_MATERIALS[metal] || METAL_MATERIALS["14k White Gold"];

    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      obj.frustumCulled = false;

      const name = obj.name.toLowerCase();

      // Agar model ka hi diamond gayab ho raha tha toh is check ko humne temporary hata diya hai
      if (name.includes("diamond") || name.includes("stone")) {
        // Agar khud ka lagaya DiamondStone hide karna ho tabhi isko use karein
        // Pehle check karne ke liye isko comment karke dekho ki ring poori aati hai ya nahi
        obj.visible = false; 
        return;
      }

      obj.material = material;
    });
  }, [metal, scene]);

  useEffect(() => {
    // Scale thoda standard kiya taaki model sahi size me dikhe
    scene.scale.setScalar(isMobile ? 1.2 : 1.5);
    scene.position.set(0, -0.4, 0);
  }, [scene, isMobile]);

  return (
    <group>
      <primitive object={scene} />
      <DiamondStone stoneType={stone} isMobile={isMobile} />
    </group>
  );
}

export default function RingViewer() {
  const { metal, stone } = useRingStore();
  const controlsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.5, 5], fov: 35 }}>
        <color attach="background" args={["#080808"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} />
        <directionalLight position={[8, 0, -8]} intensity={2.5} />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
            <RingModel metal={metal} stone={stone} isMobile={isMobile} />
          </Float>
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={isMobile ? 0.7 : 0.45}
        />
      </Canvas>
    </div>
  );
}