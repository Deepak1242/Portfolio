"use client";
import React from "react";
import SkillText from "../sub/SkillText";
import ScrollVelocity from "../sub/ScrollVelocity";

const SKILL_IMAGES = [
  { src: "/html.png", name: "HTML" },
  { src: "/css.png", name: "CSS" },
  { src: "/js.png", name: "JavaScript" },
  { src: "/ts.png", name: "TypeScript" },
  { src: "/react.png", name: "React" },
  { src: "/next.png", name: "Next.js" },
  { src: "/tailwind.png", name: "Tailwind" },
  { src: "/redux.png", name: "Redux" },
  { src: "/node-js.png", name: "Node.js" },
  { src: "/mongodb.png", name: "MongoDB" },
  { src: "/framer.png", name: "Framer" },
  { src: "/reactquery.png", name: "React Query" },
  { src: "/mui.png", name: "Material UI" },
  { src: "/stripe.webp", name: "Stripe" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-12 relative overflow-hidden pt-24 pb-10 z-30"
    >
      <SkillText />

      <div className="w-full">
        <ScrollVelocity images={SKILL_IMAGES} speed={25} />
      </div>
    </section>
  );
};

export default Skills;
