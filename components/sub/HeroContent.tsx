"use client";

import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import ResumeButton from "@/components/main/ResumeButton";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-20 lg:py-32 w-full z-[20] min-h-screen max-w-7xl mx-auto gap-12 lg:gap-20"
    >
      <div className="flex-1 flex flex-col gap-8 justify-center text-center lg:text-left">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-3 px-4 border border-[#7042f88b] opacity-90 flex items-center justify-center lg:justify-start rounded-lg backdrop-blur-sm w-fit mx-auto lg:mx-0"
        >
          <SparklesIcon className="text-[#b49bff] mr-3 h-5 w-5" />
          <h1 className="Welcome-text text-sm font-medium">Welcome Traveller</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-outfit text-white leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <span className="text-[#b49bff] block">Hello,</span>
            <span className="block">I'm <span className="text-white">Deepak</span></span>
          </h1>

          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-outfit text-purple-500 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
            <h2>I'm a</h2>
            <div className="text-[#b49bff]">
              <Typewriter
                options={{
                  strings: [
                    "Full Stack Dev",
                    "Designer", 
                    "Python Dev",
                    "React Dev",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg sm:text-xl lg:text-2xl text-purple-200 leading-relaxed max-w-2xl mx-auto lg:mx-0"
        >
          I'm a Full Stack Software Engineer with experience in Website,
          Mobile, and Software development. Check out my projects and skills.
        </motion.p>
        
        <motion.div
          variants={slideInFromLeft(1)}
          className="flex justify-center lg:justify-start pt-4"
        >
          <ResumeButton />
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="flex-1 flex justify-center items-center relative"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={600}
          width={600}
          className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
