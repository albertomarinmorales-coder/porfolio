"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SynthWaveHeader() {
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Generar alturas aleatorias más intensas para el ecualizador
    setBarHeights(Array.from({ length: 50 }, () => Math.random() * 35 + 15));
    
    // Función para programar el próximo glitch con timing completamente random
    const scheduleNextGlitch = () => {
      // Tiempo random entre 2-8 segundos
      const nextGlitchTime = 2000 + Math.random() * 6000;
      
      setTimeout(() => {
        // Duración del glitch también random (100-400ms)
        const glitchDuration = 100 + Math.random() * 300;
        
        setGlitchActive(true);
        
        setTimeout(() => {
          setGlitchActive(false);
          // Programar el siguiente glitch
          scheduleNextGlitch();
        }, glitchDuration);
        
      }, nextGlitchTime);
    };

    // Iniciar el primer glitch después de 3 segundos
    setTimeout(() => {
      scheduleNextGlitch();
    }, 3000);

    // No necesitamos cleanup porque cada timeout se programa individualmente
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="relative flex flex-col items-center pt-0">
        {/* Nombre ALBERTO con efecto SynthWave */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-wider relative transition-all duration-100 ${
            glitchActive ? 'animate-pulse' : ''
          }`}>
            {/* Capas de glitch ÉPICAS - solo aparecen durante el glitch */}
            {glitchActive && (
              <>
                <span 
                  className="absolute inset-0 text-red-500/40 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 4 - 2}px) translateY(${Math.random() * 2 - 1}px)`,
                    filter: `hue-rotate(${Math.random() * 60}deg)`
                  }}
                >
                  ALBERTO
                </span>
                <span 
                  className="absolute inset-0 text-cyan-500/40 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 4 - 2}px) translateY(${Math.random() * 2 - 1}px)`,
                    filter: `hue-rotate(${Math.random() * 60}deg)`
                  }}
                >
                  ALBERTO
                </span>
                <span 
                  className="absolute inset-0 text-green-500/30 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 3 - 1.5}px) translateY(${Math.random() * 3 - 1.5}px)`,
                    opacity: Math.random() * 0.8 + 0.2
                  }}
                >
                  ALBERTO
                </span>
              </>
            )}
            
            {/* Capas de sombra 3D mejoradas */}
            <span className="absolute inset-0 text-primary/20 blur-sm translate-x-1 translate-y-1">
              ALBERTO
            </span>
            <span className="absolute inset-0 text-secondary/25 translate-x-0.5 translate-y-0.5">
              ALBERTO
            </span>
            
            {/* Texto principal con gradiente ANIMADO */}
            <span
              className="relative bg-linear-to-r from-primary via-secondary via-accent to-primary bg-clip-text text-transparent animate-gradient-move"
              style={{
                backgroundSize: '200% 200%',
                textShadow: `
                  0 0 15px hsl(var(--primary) / 0.6),
                  0 0 25px hsl(var(--primary) / 0.5),
                  0 0 35px hsl(var(--secondary) / 0.4),
                  0 0 45px hsl(var(--accent) / 0.3),
                  0 0 80px hsl(var(--primary) / 0.2),
                  0 0 120px hsl(var(--secondary) / 0.1)
                `,
              }}
            >
              ALBERT
              <span className="relative inline-block">
                O
                {/* Subtitle mejorado con mejor tipografía */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-6 whitespace-nowrap"
                >
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-linear-to-r from-secondary to-accent bg-clip-text tracking-widest block drop-shadow-lg">
                    &lt; Full Stack Developer /&gt;
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="w-full h-0.5 bg-linear-to-r from-transparent via-accent to-transparent mt-2"
                  />
                </motion.span>
              </span>
            </span>
          </h1>

          {/* Ecualizador ÉPICO - Barras más dinámicas y coloridas */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-0.5">
            {barHeights.map((height, i) => (
              <motion.div
                key={i}
                className={`w-1.5 origin-bottom rounded-t-sm ${
                  i % 4 === 0 ? 'bg-linear-to-t from-primary/60 via-primary/40 to-primary/20' :
                  i % 4 === 1 ? 'bg-linear-to-t from-secondary/60 via-secondary/40 to-secondary/20' :
                  i % 4 === 2 ? 'bg-linear-to-t from-accent/60 via-accent/40 to-accent/20' :
                  'bg-linear-to-t from-primary/40 via-secondary/30 to-accent/20'
                }`}
                animate={{
                  height: [
                    `${height * 0.2}px`,
                    `${height * 1.2}px`,
                    `${height * 0.4}px`,
                    `${height * 0.9}px`,
                    `${height * 0.3}px`,
                    `${height * 1.1}px`,
                    `${height * 0.6}px`,
                  ],
                  opacity: [0.6, 1, 0.8, 1, 0.7, 1, 0.9],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.015,
                }}
                style={{
                  height: `${height}px`,
                  boxShadow: i % 8 === 0 ? `0 0 8px hsl(var(--primary) / 0.5)` :
                            i % 8 === 2 ? `0 0 8px hsl(var(--secondary) / 0.5)` :
                            i % 8 === 4 ? `0 0 8px hsl(var(--accent) / 0.5)` : 'none'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Efectos de resplandor mejorados con más intensidad */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/15 blur-[120px] rounded-full pointer-events-none"
          animate={{
            opacity: [0.8, 1, 0.9, 1],
            scale: [0.9, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[280px] bg-secondary/15 blur-[90px] rounded-full pointer-events-none"
          animate={{
            opacity: [0.7, 0.9, 0.8, 0.9],
            scale: [1, 0.9, 1.05, 1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[450px] h-[220px] bg-accent/15 blur-[70px] rounded-full pointer-events-none"
          animate={{
            opacity: [0.6, 0.8, 0.7, 0.8],
            scale: [0.95, 1, 0.9, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Gradiente fade hacia abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-background pointer-events-none" />
    </div>
  );
}
