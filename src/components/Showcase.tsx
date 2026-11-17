"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Image from "next/image";
import { Model as PorscheModel } from "./GT3_2017";
import { Model as ClassicModel } from "./Porsche_930";
import { Model as RoxyModel } from "./Roxy_GT3";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CARS = [
  {
    id: "01",
    model: "Porsche 911 (992)",
    subtitle: "GT3R Roxy",
    price: "$1,495,000",
    location: "Las Vegas, NV",
    year: "2023",
    mileage: "1,744",
    horsepower: "565",
    color: "#ff3366",
    gradient: "from-[#ffb3c6] via-[#fdfdfd] to-[#ebebeb]",
    Component: RoxyModel,
    scale: 1.25
  },
  {
    id: "02",
    model: "Porsche 911 (991)",
    subtitle: "GT3 RS",
    price: "$210,000",
    location: "Miami, FL",
    year: "2017",
    mileage: "8,500",
    horsepower: "520",
    color: "#ff5a1f",
    gradient: "from-[#ff9a62] via-[#fdfdfd] to-[#ebebeb]",
    Component: PorscheModel,
    scale: 125 // Compensates for the internal 0.01 scale in the 2017 GT3 RS mesh
  },
  {
    id: "03",
    model: "911 Turbo (930)",
    subtitle: "Classic 1975",
    price: "$250,000",
    location: "Stuttgart, GER",
    year: "1975",
    mileage: "45,000",
    horsepower: "260",
    color: "#000000",
    gradient: "from-[#666666] via-[#fdfdfd] to-[#ebebeb]",
    Component: ClassicModel,
    scale: 1.15,
    yOffset: 0,
    xOffset: 0
  }
];

function CarShadow() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 16, 128, 128, 128);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.55)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.25)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.2, 6.2]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

function Scene({ currentIndex, direction }: { currentIndex: number, direction: number }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const prevIndex = useRef(currentIndex);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    // Initial setup on first render
    if (prevIndex.current === currentIndex) {
      refs.current.forEach((group, i) => {
        if (!group) return;
        const baseYOffset = CARS[i]?.yOffset || 0;
        const baseXOffset = CARS[i]?.xOffset || 0;
        if (i === currentIndex) {
          group.position.x = baseXOffset;
          group.position.y = -0.15 + baseYOffset;
          group.position.z = 0;
          group.rotation.set(0, 0, 0);
          group.scale.set(1, 1, 1);
          group.visible = true;
        } else {
          group.position.x = baseXOffset;
          group.position.y = -0.15 + baseYOffset;
          group.position.z = -10;
          group.rotation.set(0, 0, 0);
          group.scale.set(0.96, 0.96, 0.96);
          group.visible = false;
        }
      });
      invalidate();
      return;
    }

    const activeGroup = refs.current[prevIndex.current];
    const nextGroup = refs.current[currentIndex];

    const exitDuration = 0.65;
    const enterDuration = 0.75;
    const enterDelay = 0.45;

    if (activeGroup) {
      gsap.killTweensOf([activeGroup.position, activeGroup.rotation, activeGroup.scale]);
      // Current car drives out horizontally along its Z axis
      gsap.to(activeGroup.position, {
        z: direction > 0 ? 10 : -10,
        duration: exitDuration,
        ease: "power3.in",
        onComplete: () => { activeGroup.visible = false; }
      });
      // Subtle acceleration pitch as it pulls away
      gsap.to(activeGroup.rotation, {
        x: direction > 0 ? -0.04 : 0.04,
        duration: exitDuration * 0.6,
        ease: "power2.out"
      });
      gsap.to(activeGroup.scale, {
        x: 0.96, y: 0.96, z: 0.96,
        duration: exitDuration,
        ease: "power2.in"
      });
    }

    if (nextGroup) {
      gsap.killTweensOf([nextGroup.position, nextGroup.rotation, nextGroup.scale]);
      // Next car enters from the opposite side and brakes into center
      nextGroup.visible = true;
      const baseYOffset = CARS[currentIndex]?.yOffset || 0;
      const baseXOffset = CARS[currentIndex]?.xOffset || 0;
      nextGroup.position.x = baseXOffset;
      nextGroup.position.y = -0.15 + baseYOffset;
      nextGroup.position.z = direction > 0 ? -10 : 10;
      nextGroup.rotation.set(direction > 0 ? 0.03 : -0.03, 0, 0);
      nextGroup.scale.set(0.96, 0.96, 0.96);

      gsap.to(nextGroup.position, {
        z: 0,
        duration: enterDuration,
        ease: "power3.out",
        delay: enterDelay
      });
      gsap.to(nextGroup.rotation, {
        x: 0,
        duration: enterDuration,
        ease: "power2.out",
        delay: enterDelay
      });
      gsap.to(nextGroup.scale, {
        x: 1, y: 1, z: 1,
        duration: enterDuration,
        ease: "power2.out",
        delay: enterDelay
      });
    }

    prevIndex.current = currentIndex;
  }, [currentIndex, direction]);

  return (
    <group rotation={[0, -Math.PI / 2, -0.15]}>
      <Environment preset="city" />
      {CARS.map((car, i) => {
        const CarComponent = car.Component;
        return (
          <group
            key={car.id}
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
          >
            <Center>
              <CarComponent scale={car.scale} />
            </Center>
            <CarShadow />
          </group>
        );
      })}
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size, invalidate } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const mobileThresholdAspect = 1.05;
    const baseZ = 7.4;
    const targetZ =
      aspect < mobileThresholdAspect
        ? baseZ * (mobileThresholdAspect / Math.max(aspect, 0.55))
        : baseZ;

    camera.position.set(0, 1.15, targetZ);
    camera.lookAt(0, -0.05, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, invalidate]);

  return null;
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
};

