// Configuración del Portfolio SynthWave
// Personaliza aquí toda la información de tu portfolio

export const portfolioConfig = {
  // Información personal
  personal: {
    name: "Alberto",
    title: "Web Developer",
    bio: "Desarrollador apasionado por crear experiencias web únicas con tecnologías modernas.",
    avatar: "/avatar.png", // Opcional
  },

  // Redes sociales y contacto
  contact: {
    email: "albertomarinmorales@gmail.com",
    github: "https://github.com/albertomarinmorales-coder",
    linkedin: "https://www.linkedin.com/in/alberto-marin-morales/",
    portfolio: "https://tu-portfolio.com",
  },

  // Habilidades técnicas
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Go"],
    frontend: ["React", "Next.js", "Tailwind CSS", "ShadCN UI"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "VS Code", "Figma"],
  },

  // Proyectos destacados
  projects: [
    {
      id: "project1",
      title: "Portfolio SynthWave",
      description: "Portfolio personal con estética retro y navegación tipo XMB",
      image: "/projects/portfolio.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/tu-usuario/portfolio",
      demo: "https://tu-portfolio.com",
      featured: true,
    },
    {
      id: "project2",
      title: "Fresh Market",
      description: "Plataforma de comercio electrónico con Next.js y Stripe",
      image: "/projects/ecommerce.png",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      github: "https://github.com/albertomarinmorales-coder/porfolio",
      demo: "https://github.com/albertomarinmorales-coder/porfolio",
      featured: true,
    },
    {
      id: "project3",
      title: "Social Dashboard",
      description: "Dashboard de analytics en tiempo real con React y TypeScript",
      image: "/projects/dashboard.png",
      tags: ["React", "TypeScript", "Chart.js"],
      github: "https://github.com/tu-usuario/dashboard",
      demo: "https://tu-dashboard.com",
      featured: false,
    },
    {
      id: "project4",
      title: "Task Manager App",
      description: "Aplicación de gestión de tareas con drag & drop",
      image: "/projects/tasks.png",
      tags: ["React", "DnD Kit", "Tailwind"],
      github: "https://github.com/tu-usuario/tasks",
      demo: "https://tu-tasks.com",
      featured: false,
    },
  ],

  // Experiencia laboral
  experience: [
    {
      id: "exp1",
      company: "Empresa Tech",
      position: "Senior Full Stack Developer",
      period: "2022 - Presente",
      description: "Desarrollo de aplicaciones web escalables con React y Node.js",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      id: "exp2",
      company: "Startup Innovadora",
      position: "Frontend Developer",
      period: "2007 - 2022",
      description: "Creación de interfaces de usuario modernas y responsivas",
      technologies: ["React", "Next.js", "Tailwind CSS"],
    },
  ],

  // Posts del blog (si usas MDX más adelante)
  blogPosts: [
    {
      id: "post1",
      title: "Construyendo con Next.js 14",
      description: "Explorando las nuevas características de Next.js y Server Components",
      date: "2024-01-15",
      tags: ["Next.js", "React", "Tutorial"],
      slug: "construyendo-con-nextjs-14",
    },
    {
      id: "post2",
      title: "El poder de TypeScript",
      description: "Cómo TypeScript mejora la calidad del código",
      date: "2024-01-10",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      slug: "el-poder-de-typescript",
    },
    {
      id: "post3",
      title: "Diseño SynthWave",
      description: "Creando interfaces con estética retro futurista",
      date: "2024-01-05",
      tags: ["Design", "CSS", "UI/UX"],
      slug: "diseno-synthwave",
    },
  ],
};

export type PortfolioConfig = typeof portfolioConfig;
