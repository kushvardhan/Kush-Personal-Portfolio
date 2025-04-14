"use client"

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  GitHubIcon,
  HomeIcon,
  LinkedInIcon,
  ProjectsIcon,
  SkillsIcon
} from "./CustomIcons";



export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-white dark:text-white" />
      ),
      href: "#hero",
    },

    {
      title: "Projects",
      icon: (
        <ProjectsIcon className="h-full w-full text-white dark:text-white" />
      ),
      href: "#projects",
    },
    {
      title: "Skills",
      icon: (
        <SkillsIcon className="h-full w-full text-white dark:text-white" />
      ),
      href: "#skills",
    },
    {
      title: "Linkedin",
      icon: (
        <LinkedInIcon className="h-full w-full text-white dark:text-white" />
      ),
      href: "https://linkedin.com/in/kush-vardhan-48996a251/",
    },
    {
      title: "GitHub",
      icon: (
        <GitHubIcon className="h-full w-full text-white dark:text-white" />
      ),
      href: "https://github.com/kushvardhan",
    },
  ];
  return (
    <div className="fixed bottom-8 flex left-32  sm:left-0 items-end justify-center h-16 w-full">
    <FloatingDock
        items={links}
    />
    </div>

  );
}
