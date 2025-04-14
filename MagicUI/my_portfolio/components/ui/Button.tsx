"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../providers/theme-provider';

interface BubbleProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  id: number;
  opacity: number;
  xOffset: number;
  delay: number;
  active: boolean;
}

const Button = () => {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();

  // Create bubbles on click
  const handleClick = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    // Create bubbles in a volcano-like pattern - moderate number for balance
    const newBubbles = Array.from({ length: 70 }, (_, i) => {
      // Get button position to make bubbles originate from it
      const buttonX = rect.left + rect.width / 2;
      const buttonY = rect.top + rect.height / 2;

      // Get portfolio section position to determine how far bubbles should travel
      const portfolioSection = document.getElementById('projects');
      const portfolioTop = portfolioSection ? portfolioSection.getBoundingClientRect().top : window.innerHeight;
      const travelDistance = portfolioTop - buttonY;

      // Create a pattern that spreads from the button to the portfolio section
      // Horizontal variation based on button position - wider spread for more dramatic effect
      const horizontalVariation = (Math.random() * 2 - 1) * window.innerWidth * 0.6; // -60% to +60% of screen width

      // Staggered start with clustering for realistic eruption
      const delay = Math.random() < 0.7 ? Math.random() * 200 : Math.random() * 500 + 200;

      return {
        id: Date.now() + i + Math.random(), // Ensure unique IDs by adding random component
        x: buttonX + horizontalVariation, // Start from button X position with variation
        y: buttonY, // Start from button Y position
        size: Math.random() * 20 + 8, // Increased bubble sizes by ~40%
        speed: Math.random() * 2 + 1 * (travelDistance / 500), // Faster speed for more dramatic effect
        opacity: Math.random() * 0.8 + 0.2, // Higher opacity for better visibility
        xOffset: horizontalVariation * 0.1, // Very small horizontal drift
        delay,
        active: false
      };
    });

    setBubbles(prev => [...prev, ...newBubbles]);

    // Activate bubbles with delay for volcano effect
    newBubbles.forEach((bubble) => {
      setTimeout(() => {
        setBubbles(prev =>
          prev.map(b =>
            b.id === bubble.id ? { ...b, active: true } : b
          )
        );
      }, bubble.delay);
    });

    // Remove bubbles after animation completes - longer duration for more visible effect
    setTimeout(() => {
      setBubbles(prev => prev.filter(bubble => !newBubbles.some(nb => nb.id === bubble.id)));
    }, 8000);
  };

  // Get cached DOM elements and measurements to avoid repeated DOM access
  const [cachedMeasurements, setCachedMeasurements] = useState({
    heroTop: 0,
    portfolioTop: 0,
    buttonTop: 0,
    totalDistance: 0
  });

  // Initialize measurements with client-side values
  useEffect(() => {
    // Only run on client side
    setCachedMeasurements(prev => ({
      ...prev,
      portfolioTop: window.innerHeight,
      totalDistance: window.innerHeight
    }));
  }, []);

  // Update measurements when needed (once per click)
  useEffect(() => {
    if (bubbles.length > 0 && buttonRef.current) {
      const heroSection = document.getElementById('hero');
      const portfolioSection = document.getElementById('projects');
      const buttonRect = buttonRef.current.getBoundingClientRect();

      const heroTop = heroSection ? heroSection.getBoundingClientRect().top : 0;
      const portfolioTop = portfolioSection ? portfolioSection.getBoundingClientRect().top : window.innerHeight;
      const fullDistance = portfolioTop - heroTop;

      setCachedMeasurements({
        heroTop,
        portfolioTop,
        buttonTop: buttonRect.top,
        totalDistance: fullDistance + 200 // Add extra distance for bubbles to travel beyond
      });
    }
  }, [bubbles.length]);

  // Animate bubbles
  useEffect(() => {
    if (bubbles.length === 0) return;

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setBubbles(prev =>
        prev.map(bubble => {
          if (!bubble.active) return bubble;

          // Use cached measurements instead of accessing DOM in every frame
          const { buttonTop, totalDistance } = cachedMeasurements;

          // Calculate progress of the bubble's journey (0 at button, 1 at portfolio section)
          const distanceTraveled = bubble.y - buttonTop;
          const progress = Math.min(1, distanceTraveled / totalDistance);

          // More dramatic swaying as bubbles move - increases with progress
          const swayAmount = Math.sin(time / 800 + bubble.id) * (10 + progress * 15);

          // Calculate x position with more pronounced horizontal movement
          const xPos = bubble.x + swayAmount + (progress * bubble.xOffset * 2);

          // Gradually reduce opacity as bubbles travel
          // Start fading after 70% of the way to allow bubbles to be visible longer
          const fadeStart = 0.7;
          const newOpacity = progress < fadeStart ?
            bubble.opacity :
            bubble.opacity * (1 - ((progress - fadeStart) / (1 - fadeStart)) * 1.5);

          // Calculate vertical speed - initial burst followed by gradual slowdown
          // This creates a more natural eruption effect
          const initialBurst = Math.max(0, 1 - progress * 3); // Strong at start, quickly diminishes
          const verticalSpeed = bubble.speed * (1 + initialBurst * 2) * (deltaTime / 16);

          return {
            ...bubble,
            y: bubble.y + verticalSpeed, // Move downward
            x: xPos,
            opacity: newOpacity,
            // Slightly reduce size as bubbles fall for perspective effect
            size: bubble.size * (1 - progress * 0.1)
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [bubbles.length, cachedMeasurements, theme]);

  return (
    <div className="relative">
      {/* Bubbles container - positioned absolutely to not affect layout */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ height: '100vh', width: '100vw', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}>
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}px`,
              top: `${bubble.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: bubble.active ? bubble.opacity : 0,
              background: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 70%)'
                : 'radial-gradient(circle at center, rgba(147,51,234,1) 0%, rgba(147,51,234,0.5) 70%)',
              boxShadow: theme === 'dark'
                ? '0 0 12px rgba(255,255,255,0.9)'
                : '0 0 12px rgba(147,51,234,0.9)',
              transition: 'opacity 0.3s ease-out',
              zIndex: 9999
            }}
          />
        ))}
      </div>

      <button
        ref={buttonRef}
        onClick={handleClick}
        className="bg-slate-800 no-underline group cursor-pointer relative rounded-full p-px text-xs font-semibold leading-6 text-white inline-block overflow-hidden"
        style={{
          boxShadow: theme === 'light'
            ? '0 0 15px rgba(30, 64, 175, 0.7), 0 0 30px rgba(30, 64, 175, 0.4), 0 0 45px rgba(30, 64, 175, 0.2)'
            : '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3), 0 0 45px rgba(59, 130, 246, 0.1)',
          animation: 'pulse-shadow 3s infinite'
        }}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex items-center justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
          <span>
            Hi I'm Kush
          </span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
    </div>
  );
};

export default Button