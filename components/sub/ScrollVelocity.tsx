"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "motion/react";

interface SkillImage {
  src: string;
  name: string;
}

interface ScrollVelocityProps {
  images: SkillImage[];
 
  speed?: number;
 
  minItemWidth?: number;
}

interface SkillItemProps {
  image: SkillImage;
  minWidth: number;
  
}

const SkillItem: React.FC<SkillItemProps> = ({ image, minWidth }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="listitem"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer relative z-10"
      style={{ minWidth }}
    >
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 p-4 rounded-2xl bg-[#0a0a1a]/50 backdrop-blur-sm transition-all duration-300"
        style={{
          border: isHovered
            ? "1px solid rgba(168,85,247,0.5)"
            : "1px solid rgba(168,85,247,0.2)",
          boxShadow: isHovered ? "0 10px 15px -3px rgba(168,85,247,0.12)" : "none",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
        aria-hidden={false}
      >
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.name}
            fill
            className="object-contain p-2 transition-all duration-300"
            loading="lazy"
            decoding="async"
            style={{
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
              opacity: isHovered ? 1 : 0.5,
            }}
          />
        </div>
      </div>

      <span
        className="text-sm transition-colors duration-300"
        style={{ color: isHovered ? "rgb(192,132,252)" : "rgb(156,163,175)" }}
      >
        {image.name}
      </span>
    </div>
  );
};

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  images = [],
  speed = 30,
  minItemWidth = 120,
}) => {
  // guard
  if (!images || images.length === 0) return null;

  // duplicate for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        className="flex gap-12 items-center whitespace-nowrap hover:[animation-play-state:paused]"
        style={{
          width: "max-content",
          animation: `scroll ${speed}s linear infinite`,
        }}
      >
        {duplicatedImages.map((image, index) => {
          const key = `${image.name.replace(/\s+/g, "-").toLowerCase()}-${index}`;
          return (
            <SkillItem key={key} image={image} minWidth={minItemWidth} />
          );
        })}
      </div>
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollVelocity;
