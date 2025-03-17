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

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-20 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center text-center md:text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-2 px-3 border border-[#7042f88b] opacity-90 flex items-center justify-center md:justify-start"
        >
          <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
          <h1 className="Welcome-text text-sm">Welcome Traveller</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[800px] mx-auto md:mx-0"
        >
          <span className="text-[#b49bff]">
            Hello,
            <br />
            <span>I'm</span> <span className="text-white">Deepak</span>
          </span>

          <div className="text-purple-500 flex justify-center md:justify-start items-center text-3xl md:text-5xl font-bold">
            <h2>I'm a&nbsp;</h2>
            <div className="text-[#b49bff] inline-flex">
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
          className="text-lg md:text-2xl text-purple-200 my-5 max-w-[600px] mx-auto md:mx-0"
        >
          I&apos;m a Full Stack Software Engineer with experience in Website,
          Mobile, and Software development. Check out my projects and skills.
        </motion.p>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full flex justify-center items-center mt-10 md:mt-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={500}
          width={500}
          className="w-[70%] md:w-[500px] h-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
