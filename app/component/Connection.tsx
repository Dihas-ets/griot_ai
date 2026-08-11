"use client";

import { motion } from "framer-motion";

type ConnectionProps = {
  x: number;
  y: number;
};

export default function Connection({ x, y }: ConnectionProps) {
  const distance = Math.sqrt(x * x + y * y);
  const angle = (Math.atan2(y, x) * 180) / Math.PI;

  const particles = Array.from({ length: 8 });

  return (
    <div
      className="absolute left-1/2 top-1/2 origin-left pointer-events-none"
      style={{
        width: distance,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Ligne */}
      <div className="absolute w-full h-[2px] rounded-full bg-slate-200/70" />

      {/* Flux lumineux */}
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 -translate-y-1/2 rounded-full bg-red-light"
          style={{
            width: 6,
            height: 6,
            boxShadow: "0 0 12px #ff0000",
          }}
          animate={{
            x: [-10, distance],
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            delay: index * 0.08,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}