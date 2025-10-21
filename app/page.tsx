"use client";

import { XMBMenu, type MenuItem } from "@/components/xmb-menu";
import { SynthWaveHeader } from "@/components/synthwave-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { User, Gamepad2, FileText, Mail } from "lucide-react";

export default function Home() {
  const menuItems: MenuItem[] = [
    {
      id: "about",
      title: "Sobre Mí",
      icon: User,
      subItems: [
        {
          id: "bio",
          title: "Biografía",
          description: "Desarrollador Full Stack apasionado por crear experiencias web únicas",
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
