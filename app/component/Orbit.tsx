"use client";

import { motion } from "framer-motion";

type OrbitProps = {
  src: string;
  x: number;
  y: number;
  size?: number;
  alt?: string;
};

export default function Orbit({
  src,
  x,
  y,
  size = 50,
  alt = "",
}: OrbitProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={{
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        x,
        y,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            boxShadow: [
              "0 0 0 rgba(139,92,246,0)",
              "0 0 30px rgba(139,92,246,.6)",
              "0 0 0 rgba(139,92,246,0)",
            ],
            borderColor: [
              "#E2E8F0",
              "#A855F7",
              "#E2E8F0",
            ],
          }}
          transition={{
            duration: .45,
            repeat: Infinity,
            repeatDelay: 1.75,
            ease: "easeOut",
          }}
          className="flex items-center justify-center rounded-2xl
          bg-white border shadow-lg"
          style={{
            width: size,
            height: size,
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-8 h-8 object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}