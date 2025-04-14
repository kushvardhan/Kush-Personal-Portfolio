"use client";

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface WordTypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  cursorClassName?: string;
}

export const WordTypewriter: React.FC<WordTypewriterProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1000,
  className,
  cursorClassName,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize words when phrase changes
  useEffect(() => {
    setWords(phrases[currentPhraseIndex].split(' '));
    setCurrentWordIndex(0);
    setIsDeleting(false);
    setIsComplete(false);
  }, [currentPhraseIndex, phrases]);

  // Pre-calculate all animation states to avoid stuttering
  useEffect(() => {
    // Only run this on the client side
    if (typeof window === 'undefined') return;

    const totalDuration = 5000; // 5 seconds for the whole animation
    const typingDuration = 1500; // 1.5 seconds for typing
    const deletingDuration = 1000; // 1 second for deleting
    const pauseDuration = totalDuration - typingDuration - deletingDuration;

    let animationFrame: number;

    const animate = (time: number) => {
      // Calculate the phase of the animation (0-1)
      const cycleTime = time % totalDuration;

      if (cycleTime < typingDuration) {
        // Typing phase
        const progress = cycleTime / typingDuration;
        const wordIndex = Math.min(Math.floor(progress * words.length), words.length);

        if (wordIndex !== currentWordIndex) {
          setCurrentWordIndex(wordIndex);
        }

        if (isDeleting) setIsDeleting(false);
        if (isComplete && wordIndex < words.length) setIsComplete(false);
      }
      else if (cycleTime < typingDuration + pauseDuration) {
        // Pause phase
        if (!isComplete && currentWordIndex >= words.length) {
          setIsComplete(true);
        }
      }
      else {
        // Deleting phase
        const deleteTime = cycleTime - typingDuration - pauseDuration;
        const progress = deleteTime / deletingDuration;
        const wordIndex = Math.max(words.length - Math.floor(progress * words.length) - 1, 0);

        if (!isDeleting) setIsDeleting(true);

        if (wordIndex !== currentWordIndex) {
          setCurrentWordIndex(wordIndex);
        }

        if (wordIndex === 0 && deleteTime > deletingDuration - 50) {
          // Near the end of deletion, prepare for next phrase
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [words, phrases.length, currentPhraseIndex]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold flex flex-wrap justify-center">
        {words.slice(0, currentWordIndex).map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mr-2 ${index === currentWordIndex - 1 ? 'text-blue-500' : 'text-white'}`}
          >
            {word}
          </motion.span>
        ))}
        <span
          className={cn(
            "inline-block rounded-sm w-[4px] h-4 sm:h-6 xl:h-8 bg-blue-500 ml-1 animate-blink",
            cursorClassName
          )}
        ></span>
      </div>
    </div>
  );
};
