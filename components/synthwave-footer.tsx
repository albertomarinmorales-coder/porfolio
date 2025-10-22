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
    <footer className="relative mt-auto border-t border-primary/20 overflow-hidden">
      {/* Grid de fondo retro */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Línea superior brillante */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Sección de Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                ALBERTO
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t("footer.branding.tagline")}
            </p>
            <div className="flex items-center gap-2 text-sm text-primary/80">
              <Zap className="w-4 h-4" />
              <span className="font-mono">Building the future, one line at a time</span>
            </div>
          </motion.div>

          {/* Sección de Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              {t("footer.quickLinks.title")}
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { key: "about", label: t("footer.quickLinks.about") },
                { key: "projects", label: t("footer.quickLinks.projects") },
                { key: "skills", label: t("footer.quickLinks.skills") },
                { key: "contact", label: t("footer.quickLinks.contact") }
              ].map((item, index) => (
                <motion.a
                  key={item.key}
                  href={`#${item.key}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group w-fit"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-0 h-[2px] bg-primary group-hover:w-4 transition-all duration-300" />
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Sección de Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              {t("footer.connect.title")}
            </h4>
            <div className="flex gap-4">
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
                    <div className="relative w-12 h-12 bg-background/50 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center group-hover:border-primary/60 transition-all duration-300">
                      <Icon className={`w-5 h-5 text-muted-foreground ${social.hoverColor} transition-colors duration-300`} />
                    </div>
                  </motion.a>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {t("footer.connect.description")}
            </p>
          </motion.div>
        </div>

        {/* Divisor con efecto retro */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

        {/* Bottom section - Mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 text-center"
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
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow effect en la parte inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
    </footer>
  );
}
