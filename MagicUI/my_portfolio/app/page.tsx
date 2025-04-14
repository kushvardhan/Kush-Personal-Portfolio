"use client"
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Tech_Stack";
import { FloatingDockDemo } from "@/components/magicui/Dock";

export default function Home() {
  return (
    <main className="dark:bg-zinc-900 bg-gray-50 dark:text-white text-zinc-900 flex flex-col transition-colors duration-300">
      <Hero/>
      <Projects/>
      <Skills/>
      <div className="relative z-50 ">
        <FloatingDockDemo />
      </div>
      <Contact />
    </main>
  );
}
