"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface SequentialTypewriterProps {
  phrases: {
    text: string;
    className?: string;
  }[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  cursorClassName?: string;
}

export const SequentialTypewriter: React.FC<SequentialTypewriterProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1000,
  className,
  cursorClassName,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
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

    const currentPhrase = phrases[currentPhraseIndex].text;

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === currentPhrase) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  const currentPhrase = phrases[currentPhraseIndex];

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
        <span className={currentPhrase.className}>{currentText}</span>
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
