"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  { id: 1, src: "/images/911-turbo-s.png", alt: "911 Turbo S Exterior", className: "col-span-2 row-span-2" },
  { id: 2, src: "/images/gallery-interior.png", alt: "Porsche Interior", className: "col-span-1 row-span-1" },
  { id: 3, src: "/images/gallery-track.png", alt: "Porsche on Track", className: "col-span-1 row-span-2" },
  { id: 4, src: "/images/taycan-turbo-gt.png", alt: "Taycan Exterior", className: "col-span-1 row-span-1" },
  { id: 5, src: "/images/gallery-night.png", alt: "Night Photography", className: "col-span-2 row-span-1" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="w-full py-32 bg-porsche-black relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Immersive Gallery</h2>
          <div className="w-20 h-1 bg-porsche-red mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(auto-fit,minmax(200px,1fr))] md:grid-rows-3 gap-4 md:gap-6 md:h-[800px]">
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group glass ${img.className} min-h-[200px] md:min-h-0`}
              onClick={() => setSelectedImage(img.src)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.div 
              className="relative w-full h-full max-w-7xl max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Fullscreen Gallery Image"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
