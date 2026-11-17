"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How do I configure a Porsche?", answer: "You can use our online 3D Configurator to customize exterior colors, wheels, and more to perfectly match your vision." },
  { question: "Financing options?", answer: "Porsche Financial Services offers tailored financing and leasing options to suit your lifestyle and needs." },
  { question: "Warranty information?", answer: "Every new Porsche comes with a 4-year/50,000-mile warranty and 24-hour roadside assistance." },
  { question: "Service plans?", answer: "Porsche Scheduled Maintenance Plans provide prepaid maintenance for your vehicle, ensuring optimal performance." },
  { question: "EV charging support?", answer: "Porsche offers comprehensive home and public charging solutions, including the Porsche Charging Planner for optimal route guidance." },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-porsche-black relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-porsche-red mt-6 mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-lg md:text-xl font-bold text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-porsche-red" size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
