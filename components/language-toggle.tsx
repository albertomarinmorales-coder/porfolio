"use client";

import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string } = {}) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className={cn(
        "fixed top-6 right-20 z-50 rounded-lg border border-primary/20 bg-background/80 p-3 glow-border transition-colors hover:border-primary/40",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
      title={`${language === "es" ? "Change to English" : "Cambiar a Español"}`}
    >
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-primary text-sm font-medium">
          {language.toUpperCase()}
        </span>
      </div>
    </motion.button>
  );
}