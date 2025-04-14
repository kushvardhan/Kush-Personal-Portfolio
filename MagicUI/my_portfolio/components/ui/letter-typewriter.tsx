"use client";

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface LetterTypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  cursorClassName?: string;
}

export const LetterTypewriter: React.FC<LetterTypewriterProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1000,
  className,
  cursorClassName,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenPhrases);
      return () => clearTimeout(timeout);
    }

    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText === currentPhrase) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isWaiting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        {displayText.split('').map((char, index) => (
          // Preserve spaces in the text
          char === ' ' ? (
            <span key={`${index}-space`} className="inline-block w-2"></span>
          ) : (
          <motion.span
            key={`${index}-${char}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block text-zinc-900 dark:text-blue-400 transition-colors duration-300"
          >
            {char}
          </motion.span>
        )))}
        <span
          className={cn(
            "inline-block rounded-sm w-[4px] h-5 sm:h-7 xl:h-9 bg-blue-600 dark:bg-blue-400 ml-1 animate-blink",
            cursorClassName
          )}
        ></span>
      </div>
    </div>
  );
};
