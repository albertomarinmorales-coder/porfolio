"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Leer tema del localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDarkTheme = savedTheme === "dark";
      setIsDark(isDarkTheme);
      if (isDarkTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Si no hay tema guardado, usar preferencia del sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    
    // Crear un overlay suave para la transición
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = newTheme ? '#0c1017' : '#fafafa';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 1s ease-in-out';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    
    document.body.appendChild(overlay);
    
    // Iniciar la transición suave
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    
    // Cambiar el tema a la mitad de la transición
    setTimeout(() => {
      setIsDark(newTheme);
      
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      
      // Comenzar a desvanecer el overlay
      overlay.style.opacity = '0';
    }, 500);
    
    // Remover el overlay después de que termine
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20 glow-border hover:border-primary/40 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-primary" />
        ) : (
          <Sun className="w-5 h-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
}
