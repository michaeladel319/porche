"use client";

import { motion } from "framer-motion";
import { Wind, Activity, ShieldAlert, Rocket, Brain, Wifi, Lightbulb, Monitor } from "lucide-react";

const features = [
  { title: "Active Aerodynamics", icon: Wind, desc: "Adaptive rear wing and front cooling flaps for optimal downforce." },
  { title: "Adaptive Suspension", icon: Activity, desc: "PASM electronically controls the damping force for each wheel." },
  { title: "Carbon Ceramic Brakes", icon: ShieldAlert, desc: "PCCB provides maximum braking performance under extreme conditions." },
  { title: "Launch Control", icon: Rocket, desc: "Achieve maximum acceleration from a standing start." },
  { title: "AI Driver Assistance", icon: Brain, desc: "Next-generation predictive driving and safety systems." },
  { title: "Porsche Connect", icon: Wifi, desc: "Stay connected with real-time traffic and smart device integration." },
  { title: "Matrix LED Headlights", icon: Lightbulb, desc: "PDLS Plus dynamically adapts the light beam to the driving situation." },
  { title: "Advanced Infotainment", icon: Monitor, desc: "High-resolution touchscreens with intuitive Porsche Communication Management." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TechFeatures() {
  return (
    <section className="py-32 bg-porsche-gray relative">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
          >
            Engineering Excellence
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 bg-porsche-red mt-6 mx-auto"
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="glass p-8 rounded-2xl hover:bg-white/10 transition-colors group cursor-default border border-white/5"
              >
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-porsche-red/20 group-hover:text-porsche-red text-white">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
