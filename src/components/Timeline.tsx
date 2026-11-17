"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  { year: "1948", title: "First Porsche 356", desc: "The birth of the Porsche legend." },
  { year: "1964", title: "911 Introduction", desc: "The icon that defined the sports car." },
  { year: "1974", title: "Turbo Era Begins", desc: "Forced induction meets performance." },
  { year: "1986", title: "959 Supercar", desc: "Technological masterpiece ahead of its time." },
  { year: "2002", title: "Cayenne Launch", desc: "Expanding the Porsche DNA to SUVs." },
  { year: "2019", title: "Taycan Launch", desc: "The first all-electric Porsche sports car." },
  { year: "2026", title: "Future Vision", desc: "Redefining performance once again." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
    
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-porsche-gray relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">The Legacy</h2>
          <div className="w-16 h-1 bg-porsche-red mt-6 mx-auto"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2"></div>
          <div ref={lineRef} className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-porsche-red -translate-x-1/2 origin-top"></div>

          {timelineData.map((item, index) => (
            <div key={index} className={`timeline-item flex items-center justify-between mb-16 w-full flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <div className="hidden md:block w-5/12"></div>
              
              <div className="z-20 flex items-center justify-center absolute left-[20px] md:left-1/2 -translate-x-1/2 bg-porsche-black border-4 border-porsche-red w-5 h-5 rounded-full shadow-[0_0_15px_rgba(213,0,28,0.6)]"></div>
              
              <div className="w-full md:w-5/12 pl-12 md:pl-0 glass p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 relative">
                <h3 className="text-3xl font-bold text-porsche-red mb-2">{item.year}</h3>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
