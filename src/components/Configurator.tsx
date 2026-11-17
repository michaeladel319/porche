"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Moon, Sun, PaintBucket, CircleDashed } from "lucide-react";

const COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#080808" },
  { name: "Red", hex: "#D5001C" },
  { name: "Blue", hex: "#00D4FF" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Green", hex: "#008000" },
];

const WHEELS = [
  { name: "Sport", id: "sport" },
  { name: "Carbon", id: "carbon" },
  { name: "Classic", id: "classic" },
];

function ConfigurableCar({ color, wheelType }: { color: string, wheelType: string }) {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[4, 1.2, 2]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        
        <mesh position={[-1.2, 0, 1.1]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color={wheelType === "carbon" ? "#111" : wheelType === "classic" ? "#ccc" : "#333"} />
        </mesh>
        <mesh position={[1.2, 0, 1.1]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color={wheelType === "carbon" ? "#111" : wheelType === "classic" ? "#ccc" : "#333"} />
        </mesh>
        <mesh position={[-1.2, 0, -1.1]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color={wheelType === "carbon" ? "#111" : wheelType === "classic" ? "#ccc" : "#333"} />
        </mesh>
        <mesh position={[1.2, 0, -1.1]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color={wheelType === "carbon" ? "#111" : wheelType === "classic" ? "#ccc" : "#333"} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Configurator() {
  const [currentColor, setCurrentColor] = useState(COLORS[2]);
  const [currentWheel, setCurrentWheel] = useState(WHEELS[0]);
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <section className={`w-full min-h-screen relative transition-colors duration-1000 ${isNightMode ? 'bg-porsche-black' : 'bg-gray-100'}`}>
      
      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-20 pointer-events-none">
        <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter ${isNightMode ? 'text-white' : 'text-black'}`}>
          Configure Your Vision
        </h2>
        <div className="w-20 h-1 bg-porsche-red mt-4"></div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }}>
          <ambientLight intensity={isNightMode ? 0.2 : 0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isNightMode ? 0.5 : 1.5} castShadow />
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <ConfigurableCar color={currentColor.hex} wheelType={currentWheel.id} />
          </PresentationControls>
          <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2} far={4} />
          <Environment preset={isNightMode ? "night" : "city"} />
        </Canvas>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[400px] glass z-10 flex flex-col justify-center p-8 border-l border-white/10 pt-32 md:pt-8 bg-black/50 backdrop-blur-xl text-white">
        <div className="space-y-12">
          {/* Color Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PaintBucket size={20} className="text-porsche-red" />
              <h3 className="text-xl font-semibold">Exterior Color</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setCurrentColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${currentColor.name === color.name ? 'border-white scale-110 ring-2 ring-white/30 ring-offset-2 ring-offset-black' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="mt-4 text-gray-400 text-sm uppercase tracking-widest">{currentColor.name}</p>
          </div>

          {/* Wheel Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CircleDashed size={20} className="text-porsche-red" />
              <h3 className="text-xl font-semibold">Wheels</h3>
            </div>
            <div className="flex flex-col gap-3">
              {WHEELS.map((wheel) => (
                <button
                  key={wheel.id}
                  onClick={() => setCurrentWheel(wheel)}
                  className={`px-4 py-4 rounded-lg border text-left transition-all ${currentWheel.id === wheel.id ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-white hover:bg-white/10'}`}
                >
                  {wheel.name} Design
                </button>
              ))}
            </div>
          </div>

          {/* Environment Toggle */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {isNightMode ? <Moon size={20} className="text-porsche-blue" /> : <Sun size={20} className="text-porsche-gold" />}
              <h3 className="text-xl font-semibold">Environment</h3>
            </div>
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="w-full px-4 py-4 rounded-lg border border-white/20 text-white hover:bg-white/10 flex justify-between items-center transition-all"
            >
              <span className="font-semibold">{isNightMode ? 'Night Mode' : 'Day Mode'}</span>
              <div className={`w-14 h-7 rounded-full p-1 transition-colors ${isNightMode ? 'bg-porsche-blue' : 'bg-gray-600'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isNightMode ? 'translate-x-7' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
          
          <button className="w-full py-4 bg-porsche-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest mt-8">
            Confirm Build
          </button>
        </div>
      </div>
    </section>
  );
}
