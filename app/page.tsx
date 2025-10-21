"use client";

import { XMBMenu, type MenuItem } from "@/components/xmb-menu";
import { SynthWaveHeader } from "@/components/synthwave-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { User, Gamepad2, FileText, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    // Solo en el cliente, verificar tema guardado o preferencia del sistema
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // valor por defecto del servidor
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detectar el tema actual inmediatamente
    const savedTheme = localStorage.getItem("theme");
    let currentIsDark = true;
    
    if (savedTheme) {
      currentIsDark = savedTheme === "dark";
    } else {
      currentIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    console.log("Tema inicial:", currentIsDark ? "oscuro" : "claro");
    setIsDark(currentIsDark);
    
    // Observar cambios en el tema
    const observer = new MutationObserver(() => {
      const isDarkTheme = document.documentElement.classList.contains("dark");
      console.log("Cambio de tema detectado:", isDarkTheme ? "oscuro" : "claro");
      setIsDark(isDarkTheme);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    
    return () => observer.disconnect();
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "about",
      title: "Sobre Mí",
      icon: User,
      subItems: [
        {
          id: "bio",
          title: "Biografía",
          description: "Soy Alberto Marín, desarrollador web y QA apasionado por crear experiencias digitales que sean claras, funcionales y atractivas.",
          content: mounted ? (
            <div className="flex flex-col gap-6 max-h-[250px] overflow-y-auto scrollbar-hide">
              {/* Contenedor de foto circular */}
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/30 to-secondary/30 border-2 border-primary/50 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(6,189,186,0.3)] relative">
                  {/* Imagen para tema claro */}
                  <img
                    src="/images/handsome/Handsome.png"
                    alt="Alberto Marín - Tema Claro"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                      isDark ? 'opacity-0' : 'opacity-100'
                    }`}
                    onError={(e) => {
                      console.log("Error cargando imagen clara:", e.currentTarget.src);
                    }}
                  />
                  {/* Imagen para tema oscuro */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isDark ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <img
                      src="/images/handsome/HandSomeSW.png"
                      alt="Alberto Marín - Tema Oscuro"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Error cargando imagen oscura:", e.currentTarget.src);
                      }}
                    />
                    {/* Overlay negro para reducir el brillo */}
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                  </div>
                  {/* Placeholder si fallan ambas imágenes */}
                  <div className="absolute inset-0 w-full h-full bg-muted/50 items-center justify-center text-muted-foreground text-sm hidden">
                    Foto de perfil
                  </div>
                </div>
              </div>
              
              {/* Texto sobre mí */}
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Soy Alberto Marín, desarrollador web y QA apasionado por crear experiencias digitales que sean claras, funcionales y atractivas. Antes de sumergirme en el mundo tech, trabajé como camarero, donde aprendí a gestionar múltiples tareas, resolver problemas bajo presión y mantener la atención al detalle en cada interacción.
                </p>
                <p>
                  Hoy combino esa disciplina con mi curiosidad y creatividad para construir proyectos que me desafían y me permiten seguir aprendiendo, siempre buscando soluciones eficientes y experiencias memorables para los usuarios.
                </p>
              </div>
              
              {/* INDICADOR TEMPORAL DE DEBUG */}
              <div style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px',
                textAlign: 'center',
                marginTop: '10px',
                fontWeight: 'bold'
              }}>
                🔥 BIOGRAFÍA DEBUG - INDICADOR ROJO 🔥
              </div>
            </div>
          ) : null,
        },
        {
          id: "skills",
          title: "Habilidades",
          description: "TypeScript, React, Next.js, Tailwind CSS, y más...",
          content: mounted ? (
            <div className="flex flex-col gap-6 max-h-[250px] overflow-y-auto scrollbar-hide pr-2">
              <div className="text-muted-foreground leading-relaxed space-y-6">
                <div>
                  <h4 className="text-primary font-semibold mb-3 text-sm uppercase tracking-wider">Frontend Development</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>TypeScript & JavaScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>React & Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Tailwind CSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Framer Motion</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-primary font-semibold mb-3 text-sm uppercase tracking-wider">Testing & Quality</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Manual QA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>User Testing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Bug Tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Process Improvement</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-primary font-semibold mb-3 text-sm uppercase tracking-wider">Soft Skills</h4>
                  <p className="text-sm">
                    <span className="text-secondary">Atención al detalle</span> desarrollada en hostelería, 
                    <span className="text-secondary"> resolución de problemas</span> bajo presión, 
                    <span className="text-secondary"> comunicación efectiva</span> con equipos y usuarios, 
                    y <span className="text-secondary">adaptabilidad</span> para aprender nuevas tecnologías rápidamente.
                  </p>
                </div>
                
                {/* Indicador de scroll */}
                <div className="flex justify-center mt-6 pointer-events-none">
                  <div className="flex items-center gap-2 text-primary/90 text-sm animate-bounce bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 shadow-lg">
                    <span>Desliza para ver más</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : null,
        },
        {
          id: "experience",
          title: "Experiencia",
          description: "Mi trayectoria profesional y proyectos destacados",
          content: mounted ? (
            <div className="flex flex-col gap-6 max-h-[250px] overflow-y-auto scrollbar-hide pr-2">
              <div className="text-muted-foreground leading-relaxed space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <h4 className="text-primary font-semibold text-sm uppercase tracking-wider">Desarrollador Frontend</h4>
                    <span className="text-xs text-secondary">2024 - Presente</span>
                  </div>
                  <p className="text-sm mb-2 text-secondary font-medium">Proyectos Personales & Freelance</p>
                  <p className="text-sm">
                    Desarrollo de aplicaciones web modernas con React, Next.js y TypeScript. 
                    Especializado en crear interfaces de usuario intuitivas y experiencias 
                    digitales que combinan funcionalidad con diseño atractivo.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <h4 className="text-primary font-semibold text-sm uppercase tracking-wider">Camarero</h4>
                    <span className="text-xs text-secondary">2020 - 2024</span>
                  </div>
                  <p className="text-sm mb-2 text-secondary font-medium">Sector Hostelería</p>
                  <p className="text-sm">
                    Gestión de múltiples tareas en entornos de alta presión, atención al cliente 
                    excepcional y trabajo en equipo. Desarrollé habilidades clave como la resolución 
                    rápida de problemas y la atención meticulosa al detalle.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-primary font-semibold mb-3 text-sm uppercase tracking-wider">Proyectos Destacados</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Portfolio SynthWave</span>
                      <span className="text-xs text-muted-foreground">Next.js, Tailwind</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">E-commerce Platform</span>
                      <span className="text-xs text-muted-foreground">Next.js, Stripe</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Task Management App</span>
                      <span className="text-xs text-muted-foreground">TypeScript, DnD</span>
                    </div>
                  </div>
                </div>
                
                {/* Indicador de scroll */}
                <div className="flex justify-center mt-6 pointer-events-none">
                  <div className="flex items-center gap-2 text-primary/90 text-sm animate-bounce bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 shadow-lg">
                    <span>Desliza para ver más</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : null,
        },
      ],
    },
    {
      id: "projects",
      title: "Proyectos",
      icon: Gamepad2,
      subItems: [
        {
          id: "project1",
          title: "Portfolio SynthWave",
          description: "Portfolio personal con estética retro y navegación tipo XMB",
          image: "/projects/portfolio.png",
        },
        {
          id: "project2",
          title: "E-commerce Platform",
          description: "Plataforma de comercio electrónico con Next.js y Stripe",
          image: "/projects/ecommerce.png",
        },
        {
          id: "project3",
          title: "Social Dashboard",
          description: "Dashboard de analytics en tiempo real con React y TypeScript",
          image: "/projects/dashboard.png",
        },
        {
          id: "project4",
          title: "Task Manager App",
          description: "Aplicación de gestión de tareas con drag & drop",
          image: "/projects/tasks.png",
        },
      ],
    },
    {
      id: "blog",
      title: "Blog",
      icon: FileText,
      subItems: [
        {
          id: "post1",
          title: "Construyendo con Next.js 14",
          description: "Explorando las nuevas características de Next.js y Server Components",
        },
        {
          id: "post2",
          title: "El poder de TypeScript",
          description: "Cómo TypeScript mejora la calidad del código",
        },
        {
          id: "post3",
          title: "Diseño SynthWave",
          description: "Creando interfaces con estética retro futurista",
        },
      ],
    },
    {
      id: "contact",
      title: "Contacto",
      icon: Mail,
      subItems: [
        {
          id: "email",
          title: "Email",
          description: "Envíame un mensaje directamente",
          content: mounted ? (
            <div className="flex flex-col gap-6 max-h-[250px] overflow-y-auto scrollbar-hide pr-2">
              <div className="text-muted-foreground leading-relaxed space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-linear-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center border-2 border-primary/50 shadow-[0_0_20px_rgba(6,189,186,0.3)]">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-primary font-semibold text-lg">¡Hablemos!</h3>
                  <p className="text-sm max-w-md mx-auto">
                    Si tienes algún proyecto en mente, quieres colaborar, o simplemente 
                    charlar sobre desarrollo web, no dudes en contactarme.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:albertomarinmorales@gmail.com"
                    className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_20px_rgba(6,189,186,0.2)]"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-primary group-hover:text-cyan-300 transition-colors">Enviar Email</p>
                      <p className="text-sm text-secondary group-hover:text-primary transition-colors">albertomarinmorales@gmail.com</p>
                    </div>
                    <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : null,
        },
        {
          id: "github",
          title: "GitHub",
          description: "Mis proyectos y contribuciones",
          content: mounted ? (
            <div className="flex flex-col gap-6 max-h-[250px] overflow-y-auto scrollbar-hide pr-2">
              <div className="text-muted-foreground leading-relaxed space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-linear-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center border-2 border-primary/50 shadow-[0_0_20px_rgba(6,189,186,0.3)]">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <h3 className="text-primary font-semibold text-lg">GitHub</h3>
                  <p className="text-sm max-w-md mx-auto">
                    Explora mis proyectos y contribuciones al código abierto. 
                    Aquí encontrarás todo mi trabajo de desarrollo.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="https://github.com/albertomarinmorales-coder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_20px_rgba(6,189,186,0.2)]"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-primary group-hover:text-cyan-300 transition-colors">Ver perfil de GitHub</p>
                      <p className="text-sm text-secondary group-hover:text-primary transition-colors">albertomarinmorales-coder</p>
                    </div>
                    <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : null,
        },
        {
          id: "linkedin",
          title: "LinkedIn",
          description: "Conectemos profesionalmente",
          content: mounted ? (
            <div className="flex flex-col gap-6 max-h-[250px] overflow-y-auto scrollbar-hide pr-2">
              <div className="text-muted-foreground leading-relaxed space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-linear-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center border-2 border-primary/50 shadow-[0_0_20px_rgba(6,189,186,0.3)]">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <h3 className="text-primary font-semibold text-lg">LinkedIn</h3>
                  <p className="text-sm max-w-md mx-auto">
                    Conectemos profesionalmente. Mi perfil completo, experiencia 
                    y red profesional están aquí.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="https://www.linkedin.com/in/alberto-marin-morales/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_20px_rgba(6,189,186,0.2)]"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-primary group-hover:text-cyan-300 transition-colors">Ver perfil de LinkedIn</p>
                      <p className="text-sm text-secondary group-hover:text-primary transition-colors">Alberto Marín Morales</p>
                    </div>
                    <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : null,
        },
      ],
    },
  ];

  const handleSelect = (mainId: string, subId?: string) => {
    console.log("Selected:", mainId, subId);
    // Aquí puedes manejar la navegación o mostrar contenido específico
  };

  return (
    <main className="min-h-screen bg-background dark relative">
      <SynthWaveHeader />
      <ThemeToggle />
      <XMBMenu items={menuItems} onSelect={handleSelect} />
    </main>
  );
}
