"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const counters = gsap.utils.toArray<HTMLElement>(".stat-counter");
    
    counters.forEach(counter => {
      const targetStr = counter.getAttribute("data-target") || "0";
      const isFloat = targetStr.includes(".");
      const target = parseFloat(targetStr);
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(counter, 
            { innerHTML: 0 },
            {
              innerHTML: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: isFloat ? 0.1 : 1 },
              onUpdate: function() {
                if (isFloat) {
                  counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
                }
              }
            }
          );
        },
        once: true
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-porsche-black border-y border-white/10 relative overflow-hidden w-full">
      <div className="absolute inset-0 cinematic-bg opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center border border-white/10 glass rounded-2xl overflow-hidden">
          
          <div className="flex flex-col items-center justify-center p-8 md:p-12 hover:bg-white/5 transition-colors group cursor-default">
            <div className="flex items-end space-x-2">
              <span className="stat-counter text-5xl md:text-7xl font-bold text-white group-hover:text-porsche-red transition-colors duration-500" data-target="650">0</span>
              <span className="text-3xl md:text-5xl font-bold text-porsche-red">+</span>
            </div>
            <p className="text-gray-400 mt-4 uppercase tracking-widest text-sm font-semibold">Horsepower</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 md:p-12 hover:bg-white/5 transition-colors group cursor-default">
            <div className="flex items-end space-x-2">
              <span className="stat-counter text-5xl md:text-7xl font-bold text-white group-hover:text-porsche-red transition-colors duration-500" data-target="800">0</span>
              <span className="text-xl md:text-2xl font-bold text-gray-500 mb-2">Nm</span>
            </div>
            <p className="text-gray-400 mt-4 uppercase tracking-widest text-sm font-semibold">Torque</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 md:p-12 hover:bg-white/5 transition-colors group cursor-default">
            <div className="flex items-end space-x-2">
              <span className="stat-counter text-5xl md:text-7xl font-bold text-white group-hover:text-porsche-red transition-colors duration-500" data-target="330">0</span>
              <span className="text-xl md:text-2xl font-bold text-gray-500 mb-2">km/h</span>
            </div>
            <p className="text-gray-400 mt-4 uppercase tracking-widest text-sm font-semibold">Top Speed</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 md:p-12 hover:bg-white/5 transition-colors group cursor-default">
            <div className="flex items-end space-x-2">
              <span className="stat-counter text-5xl md:text-7xl font-bold text-white group-hover:text-porsche-red transition-colors duration-500" data-target="2.7">0</span>
              <span className="text-xl md:text-2xl font-bold text-gray-500 mb-2">sec</span>
            </div>
            <p className="text-gray-400 mt-4 uppercase tracking-widest text-sm font-semibold">0-100 km/h</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
