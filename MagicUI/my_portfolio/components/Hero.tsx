"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../app/globals.css';
import { MeteorDemo } from './magicui/meteors';
import { TypewriterEffectSmoothDemo } from './magicui/TypeWriter';
import { useTheme } from './providers/theme-provider';
import { AnimatedGradient } from './ui/animated-gradient';
import Button from './ui/Button';
import { Spotlight } from './ui/spotlight';

const Hero = () => {
  const { theme } = useTheme();
  // Smooth animation config
  const smoothTransition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  // Generate particles for the background with client-side only randomization
  const [particles, setParticles] = useState<Array<{id: number, size: number, x: number, y: number, duration: number}>>([]);

  useEffect(() => {
    // Only run this on the client side to avoid hydration errors
    setParticles(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10
    })));
  }, []);

  return (
    <div id='hero' className="relative w-full px-4 md:px-16 lg:px-72 pt-5 md:pt-16 pb-4 overflow-hidden">
      <AnimatedGradient />
      {/* Removed custom cursor */}

      <div className=''>
        <Spotlight className='top-0 left-10 md:left-32 md:top-0 h-[600px]' fill="var(--text-color, white)"/>
      </div>

      <div className="flex flex-col items-center justify-start mt-4">
        <div className='flex items-center text-center mb-4'>
          <Button/>
        </div>
        <MeteorDemo />
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-center md:gap-6 lg:gap-8 sm:py-4 items-center mt-4 md:mt-0 w-full max-w-7xl mx-auto px-4 lg:px-6">
        {/* Bio section - takes more space on large screens */}
        <motion.div
          className="text-center md:text-left md:px-2 w-full md:w-[68%] lg:w-[72%] xl:w-[75%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={smoothTransition}

        >
          <div className="text-base px-2 sm:px-0 font-normal text-zinc-800 dark:text-white relative overflow-hidden group transition-colors duration-300 w-full max-w-full mx-auto md:pr-4">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent w-[200%] h-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative z-10 text-sm md:text-base lg:text-lg leading-relaxed font-semibold text-zinc-800 dark:text-white"
              style={{
                textShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                background: theme === 'light' ? 'linear-gradient(to right, #1e40af, #3b82f6, #1e40af)' : 'none',
                WebkitBackgroundClip: theme === 'light' ? 'text' : 'none',
                WebkitTextFillColor: theme === 'light' ? 'transparent' : 'inherit',
                letterSpacing: '0.01em',
                lineHeight: '1.5',
                maxWidth: '100%',
                display: 'block',
                textAlign: 'left',
                wordSpacing: '0.05em'
              }}
            >
              I&apos;m a 22-year-old BSC IT graduate and aspiring full-stack developer skilled in Next.js and the MERN stack. I enjoy building creative, efficient, and beautiful animated websites, and I&apos;m currently learning DevOps to expand my skillls.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mb-6 md:mb-0 relative md:flex-shrink-0 md:w-[32%] lg:w-[28%] xl:w-[25%]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={smoothTransition}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative w-40 h-40 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48"
            animate={{ rotateX: 0, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={(e) => {
              if (!e.currentTarget) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              const rotateX = y / 15; // Reduced sensitivity for smoother effect
              const rotateY = -x / 15; // Reduced sensitivity for smoother effect
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget) return;
              // Smooth transition back to center
              e.currentTarget.style.transition = 'transform 0.5s ease-out';
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
              // Remove the transition after it completes to allow smooth mouse movement again
              const element = e.currentTarget;
              setTimeout(() => {
                if (element && element.style) {
                  element.style.transition = '';
                }
              }, 500);
            }}
          >
            <img
              className="rounded-full w-full h-full object-cover border-4 border-blue-500 relative z-10"
              src="/PortfolioProfileImage.png"
              alt="Kush Vardhan"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
        className="mt-4 mb-8"
      >
        <TypewriterEffectSmoothDemo/>
      </motion.div>

      {/* Floating particles background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: particle.size,
              height: particle.size,
              top: `${particle.y}%`,
              left: `${particle.x}%`,
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
