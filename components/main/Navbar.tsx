"use client";
import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#about-me", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      {/* Main navbar container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Animated neon glow border - clockwise moving light */}
        <div 
          className="absolute -inset-[2px] rounded-2xl overflow-hidden"
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '2px',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 0deg, transparent 10%, transparent 65%, rgba(168, 85, 247, 0.6) 75%, rgba(139, 92, 246, 1) 82%, rgba(168, 85, 247, 0.6) 89%, transparent 100%)`,
              animation: 'spin 5s linear infinite',
            }}
          />
        </div>

        {/* Outer glow effect */}
        <div className="absolute -inset-1 bg-purple-500/40 rounded-2xl blur-xl animate-pulse" style={{ animationDuration: '6s' }} />

        {/* Glass navbar content */}
        <div className="relative bg-[#0a0a1a]/50 backdrop-blur-xl rounded-2xl border border-purple-500/30">
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="#about-me" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
                {"<Deepak/>"}
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
                mobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-2 pt-2 border-t border-purple-500/20">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-purple-500/10 text-base font-medium transition-all px-3 py-2 rounded-lg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
