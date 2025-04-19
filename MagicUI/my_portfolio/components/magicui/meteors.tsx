

export function MeteorDemo() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center">
      <span className="pointer-events-none whitespace-nowrap bg-gradient-to-b from-gray-400 to-gray-300/80 bg-clip-text text-center text-4xl md:text-7xl font-semibold text-transparent dark:from-white dark:to-slate-900/10">
        Hi, I&apos;m <span className="text-blue-500">Kush Vardhan.</span>
      </span>

      <div className="mt-8 relative">
        <div className="flex items-center justify-center space-x-2 text-sm md:text-base">
          <span className="h-[1px] w-6 bg-blue-400 dark:bg-blue-500"></span>
          <p className="font-medium text-center text-gray-900 dark:text-gray-300 tracking-wide">
            Actively looking for job opportunities and freelancing work
          </p>
          <span className="h-[1px] w-6 bg-blue-400 dark:bg-blue-500"></span>
        </div>
      </div>
    </div>
  );
}