const textItem = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const }
  }
};

function toArabicIndicDigits(value: string): string {
  const indicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return value.replace(/\d/g, (d) => indicDigits[Number(d)]);
}

function NumberSlider({ value, label, isAr = false }: { value: string, label: string, isAr?: boolean }) {
  return (
    <div className="flex flex-col items-center overflow-hidden h-[3.75rem] sm:h-[4.5rem] w-20 sm:w-32 relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${value}-${label}`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute flex flex-col items-center justify-center w-full h-full will-change-transform"
        >
          <span className="text-lg sm:text-2xl font-bold whitespace-nowrap">{value}</span>
          <span className={`text-[9px] sm:text-[10px] text-black/50 font-bold mt-1 whitespace-nowrap ${isAr ? "tracking-normal" : "uppercase tracking-[0.15em]"}`}>{label}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const touchStartX = useRef<number | null>(null);
  const isAr = lang === "ar";
  const car = CARS[currentIndex];

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CARS.length);
    setTimeout(() => setIsTransitioning(false), 1250);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CARS.length) % CARS.length);
    setTimeout(() => setIsTransitioning(false), 1250);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 45) return;
    if (deltaX < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between pt-5 pb-5 px-5 sm:pt-8 sm:pb-10 sm:px-12 text-black touch-pan-y"
    >

      {/* Background Gradient Animation */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className={`absolute inset-0 z-0 bg-gradient-to-b ${car.gradient}`}
        />
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="flex justify-end items-center z-20 w-full relative">
        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "en" ? "ar" : "en"))}
          className="flex items-center gap-1 text-sm font-semibold cursor-pointer group px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
        >
          {isAr ? "العربية" : "ENG"}
          <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </header>

      {/* Centered Floating Product Card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">

        {/* Dynamic Shadow & Glow Base */}
        <div
          className="relative w-[min(1000px,92vw)] h-[min(460px,56dvh)] sm:h-[min(650px,74vh)] bg-white/20 backdrop-blur-md rounded-[28px] sm:rounded-[40px] border border-white/40 flex flex-col justify-between items-center py-5 sm:py-10 md:py-12 px-3 sm:px-10 overflow-visible transition-shadow duration-700"
          style={{
            boxShadow: `0 40px 100px -20px ${car.color}40, inset 0 0 0 1px rgba(255,255,255,0.5)`
          }}
        >

          {/* Header Text (Inside Card) */}
          <div className="relative z-10 flex flex-col items-center text-center min-h-[120px] sm:min-h-[150px] justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
              >
                <motion.h2
                  variants={textItem}
                  className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/50 mb-1 sm:mb-2 will-change-transform"
                >
                  {car.model}
                </motion.h2>
                <motion.h3 variants={textItem} className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-4 will-change-transform">
                  {car.subtitle}
                </motion.h3>
                <motion.div variants={textItem} className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-black/5 will-change-transform">
                  <p className="text-base sm:text-xl font-semibold text-black/80" dir="ltr">
                    {isAr ? toArabicIndicDigits(car.price) : car.price}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Stats (Inside Card) */}
          <div className="relative z-10 flex w-full justify-center gap-2 sm:gap-12 px-2 sm:px-20">
            <NumberSlider value={isAr ? toArabicIndicDigits(car.year) : car.year} label={isAr ? "السنة" : "Year"} isAr={isAr} />
            <div className="w-[1px] h-10 sm:h-12 bg-black/10 mt-2.5 sm:mt-3" />
            <NumberSlider value={isAr ? toArabicIndicDigits(car.mileage) : car.mileage} label={isAr ? "العداد" : "Mileage"} isAr={isAr} />
            <div className="w-[1px] h-10 sm:h-12 bg-black/10 mt-2.5 sm:mt-3" />
            <NumberSlider value={isAr ? toArabicIndicDigits(car.horsepower) : car.horsepower} label={isAr ? "القوة الحصانية" : "Horsepower"} isAr={isAr} />
          </div>

        </div>
      </div>

      {/* 3D Canvas wrapper (Clipped to the rounded square card edges) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
        <div className="w-[min(1000px,92vw)] h-[min(460px,56dvh)] sm:h-[min(650px,74vh)] rounded-[28px] sm:rounded-[40px] overflow-hidden flex items-center justify-center">
          <Canvas
            frameloop={isTransitioning ? "always" : "demand"}
            dpr={[1, 1.25]}
            camera={{ position: [0, 1.15, 7.4], fov: 45 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2, powerPreference: "high-performance" }}
          >
            <ResponsiveCamera />
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />
            <directionalLight position={[-10, 10, 5]} intensity={1.5} />

            <Scene currentIndex={currentIndex} direction={direction} />
          </Canvas>
        </div>
      </div>

      {/* Footer / Controls */}
      <footer className="relative z-30 w-full flex flex-col gap-3 sm:gap-0 sm:flex-row sm:justify-between sm:items-end pointer-events-auto mt-auto">
        <div className="flex w-full justify-center gap-4 sm:gap-0 sm:justify-between items-center sm:items-end">
          {/* Pagination dots (Apple style) */}
          <div className="order-2 sm:order-1 flex gap-2.5 sm:gap-3 bg-black/5 backdrop-blur-md p-2.5 sm:p-3 rounded-full">
            {CARS.map((c, i) => (
              <button
                key={c.id}
                aria-label={`Select ${c.subtitle}`}
                onClick={() => {
                  if (isTransitioning || i === currentIndex) return;
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                  setIsTransitioning(true);
                  setTimeout(() => setIsTransitioning(false), 1250);
                }}
                className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-black w-5 sm:w-6' : 'bg-black/20 hover:bg-black/40'}`}
              />
            ))}
          </div>

          <div className="contents sm:flex sm:order-2 sm:items-center sm:gap-3 sm:pb-2 sm:pr-4">
            <button
              onClick={handlePrev}
              aria-label="Previous car"
              className="order-1 p-3 sm:p-3.5 bg-white/60 backdrop-blur-md border border-white/70 text-black rounded-full shadow-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next car"
              className="order-3 p-3 sm:p-3.5 bg-white/60 backdrop-blur-md border border-white/70 text-black rounded-full shadow-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 active:scale-95"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <p
          dir={isAr ? "rtl" : "ltr"}
          className={`text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:bottom-3 text-[11px] sm:text-xs font-medium text-black/45 pointer-events-none whitespace-nowrap ${isAr ? "tracking-normal" : "tracking-wide"}`}
        >
          {isAr ? (
            <>تم التطوير بواسطة <span className="font-semibold text-black/75">Michael Adel</span></>
          ) : (
            <>Developed by <span className="font-semibold text-black/75">Michael Adel</span></>
          )}
        </p>
      </footer>
    </section>
  );
}
