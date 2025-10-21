"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Componente Matrix Code Effect
function MatrixCodeEffect() {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  const finalText = "< Full Stack Developer />";
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]|\\:;\"'<>,.?/~`+-=_";
  
  useEffect(() => {
    let currentIndex = 0;
    const totalDuration = 2000; // 2 segundos para completar
    const interval = totalDuration / finalText.length;
    
    const animate = () => {
      if (currentIndex <= finalText.length) {
        // Texto ya formado + caracteres aleatorios para el resto
        const formedPart = finalText.slice(0, currentIndex);
        const remainingLength = Math.max(0, finalText.length - currentIndex);
        const randomPart = Array.from({ length: remainingLength }, () => 
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ).join("");
        
        setDisplayText(formedPart + randomPart);
        currentIndex++;
        
        if (currentIndex > finalText.length) {
          setDisplayText(finalText);
          setIsComplete(true);
        } else {
          setTimeout(animate, interval);
        }
      }
    };
    
    // Iniciar la animación después de un pequeño delay
    const startTimer = setTimeout(animate, 500);
    
    return () => clearTimeout(startTimer);
  }, []);
  
  return (
    <div className="relative">
      {/* Texto durante la animación Matrix */}
      {!isComplete && (
        <motion.span
          className="text-lg md:text-xl lg:text-2xl font-mono font-bold tracking-widest block text-secondary/80"
          style={{
            textShadow: "0 0 5px hsl(var(--secondary) / 0.5)",
            filter: "blur(0.5px)",
          }}
        >
          {displayText}
        </motion.span>
      )}
      
      {/* Texto final con degradado - SIN PARPADEO */}
      {isComplete && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // Mantener opacidad fija
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl font-mono font-bold tracking-widest block text-transparent bg-linear-to-r from-secondary to-primary bg-clip-text no-cursor"
          style={{
            textShadow: "0 0 10px hsl(var(--secondary) / 0.6), 0 0 20px hsl(var(--primary) / 0.4)",
            animation: "none !important", // Quitar cualquier animación
            caretColor: "transparent", // Ocultar cursor de texto
            WebkitAnimation: "none !important", // Para Safari
            MozAnimation: "none !important", // Para Firefox
          }}
        >
          <span style={{ 
            position: "relative",
            display: "inline-block"
          }}>
            {finalText}
          </span>
        </motion.span>
      )}
      
    </div>
  );
}

