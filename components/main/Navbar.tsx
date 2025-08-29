"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const name = "<Deepak/>";
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(scrollPercent);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full h-[65px] shadow-lg bg-[#03001417] backdrop-blur-md z-50 px-6 md:px-10">
      <div className="flex items-center justify-between h-full w-full max-w-[1200px] mx-auto">
        {/* Logo */}
        <a href="#about-me" className="flex items-center">
          <span className="font-bold text-[#9c85e1] text-lg sm:text-sm md:text-2xl lg:text-3xl">
            {name}
          </span>
        </a>

        {/* Menu Links (Text Resizes Automatically) */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-[#9c85e1] text-sm sm:text-[5px] md:text-lg lg:text-xl">
          <a href="#about-me" className="hover:text-white transition">
            About
          </a>
          <a href="#skills" className="hover:text-white transition">
            Skills
          </a>
          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className="bg-purple-600 hover:bg-purple-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base"
          >
            Resume
          </a>
        </div>
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/30">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transform-gpu will-change-transform"
          style={{ 
            width: `${scrollProgress}%`,
            transform: `translateZ(0)` 
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
