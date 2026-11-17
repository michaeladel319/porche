"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import { Model as PorscheModel } from "./Porsche_911_turbo_s";

function Car() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <PorscheModel position={[0, -1.5, 0]} />
      </Float>
    </group>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center cinematic-bg">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Car />
          </PresentationControls>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center mt-32 pointer-events-none">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Precision. Performance. Perfection.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Experience the world's most iconic sports cars.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300">
            Explore Collection
          </button>
          <button className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300 glass">
            Configure Your Porsche
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-sm tracking-widest uppercase mb-2 text-gray-400">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <motion.div 
            className="w-full h-full bg-white origin-top"
            animate={{ 
              scaleY: [0, 1, 0],
              transformOrigin: ["top", "top", "bottom"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
