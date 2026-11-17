"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const frameX = useSpring(cursorX, { stiffness: 300, damping: 26, mass: 0.4 });
  const frameY = useSpring(cursorY, { stiffness: 300, damping: 26, mass: 0.4 });

  // Aerodynamic tilt driven by horizontal mouse velocity
  const velocityX = useVelocity(cursorX);
  const rawTilt = useTransform(velocityX, [-1500, 0, 1500], [-18, 0, 18]);
  const aeroTilt = useSpring(rawTilt, { stiffness: 250, damping: 22 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, select, .cursor-pointer")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const bracketColor = isHovering ? "#D5001C" : "#080808";

  return (
    <>
      {/* Aerodynamic diamond pointer */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] pointer-events-none z-[101] hidden md:block will-change-transform"
        style={{ x: cursorX, y: cursorY, rotate: aeroTilt }}
        animate={{
          scale: isPressed ? 0.65 : isHovering ? 1.25 : 1,
        }}
        transition={{ duration: 0.12 }}
      >
        <div
          className="w-full h-full rotate-45 rounded-[2px] transition-colors duration-150"
          style={{ backgroundColor: bracketColor }}
        />
      </motion.div>

      {/* Studio viewfinder corner brackets */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] pointer-events-none z-[100] hidden md:block will-change-transform"
        style={{ x: frameX, y: frameY }}
        animate={{
          scale: isPressed ? 0.72 : isHovering ? 1.45 : 1,
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 36 36" className="w-full h-full overflow-visible">
          <path d="M 2 10 L 2 2 L 10 2" fill="none" stroke={bracketColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity={isHovering ? 0.95 : 0.45} />
          <path d="M 26 2 L 34 2 L 34 10" fill="none" stroke={bracketColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity={isHovering ? 0.95 : 0.45} />
          <path d="M 34 26 L 34 34 L 26 34" fill="none" stroke={bracketColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity={isHovering ? 0.95 : 0.45} />
          <path d="M 10 34 L 2 34 L 2 26" fill="none" stroke={bracketColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity={isHovering ? 0.95 : 0.45} />
        </svg>
      </motion.div>
    </>
  );
}
