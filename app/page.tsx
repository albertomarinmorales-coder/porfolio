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
                  <img
                    src="/images/handsome/HandSomeSW.png"
                    alt="Alberto Marín - Tema Oscuro"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                      isDark ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      console.log("Error cargando imagen oscura:", e.currentTarget.src);
                    }}
                  />
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
            </div>
          ) : null,
        },
        {
          id: "skills",
          title: "Habilidades",
          description: "TypeScript, React, Next.js, Tailwind CSS, y más...",
        },
        {
          id: "experience",
          title: "Experiencia",
          description: "Mi trayectoria profesional y proyectos destacados",
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
          description: "tu-email@ejemplo.com",
        },
        {
          id: "github",
          title: "GitHub",
          description: "github.com/tu-usuario",
        },
        {
          id: "linkedin",
          title: "LinkedIn",
          description: "linkedin.com/in/tu-perfil",
        },
        {
          id: "twitter",
          title: "Twitter",
          description: "@tu-usuario",
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
      <ThemeToggle />
      <SynthWaveHeader />
      <XMBMenu items={menuItems} onSelect={handleSelect} />
    </main>
  );
}
