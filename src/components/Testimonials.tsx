"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The driving dynamics are simply unmatched. It's not just a car, it's an extension of the driver.",
    name: "Chris Harris",
    title: "Automotive Journalist",
  },
  {
    quote: "On the track, it provides a level of confidence and precision that I've never experienced in a road car before.",
    name: "Mark Webber",
    title: "Former F1 Driver & Porsche Ambassador",
  },
  {
    quote: "Every generation they manage to improve upon perfection. The latest 911 is a masterpiece of engineering.",
    name: "James May",
    title: "Automotive Presenter",
  },
  {
    quote: "Owning a Porsche is a dream realized. The everyday usability combined with supercar performance is mind-blowing.",
    name: "Alex R.",
    title: "Porsche Owner",
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-porsche-black relative overflow-hidden flex items-center min-h-[70vh]">
      <div className="absolute inset-0 cinematic-bg opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Voices of Excellence</h2>
          <div className="w-16 h-1 bg-porsche-red mt-6 mx-auto"></div>
        </div>

        <div className="w-full max-w-4xl relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center glass p-10 md:p-16 rounded-3xl"
            >
              <Quote size={48} className="text-porsche-red/50 mb-6" />
              <p className="text-xl md:text-3xl text-white font-medium leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].quote}"
              </p>
              <div>
                <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">{testimonials[currentIndex].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex space-x-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-porsche-red w-10' : 'bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
