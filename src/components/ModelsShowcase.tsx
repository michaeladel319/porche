"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cars = [
  {
    name: "Porsche 911 Turbo S",
    year: "2026",
    hp: "650 HP",
    accel: "2.7 sec",
    speed: "330 km/h",
    price: "$230,000",
    image: "/images/911-turbo-s.png",
  },
  {
    name: "Porsche 911 GT3 RS",
    year: "2026",
    hp: "518 HP",
    accel: "3.2 sec",
    speed: "296 km/h",
    price: "$245,000",
    image: "/images/911-gt3-rs.png",
  },
  {
    name: "Porsche Taycan Turbo GT",
    year: "2026",
    hp: "1092 HP",
    accel: "2.2 sec",
    speed: "305 km/h",
    price: "$240,000",
    image: "/images/taycan-turbo-gt.png",
  },
  {
    name: "Porsche Cayenne Turbo GT",
    year: "2026",
    hp: "659 HP",
    accel: "3.3 sec",
    speed: "305 km/h",
    price: "$205,000",
    image: "/images/cayenne-turbo-gt.png",
  },
  {
    name: "Porsche Panamera Turbo E-Hybrid",
    year: "2026",
    hp: "771 HP",
    accel: "2.9 sec",
    speed: "325 km/h",
    price: "$195,000",
    image: "/images/panamera-turbo-e-hybrid.png",
  },
  {
    name: "Porsche Macan Electric Turbo",
    year: "2026",
    hp: "630 HP",
    accel: "3.3 sec",
    speed: "260 km/h",
    price: "$115,000",
    image: "/images/macan-electric-turbo.png",
  }
];

export default function ModelsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>(".model-panel");
    
    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollRef.current!.offsetWidth,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen overflow-hidden bg-porsche-gray text-white relative flex items-center">
      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Models</h2>
        <div className="w-20 h-1 bg-porsche-red mt-4"></div>
      </div>
      
      <div ref={scrollRef} className="flex h-full" style={{ width: `${cars.length * 100}vw` }}>
        {cars.map((car, index) => (
          <div key={index} className="model-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-10 md:p-20 relative">
            
            <div className="w-full md:w-3/5 h-[40vh] md:h-[60vh] relative z-10 mt-20 md:mt-0">
              <Image 
                src={car.image} 
                alt={car.name} 
                fill 
                className="object-contain"
                priority={index < 2}
              />
            </div>
            
            <div className="w-full md:w-2/5 flex flex-col justify-center space-y-6 md:pl-10 z-10">
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">{car.name}</h3>
              <p className="text-xl text-gray-400">Model Year: {car.year}</p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
                <div className="border-l-2 border-porsche-red pl-4">
                  <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Power</p>
                  <p className="text-xl md:text-3xl font-bold">{car.hp}</p>
                </div>
                <div className="border-l-2 border-porsche-red pl-4">
                  <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">0-100 km/h</p>
                  <p className="text-xl md:text-3xl font-bold">{car.accel}</p>
                </div>
                <div className="border-l-2 border-porsche-red pl-4">
                  <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Top Speed</p>
                  <p className="text-xl md:text-3xl font-bold">{car.speed}</p>
                </div>
                <div className="border-l-2 border-porsche-red pl-4">
                  <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Price From</p>
                  <p className="text-xl md:text-3xl font-bold">{car.price}</p>
                </div>
              </div>
              
              <button className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 w-max">
                Configure
              </button>
            </div>
            
            {/* Background Number */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
              <span className="text-[40vw] font-bold leading-none">{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
