"use client";
import Link from 'next/link';
import { LetterTypewriter } from "../ui/letter-typewriter";
export function TypewriterEffectSmoothDemo() {
  const phrases = [
    "Full Stack Developer",
    "Front-end Developer",
    "Back-end Developer"
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[18rem]">
      <LetterTypewriter
        phrases={phrases}
        typingSpeed={120}
        deletingSpeed={60}
        delayBetweenPhrases={2000}
        className="mb-8"
      />


      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8">
        <Link href="/KushResume.pdf" download target="_blank" rel="noopener noreferrer">
          <button className="w-40 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-indigo-700 text-white text-sm relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 border border-transparent hover:border-white/20">
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download CV
            </span>
          </button>
        </Link>
        <Link href="#contact">
          <button className="w-40 h-10 rounded-full bg-white dark:bg-zinc-800 text-blue-700 dark:text-white text-sm relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 border border-blue-200 dark:border-zinc-700">
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-100 to-gray-300 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Hire Me
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
