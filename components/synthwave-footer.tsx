"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function SynthWaveFooter() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/albertomarinmorales-coder",
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:text-purple-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/alberto-marin-morales/",
      color: "from-cyan-500 to-blue-500",
      hoverColor: "hover:text-cyan-400",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contact@example.com",
      color: "from-pink-500 to-purple-500",
      hoverColor: "hover:text-pink-400",
    },
  ];

  return (
    <motion.footer 
      className="relative mt-auto border-t border-primary/20 overflow-hidden"
      layout
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 2
      }}
    >
      {/* Grid de fondo retro */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Línea superior brillante */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 py-4">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 max-w-5xl mx-auto">
          {/* Columna 1: Logo ALBERTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-start space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mt-1">
                <Code2 className="w-5 h-5 text-background" />
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                ALBERTO
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary/80">
              <Zap className="w-3 h-3" />
              <span className="font-mono">Building the future, one line at a time</span>
            </div>
          </motion.div>

          {/* Columna 2: Full Stack Developer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-2 flex flex-col items-start"
          >
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed text-left">
              {t("footer.branding.tagline")}
            </p>
          </motion.div>

          {/* Columna 3: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-2 flex flex-col items-start"
          >
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
              {t("footer.connect.title")}
            </h4>
            <div className="flex gap-2.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                    
                    {/* Icon container */}
                    <div className="relative w-8 h-8 bg-background/50 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center group-hover:border-primary/60 transition-all duration-300">
                      <Icon className={`w-3.5 h-3.5 text-muted-foreground ${social.hoverColor} transition-colors duration-300`} />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divisor con efecto retro */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-3" />

        {/* Bottom section - Mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2 text-center"
        >
          {/* Copyright y tech stack juntos */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-muted-foreground">
            <span>{t("footer.copyright").replace("{year}", currentYear.toString())}</span>
            <span className="hidden md:inline text-primary/40">•</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono">
                {t("footer.poweredBy")} <span className="text-primary font-semibold">Next.js 15</span>
              </span>
              <span className="text-primary/40">•</span>
              <span className="font-mono">
                {t("footer.styledWith")} <span className="text-secondary font-semibold">Tailwind v4</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Efecto de partículas/estrellas opcional */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
          {[
            { left: 89.13, top: 83.91, duration: 3.2, delay: 0.5 },
            { left: 35.36, top: 18.49, duration: 2.8, delay: 1.2 },
            { left: 3.55, top: 30.70, duration: 4.1, delay: 0.8 },
            { left: 4.27, top: 95.56, duration: 2.5, delay: 1.8 },
            { left: 25.74, top: 97.32, duration: 3.6, delay: 0.3 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow effect en la parte inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[60px] bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
    </motion.footer>
  );
}
