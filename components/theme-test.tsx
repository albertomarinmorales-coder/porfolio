"use client";

import { useEffect } from "react";

export function ThemeTest() {
  useEffect(() => {
    // Test manual para verificar que las variables CSS cambian
    const interval = setInterval(() => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      const bgColor = computedStyle.getPropertyValue('--background');
      const hasDarkClass = root.classList.contains('dark');
      
      console.log('Theme Debug:', {
        hasDarkClass,
        backgroundColor: bgColor,
        allClasses: root.className
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
