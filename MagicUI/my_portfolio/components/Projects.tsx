"use client"

import { motion } from "framer-motion"
import { Code, ExternalLink, Eye } from "lucide-react"
import { useState } from "react"
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from "react-icons/si"

interface Project {
  title: string
  url: string
  github: string
  imageUrl: string
  techStack: string[]
}

export default function Projects() {
  const [, setHoveredIndex] = useState<number | null>(null)

  const projects: Project[] = [
    {
      title: "KV Stream",
      url: "https://kv-stream-kush-vardhans-projects.vercel.app/",
      imageUrl: `/KVStreamSS.png`,
      github: "https://github.com/kushvardhan/KV-Stream",
      techStack: ["JavaScript", "React", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Elegant Moments",
      url: "https://elegant-moments.vercel.app/",
      imageUrl: `/ElegantMomentFront.png`,
      github: "https://github.com/kushvardhan/elegant-moments",
      techStack: ["React", "Tailwind CSS"],
    }
  ]

  const getTechIcon = (tech: string) => {
    switch (tech) {
      case "Next.js":
        // Return a different icon instead of Next.js
        return <SiVercel className="text-zinc-900 dark:text-white transition-colors duration-300" title="Next.js" />
      case "React":
        return <SiReact className="text-cyan-400" title="React" />
      case "Node.js":
        return <SiNodedotjs className="text-green-500" title="Node.js" />
      case "Express":
        return <SiExpress className="text-zinc-900 dark:text-white transition-colors duration-300" title="Express" />
      case "MongoDB":
        return <SiMongodb className="text-green-700" title="MongoDB" />
      case "Tailwind CSS":
        return <SiTailwindcss className="text-blue-500" title="Tailwind CSS" />
      case "TypeScript":
        return <SiTypescript className="text-blue-600" title="TypeScript" />
      case "JavaScript":
        return <SiJavascript className="text-yellow-400" title="JavaScript" />
      case "Framer Motion":
        return (
          <motion.div
            className="text-purple-500 font-bold text-xs"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            title="Framer Motion"
          >
            FM
          </motion.div>
        )
      default:
        return <SiVercel className="text-zinc-900 dark:text-white transition-colors duration-300" title={tech} />
    }
  }

  return (
    <section id="projects" className="pt-4 pb-20 bg-gray-50 dark:bg-zinc-900 text-zinc-900 dark:text-white w-full transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
        <motion.div
          className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-[#f1f5f966] via-[#f1f5f9] via-51% to-[#f1f5f966] text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >

          <h2 className="text-3xl md:text-5xl text-zinc-900 dark:text-white lg:text-6xl font-bold relative inline-block">
            <span className="text-zinc-900 dark:text-white">My</span> <span className="text-blue-500">Projects</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
        </motion.div>
          <p className="text-gray-400  max-w-lg mx-auto text-sm md:text-base">
            A showcase of my web development journey and projects.
          </p>
        </div>



        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mx-auto max-w-5xl px-2 md:px-6 lg:px-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800/50 h-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group-hover:border-blue-300 dark:group-hover:border-blue-500/50">
                {/* Project Image */}
                <div className="relative overflow-hidden lg:h-[180px] xl:h-[200px] 2xl:h-[220px]">
                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-purple-500/50 to-transparent dark:from-gray-900/90 dark:via-blue-900/40 dark:to-transparent opacity-80"></div>

                  {/* Action buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/80 dark:bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-600 transition-colors border border-blue-200 dark:border-transparent"
                      aria-label={`Visit ${project.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-500 transition-colors border border-blue-200 dark:border-transparent"
                      aria-label={`View code for ${project.title}`}
                    >
                      <Code className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                      aria-label={`External link to ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-zinc-500 dark:text-gray-500 text-xs mb-3 truncate">{project.url.replace("http://", "")}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 bg-blue-50 dark:bg-gray-800/50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-700 dark:text-gray-300 border border-blue-100 dark:border-transparent"
                        title={tech}
                      >
                        <span className="text-base">{getTechIcon(tech)}</span>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all projects button */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/kushvardhan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-indigo-700 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 text-white font-medium rounded-full transition-all shadow-md hover:shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 text-sm"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}