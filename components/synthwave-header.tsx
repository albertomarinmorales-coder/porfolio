"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SynthWaveHeader() {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generar alturas aleatorias solo en el cliente
    setBarHeights(Array.from({ length: 40 }, () => Math.random() * 20 + 10));
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="relative flex flex-col items-center pt-8">
        {/* Nombre ALBERTO con efecto SynthWave */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-wider relative">
            {/* Capas de texto para efecto 3D - reducido al mínimo */}
            <span className="absolute inset-0 text-primary/10 blur-sm">
              ALBERTO
            </span>
            <span className="absolute inset-0 text-secondary/15 translate-x-0.5 translate-y-0.5">
              ALBERTO
            </span>
            <span className="absolute inset-0 text-accent/15 -translate-x-0.5 -translate-y-0.5">
              ALBERTO
            </span>
            
            {/* Texto principal con gradiente */}
            <span
              className="relative bg-gradient-to-b from-primary via-secondary to-accent bg-clip-text text-transparent"
              style={{
                textShadow: `
                  0 0 10px hsl(var(--primary) / 0.5),
                  0 0 20px hsl(var(--primary) / 0.4),
                  0 0 30px hsl(var(--secondary) / 0.3),
                  0 0 40px hsl(var(--accent) / 0.2),
                  0 0 70px hsl(var(--primary) / 0.1),
                  0 0 100px hsl(var(--secondary) / 0.1)
                `,
              }}
            >
              ALBERT
              <span className="relative inline-block">
                O
                {/* Web Developer debajo de la O */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap"
                >
                  <span className="text-sm md:text-base lg:text-lg font-medium text-secondary tracking-wide block">
                    &lt;Web Developer /&gt;
                  </span>
                </motion.span>
              </span>
            </span>
          </h1>

          {/* Líneas decorativas estilo SynthWave - Ecualizador animado */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1">
            {barHeights.map((height, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-primary/50 to-transparent origin-bottom"
                animate={{
                  height: [
                    `${height * 0.3}px`,
                    `${height}px`,
                    `${height * 0.5}px`,
                    `${height * 0.8}px`,
                    `${height * 0.4}px`,
                    `${height}px`,
                  ],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.02,
                }}
                style={{
                  height: `${height}px`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Efecto de resplandor de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/10 blur-[60px] rounded-full pointer-events-none" />
      </div>

      {/* Gradiente fade hacia abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </div>
  );
}