export function SynthWaveHeader() {
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [oBlink, setOBlink] = useState(true); // Estado para el parpadeo de la O

  useEffect(() => {
    // Generar alturas aleatorias más pequeñas para el ecualizador
    setBarHeights(Array.from({ length: 50 }, () => Math.random() * 12 + 4));
    
    // Efecto de LED roto para la O - parpadeo aleatorio
    const startOBlinking = () => {
      const blinkInterval = setInterval(() => {
        // Parpadeo aleatorio: 90% tiempo encendido, 10% apagado
        if (Math.random() < 0.1) {
          setOBlink(false);
          setTimeout(() => setOBlink(true), 50 + Math.random() * 200); // Apagado entre 50-250ms
        }
      }, 100 + Math.random() * 400); // Cada 100-500ms

      return blinkInterval;
    };

    const oBlinkInterval = startOBlinking();
    
    // Función para programar el próximo glitch con timing completamente random
    const scheduleNextGlitch = () => {
      // Tiempo random entre 4-12 segundos (antes era 2-8)
      const nextGlitchTime = 4000 + Math.random() * 8000;
      
      setTimeout(() => {
        // LED roto: apagar-encender-apagar muy rápido
        
        // Primer apagón (un poco más largo)
        setGlitchActive(true);
        
        setTimeout(() => {
          setGlitchActive(false); // Se apaga al instante
          
          setTimeout(() => {
            setGlitchActive(true); // Se enciende al instante
            
            setTimeout(() => {
              setGlitchActive(false); // Se apaga de nuevo al instante
              
              // Programar el siguiente doble glitch
              scheduleNextGlitch();
              
            }, 120); // Se apaga después de 120ms (más tiempo)
            
          }, 80); // Pausa de 80ms (apagado, más tiempo)
          
        }, 120); // Primer glitch dura 120ms (más tiempo)
        
      }, nextGlitchTime);
    };

    // Iniciar el primer glitch después de 5 segundos (antes era 3)
    setTimeout(() => {
      scheduleNextGlitch();
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(oBlinkInterval);
    };
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
                  className="absolute inset-0 text-red-400/45 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 10 - 5}px) translateY(${Math.random() * 6 - 3}px) skewX(${Math.random() * 12 - 6}deg)`,
                    filter: `hue-rotate(${Math.random() * 40}deg) contrast(140%)`,
                    clipPath: `polygon(0 ${Math.random() * 20}%, 100% ${Math.random() * 20}%, 100% ${80 + Math.random() * 20}%, 0 ${80 + Math.random() * 20}%)`
                  }}
                >
                  ALBERTO
                </span>
                <span 
                  className="absolute inset-0 text-blue-800/40 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 12 - 6}px) translateY(${Math.random() * 8 - 4}px) scaleY(${0.85 + Math.random() * 0.3})`,
                    filter: `hue-rotate(${Math.random() * 60}deg) brightness(130%)`,
                    clipPath: `polygon(${Math.random() * 25}% 0, 100% 0, ${75 + Math.random() * 25}% 100%, 0 100%)`
                  }}
                >
                  ALBERTO
                </span>
                <span 
                  className="absolute inset-0 text-red-600/35 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 8 - 4}px) translateY(${Math.random() * 10 - 5}px) skewY(${Math.random() * 10 - 5}deg)`,
                    filter: `hue-rotate(${Math.random() * 30}deg) saturate(150%)`,
                    opacity: Math.random() * 0.5 + 0.4,
                    clipPath: `polygon(0 0, ${50 + Math.random() * 50}% 0, 100% ${Math.random() * 30}%, 100% 100%, ${Math.random() * 50}% 100%, 0 ${70 + Math.random() * 30}%)`
                  }}
                >
                  ALBERTO
                </span>
                <span 
                  className="absolute inset-0 text-blue-900/30 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 14 - 7}px) translateY(${Math.random() * 5 - 2.5}px) rotate(${Math.random() * 3 - 1.5}deg)`,
                    filter: `blur(${Math.random() * 1.5}px) contrast(120%)`,
                    opacity: Math.random() * 0.4 + 0.3,
                    textShadow: `${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px ${Math.random() * 12}px rgba(30,58,138,0.6)`
                  }}
                >
                  ALBERTO
                </span>
                <span 
                  className="absolute inset-0 text-red-500/25 animate-pulse"
                  style={{
                    transform: `translateX(${Math.random() * 9 - 4.5}px) translateY(${Math.random() * 7 - 3.5}px) scaleX(${0.8 + Math.random() * 0.4})`,
                    filter: `hue-rotate(${Math.random() * 50}deg) brightness(110%)`,
                    opacity: Math.random() * 0.4 + 0.25,
                    mixBlendMode: 'multiply'
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
              className="relative bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-move"
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
              <span className={`relative inline-block transition-all duration-75 ${
                oBlink ? 'opacity-100' : 'opacity-20'
              } ${
                !oBlink ? 'text-red-500/50 animate-pulse' : ''
              }`}>
                O
                {/* Matrix Code Effect - ÉPICO */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-8 whitespace-nowrap"
                >
                  <MatrixCodeEffect />
                </motion.div>
              </span>
            </span>
          </h1>

          {/* Ecualizador ÉPICO - Barras más dinámicas y coloridas */}
          <div className="absolute top-full left-0 right-0 flex justify-center gap-0.5 z-10">
            {barHeights.map((height, i) => (
              <motion.div
                key={i}
                className={`w-1.5 origin-bottom ${
                  i % 4 === 0 ? 'bg-linear-to-t from-primary/60 via-primary/40 to-primary/20' :
                  i % 4 === 1 ? 'bg-linear-to-t from-secondary/60 via-secondary/40 to-secondary/20' :
                  i % 4 === 2 ? 'bg-linear-to-t from-accent/60 via-accent/40 to-accent/20' :
                  'bg-linear-to-t from-primary/40 via-secondary/30 to-accent/20'
                }`}
                animate={{
                  height: [
                    `2px`,
                    `${height * 1.8}px`,
                    `${height * 0.6}px`,
                    `${height * 1.4}px`,
                    `${height * 0.4}px`,
                    `${height * 1.6}px`,
                    `${height * 0.8}px`,
                  ],
                  opacity: [0.6, 1, 0.8, 1, 0.7, 1, 0.9],
                }}
                transition={{
                  duration: 1.6 + Math.random() * 1.0,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.015,
                }}
                style={{
                  height: `2px`,
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
