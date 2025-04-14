"use client"

import { motion } from "framer-motion";
import React from "react";
import { FaCss3Alt, FaDatabase, FaDocker, FaGitAlt, FaHtml5, FaJava, FaLinux, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiExpress, SiJavascript, SiMongodb, SiTailwindcss } from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: "Java", icon: FaJava, color: "text-red-500" },
    { name: "Python", icon: FaPython, color: "text-blue-500" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
    { name: "MySQL", icon: FaDatabase, color: "text-blue-400" },
    { name: "React", icon: FaReact, color: "text-blue-400" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },

    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "Linux", icon: FaLinux, color: "text-yellow-600" },
    { name: "Docker", icon: FaDocker, color: "text-blue-600" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    { name: "Express.js", icon: SiExpress, color: "text-zinc-900 dark:text-gray-400" },
    { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
    { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="skills" className="relative py-16 md:py-24 text-zinc-900 dark:text-white w-full bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 relative inline-block">
            Tech <span className="text-blue-500">Stack</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto transition-colors duration-300">
            Technologies I use to build modern web applications
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Define types for SkillCard component props
interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const Icon = skill.icon;

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5, scale: 1.03 }}
      className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-700/20 dark:to-purple-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="p-4 md:p-6 flex flex-col items-center justify-center h-full relative z-10">
        <div
          className={`text-4xl md:text-5xl lg:text-6xl ${skill.color} mb-3 md:mb-4 group-hover:scale-125 transition-all duration-300 drop-shadow-lg`}
        >
          <Icon />
        </div>

        <h3 className="text-sm md:text-base font-medium text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
      </div>
    </motion.div>
  );
};

export default Skills;