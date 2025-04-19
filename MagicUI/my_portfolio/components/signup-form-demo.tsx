"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconMail,
  IconPhone
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div
      id="contact"
      className="w-full md:mb-24 mx-auto h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-none md:rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800 transition-colors duration-300"
    >
      {/* Contact Info Section */}
      <section className="flex flex-col justify-center items-center md:w-1/2 text-center space-y-6 md:space-y-8">
        <div className="text-3xl md:text-5xl text-zinc-900 dark:text-white lg:text-6xl font-bold relative inline-block transition-colors duration-300">
            Contact <span className="text-blue-500">Me</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        <p className="text-sm md:text-base max-w-md text-zinc-700 dark:text-neutral-300 px-4 transition-colors duration-300">
          Have a project in mind? I&apos;d love to hear from you! Reach out to me, and let&apos;s turn your ideas into reality.
        </p>

        <div className="flex flex-col space-y-6 w-full max-w-xs items-center">
          {/* Call Me Button */}
          <button
            className="relative group/btn flex items-center justify-center px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all w-40 border border-transparent hover:border-white/20"
            type="button"
            onClick={() => copyToClipboard('+91 9835504582', 'phone')}
          >
            <div className="flex items-center space-x-2 w-full justify-center">
              <IconPhone className="h-5 w-5" />
              <span>Call Me</span>
            </div>
            {copiedPhone && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                <div className="flex items-center space-x-1">
                  <IconCheck className="h-3 w-3" />
                  <span>Copied!</span>
                </div>
              </div>
            )}
            <BottomGradient />
          </button>

          {/* Email Me Button */}
          <button
            className="relative group/btn flex items-center justify-center px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all w-40 border border-transparent hover:border-white/20"
            type="button"
          >
            <Link href="mailto:kushvardhan39797@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 w-full justify-center">
              <IconMail className="h-5 w-5" />
              <span>Email Me</span>
            </Link>
            <BottomGradient />
          </button>

          {/* GitHub Button */}
          <button
            className="relative group/btn flex items-center justify-center px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all w-40 border border-transparent hover:border-white/20"
            type="button"
          >
            <Link href="https://github.com/kushvardhan" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 w-full justify-center">
              <IconBrandGithub className="h-5 w-5" />
              <span>GitHub</span>
            </Link>
            <BottomGradient />
          </button>

          {/* LinkedIn Button */}
          <button
            className="relative group/btn flex items-center justify-center px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all w-40 border border-transparent hover:border-white/20"
            type="button"
          >
            <Link href="https://linkedin.com/in/kush-vardhan-48996a251/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 w-full justify-center">
              <IconBrandLinkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </Link>
            <BottomGradient />
          </button>
        </div>

      </section>


    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

