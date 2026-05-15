"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CubeLoaderProps {
  size?: number; // cube size
  speed?: number; // rotation speed
  textSize?: number;
  percentage?: number;
  screenHFull?: boolean;
}

export const PrismFluxLoader: React.FC<CubeLoaderProps> = ({
  size = 50,
  speed = 5,
  textSize = 50,
  percentage = 0,
  screenHFull = false,
}) => {
  const [time, setTime] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Loader steps
  const statuses = ["Fetching", "Fixing", "Updating", "Placing", "Syncing", "Processing"];

  // Cube rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02 * speed);
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  // Status text timer (changes every 600ms)
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 600);
    return () => clearInterval(statusInterval);
  }, [statuses.length]);

  const half = size / 2;
  const currentStatus = statuses[statusIndex];

  return (
    <div className={`${screenHFull ? "min-h-screen" : "h-[220px]"} relative flex flex-col items-center justify-center gap-4`}>
      {/* Cube Container */}
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateY(${time * 30}deg) rotateX(${time * 30}deg)`,
        }}
      >
        {/* Cube Faces */}
        {statuses.slice(0, 6).map((_, i) => {
          const faceTransforms = [
            `rotateY(0deg) translateZ(${half}px)`,   // front
            `rotateY(180deg) translateZ(${half}px)`, // back
            `rotateY(90deg) translateZ(${half}px)`,  // right
            `rotateY(-90deg) translateZ(${half}px)`, // left
            `rotateX(90deg) translateZ(${half}px)`,  // top
            `rotateX(-90deg) translateZ(${half}px)`, // bottom
          ];

          return (
            <div
              key={i}
              className={`absolute flex items-center justify-center font-semibold text-white bg-black/40 backdrop-blur-md`}
              style={{
                width: size,
                height: size,
                fontSize: textSize,
                border: `1px solid rgba(255, 255, 255, 0.4)`,
                transform: faceTransforms[i],
                backfaceVisibility: "hidden",
              }}
            >
             <PlusIcon className="text-white w-1/2 h-1/2 opacity-70" />
            </div>
          );
        })}
      </div>

      {/* Status Text Below Cube */}
      <div className="mt-4 text-center w-48">
        <p className="text-sm font-bold text-white tracking-widest uppercase">
          {currentStatus}...
        </p>

        {/* Progress Bar Container */}
        <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`h-full bg-white`}
          />
        </div>

        <p className="text-[10px] font-mono mt-2 opacity-60 tracking-widest text-white">
          {Math.round(percentage)}% COMPLETED
        </p>
      </div>
    </div>
  );
};
