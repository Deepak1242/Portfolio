import Certifications from "@/components/main/Certifications";
import Contact from "@/components/main/Contact";
import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#030014] overflow-x-hidden">
      <div className="flex flex-col">
        <Hero />
        <div className="flex flex-col gap-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Skills />
          <Encryption />
          <Projects />
          <Certifications />
          <Contact />
        </div>
      </div>
    </main>
  );
}
