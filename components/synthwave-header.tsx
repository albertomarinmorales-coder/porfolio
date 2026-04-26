"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioConfig } from "@/lib/config";
import { MatrixCodeSubtitle } from "@/components/matrix-code-subtitle";

export function SynthWaveHeader() {
  const HERO_NAME = portfolioConfig.personal.heroName;
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    setBarHeights(Array.from({ length: 36 }, () => Math.random() * 3.5 + 1.5));
  }, []);

  return (
    <div className="synthwave-header-border pointer-events-none relative z-50 w-full">
      <div className="relative flex min-h-[min(18vh,150px)] flex-col items-center justify-center px-4 py-0.5 sm:min-h-[min(20vh,170px)] sm:py-1">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto relative flex w-full max-w-4xl flex-col items-center justify-center gap-px sm:gap-0.5"
        >
          <h1
            className="m-0 font-hero text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-center text-balance tracking-[0.02em] sm:tracking-[0.035em] max-w-[min(100%,40rem)] px-3 leading-none"
          >
            <span className="hero-title-gradient hero-title-gradient--glow inline-block">
              {HERO_NAME}
            </span>
          </h1>
          <div
            className="hero-title-rule w-44 min-w-[11rem] sm:w-56 md:w-64 lg:w-72 rounded-full"
            aria-hidden
          />

          <div
            className="flex h-2.5 w-full max-w-md items-end justify-center gap-0.5 opacity-45 sm:h-3"
            aria-hidden
          >
            {barHeights.map((height, i) => (
              <motion.div
                key={i}
                className="w-0.5 origin-bottom rounded-full bg-linear-to-t from-primary/30 via-primary/12 to-transparent"
                animate={{
                  height: [
                    "1px",
                    `${Math.min(height * 0.7, 10)}px`,
                    `${Math.min(height * 0.35, 6)}px`,
                    `${Math.min(height * 0.55, 8)}px`,
                    `${Math.min(height * 0.3, 5)}px`,
                  ],
                  opacity: [0.35, 0.55, 0.4, 0.5, 0.35],
                }}
                transition={{
                  duration: 1.4 + Math.random() * 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.02,
                }}
                style={{ height: "1px" }}
              />
            ))}
          </div>

          <div className="-mt-px w-full pr-1 text-right sm:pr-4 md:pr-8">
            <MatrixCodeSubtitle />
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(100vw,40rem)] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div className="absolute left-1/2 top-0 h-[280px] w-[min(100vw,36rem)] -translate-x-1/2 rounded-full bg-primary/6 blur-[100px]" />
          <div className="absolute left-1/2 top-20 h-[240px] w-[min(90vw,30rem)] -translate-x-1/2 rounded-full bg-secondary/5 blur-[80px]" />
        </div>
      </div>
    </div>
  );
}
