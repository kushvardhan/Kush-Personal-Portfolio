"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../providers/theme-provider";

export const AnimatedGradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create gradient points with theme-specific colors
    const darkThemeColors = ["#2563eb", "#1e40af", "#3b82f6", "#1d4ed8"];
    const lightThemeColors = ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"];

    const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;

    const gradientPoints = [
      { x: canvas.width * 0.1, y: canvas.height * 0.1, color: colors[0], radius: 300 },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, color: colors[1], radius: 250 },
      { x: canvas.width * 0.3, y: canvas.height * 0.7, color: colors[2], radius: 200 },
      { x: canvas.width * 0.7, y: canvas.height * 0.8, color: colors[3], radius: 350 },
    ];

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    // Animation function
    const animate = () => {
      time += 0.005;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update gradient points
      gradientPoints.forEach((point, i) => {
        point.x = canvas.width * (0.2 + 0.6 * (Math.sin(time + i) * 0.5 + 0.5));
        point.y = canvas.height * (0.2 + 0.6 * (Math.cos(time * 0.8 + i) * 0.5 + 0.5));
      });

      // Draw gradients
      gradientPoints.forEach((point) => {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        );

        gradient.addColorStop(0, `${point.color}30`);
        gradient.addColorStop(1, `${point.color}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full opacity-30 pointer-events-none"
    />
  );
};
