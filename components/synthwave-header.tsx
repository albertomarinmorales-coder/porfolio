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
            {/* Capas de texto para efecto 3D */}
            <span className="absolute inset-0 text-primary/20 blur-2xl">
              ALBERTO
            </span>
            <span className="absolute inset-0 text-secondary/30 translate-x-1 translate-y-1 blur-lg">
              ALBERTO
            </span>
            <span className="absolute inset-0 text-accent/30 -translate-x-1 -translate-y-1 blur-lg">
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

          {/* Líneas decorativas estilo SynthWave */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1">
            {barHeights.map((height, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  delay: 0.3 + i * 0.01,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="w-1 bg-gradient-to-t from-primary/50 to-transparent origin-bottom"
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
