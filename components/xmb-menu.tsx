"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, LucideIcon, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export interface MenuItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  subItems?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  /** Thumbnail in the sub-menu list only; `image` is still used for the detail card */
  menuImage?: string;
  link?: string;
  content?: React.ReactNode;
  showScrollIndicator?: boolean;
}

interface XMBMenuProps {
  items: MenuItem[];
  onSelect?: (mainId: string, subId?: string) => void;
}

const subSpring = {
  type: "spring" as const,
  stiffness: 340,
  damping: 36,
  mass: 0.9,
};

const subListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const subLineVariants = {
  hidden: { opacity: 0, x: -12, filter: "blur(4px)" as const },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)" as const,
    transition: { type: "spring" as const, stiffness: 420, damping: 32 },
  },
};

export function XMBMenu({ items, onSelect }: XMBMenuProps) {
  const { t } = useLanguage();
  const [selectedMain, setSelectedMain] = useState(-1); // Sin selección inicial
  const [selectedSub, setSelectedSub] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Función para cerrar el submenú con animación suave
  const closeSubmenuSmoothly = () => {
    setIsClosing(true);
    
    // Hacer scroll suave hacia arriba antes de cerrar si estamos muy abajo
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.7; // Si estamos más del 70% hacia abajo
    
    if (currentScrollY > threshold) {
      // Scroll suave hacia una posición más visible
      window.scrollTo({
        top: Math.max(0, currentScrollY - windowHeight * 0.5),
        behavior: 'smooth'
      });
    }
    
    // Cerrar el submenú después de un breve delay para permitir el scroll
    setTimeout(() => {
      setShowSub(false);
      setSelectedSub(0);
      setIsClosing(false);
    }, 300);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (selectedMain > -1) {
            setSelectedMain((prev) => (prev > 0 ? prev - 1 : items.length - 1));
            // Si hay submenú abierto, resetear la selección del sub pero mantenerlo abierto
            if (showSub) {
              setSelectedSub(0);
            }
          } else {
            // Si no hay selección, ir al último elemento
            setSelectedMain(items.length - 1);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (selectedMain > -1) {
            setSelectedMain((prev) => (prev < items.length - 1 ? prev + 1 : 0));
            // Si hay submenú abierto, resetear la selección del sub pero mantenerlo abierto
            if (showSub) {
              setSelectedSub(0);
            }
          } else {
            // Si no hay selección, ir al primer elemento
            setSelectedMain(0);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (showSub && selectedMain > -1 && items[selectedMain]?.subItems) {
            setSelectedSub((prev) =>
              prev > 0 ? prev - 1 : (items[selectedMain].subItems?.length || 1) - 1
            );
          } else if (selectedMain === -1) {
            // Si no hay selección, ir al primer elemento
            setSelectedMain(0);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (showSub && selectedMain > -1 && items[selectedMain]?.subItems) {
            setSelectedSub((prev) =>
              prev < (items[selectedMain].subItems?.length || 1) - 1 ? prev + 1 : 0
            );
          } else if (selectedMain === -1) {
            // Si no hay selección, ir al primer elemento
            setSelectedMain(0);
          }
          break;
        case "Enter":
        case " ": // Espacio también funciona como toggle
          e.preventDefault();
          if (selectedMain > -1) {
            if (items[selectedMain]?.subItems) {
              // Toggle del submenú: abrir si está cerrado, cerrar si está abierto
              if (showSub) {
                // Si está abierto, cerrarlo suavemente
                closeSubmenuSmoothly();
              } else {
                // Si está cerrado, abrirlo
                setShowSub(true);
              }
            }
          } else {
            // Si no hay selección, ir al primer elemento
            setSelectedMain(0);
          }
          break;
        case "Escape":
          e.preventDefault();
          if (showSub) {
            // Si hay submenú abierto, cerrarlo suavemente
            closeSubmenuSmoothly();
          } else if (selectedMain > -1) {
            // Si hay una selección pero no submenú, deseleccionar todo
            setSelectedMain(-1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMain, selectedSub, showSub, items, onSelect]);

  // Manejar automáticamente el estado del submenú cuando cambia la selección principal
  useEffect(() => {
    if (selectedMain > -1 && showSub) {
      // Si el submenú estaba abierto y cambiamos a un elemento que no tiene subItems, cerrarlo
      if (!items[selectedMain]?.subItems) {
        setShowSub(false);
        setSelectedSub(0);
      }
    }
  }, [selectedMain, items, showSub]);

  // Al cambiar de categoría principal, el sub-índice anterior puede quedar fuera de rango;
  // además, sin remontar el panel, los nuevos motion.button con variants pueden quedar en opacity:0
  useEffect(() => {
    setSelectedSub(0);
  }, [selectedMain]);

  // Comentado: Ya no cerramos el menú al hacer clic fuera
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     const target = e.target as Element;
  //     
  //     // Si el click no es en ningún elemento del menú O en el botón de toggle del tema O en el botón de idioma, deseleccionar
  //     if (!target.closest('[data-menu-element]') && 
  //         !target.closest('[aria-label="Toggle theme"]') && 
  //         !target.closest('[aria-label="Toggle language"]')) {
  //       if (showSub) {
  //         // Si hay submenú abierto, cerrarlo suavemente
  //         closeSubmenuSmoothly();
  //       } else if (selectedMain > -1) {
  //         // Si hay una selección pero no submenú, deseleccionar todo
  //         setSelectedMain(-1);
  //       }
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [selectedMain, showSub]);

  const subItems = selectedMain > -1 ? (items[selectedMain]?.subItems ?? []) : [];
  const safeSub = Math.max(0, Math.min(selectedSub, Math.max(0, subItems.length - 1)));
  const currentSub = subItems[safeSub];

  return (
    <div className="relative w-full min-h-[60vh] retro-grid scanlines pt-32 pb-12">
      {/* Indicadores de navegación - OCULTOS */}
      {/* <div className="absolute top-8 right-8 flex gap-2 text-muted-foreground text-sm z-40">
        <kbd className="px-2 py-1 bg-muted rounded border border-border">←→</kbd>
        <span>Navegar</span>
        <kbd className="px-2 py-1 bg-muted rounded border border-border">↑↓</kbd>
        <span>Seleccionar</span>
        <kbd className="px-2 py-1 bg-muted rounded border border-border">Enter/Space</kbd>
        <span>Abrir/Cerrar</span>
      </div> */}

      {/* Menú principal horizontal - Centrado con flujo normal */}
      <div 
        className="flex items-center justify-center gap-12 mb-12"
        data-menu-element="main"
      >
        {/* Botón izquierda oculto */}
        {/* <button
          onClick={() => setSelectedMain((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button> */}

        <div className="flex gap-8">
          {items.map((item, index) => (
            <button
              key={item.id}
              data-menu-element="item"
              onClick={() => {
                if (selectedMain === index && items[index]?.subItems) {
                  // Mismo ítem: un clic alterna abrir / cerrar submenú
                  if (showSub) {
                    closeSubmenuSmoothly();
                  } else {
                    setShowSub(true);
                  }
                } else {
                  setSelectedMain(index);
                  if (items[index]?.subItems) {
                    setShowSub(true);
                  } else {
                    setShowSub(false);
                  }
                }
              }}
              className={`flex flex-col items-center gap-3 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer ${
                selectedMain === index
                  ? "scale-100"
                  : selectedMain === -1 
                    ? "scale-90 hover:scale-95" // Estado sin selección: tamaño intermedio
                    : "scale-75 hover:scale-80" // Elementos no activos: más pequeños
              }`}
            >
              <div
                className={`w-28 h-28 rounded-xl flex items-center justify-center transition-all duration-300 z-1 ${
                  selectedMain === index
                    ? "bg-primary/30 backdrop-blur-sm glow-border text-primary shadow-[0_0_15px_#06bdba,0_0_8px_#06bdba] border border-primary/20"
                    : selectedMain === -1
                      ? "bg-gray-100 dark:bg-gray-800 text-muted-foreground border border-border hover:shadow-[0_0_8px_#06bdba] hover:shadow-primary/30" // Fondo gris claro sólido
                      : "bg-gray-100 dark:bg-gray-800 text-muted-foreground border border-border hover:shadow-[0_0_8px_#06bdba] hover:shadow-primary/30"
                }`}
              >
                {item.icon ? (
                  <item.icon className="w-14 h-14" strokeWidth={1.5} />
                ) : (
                  <div className="w-14 h-14" />
                )}
              </div>
              <span
                className={`text-base font-medium transition-all duration-300 ${
                  selectedMain === index
                    ? "text-foreground glow-text"
                    : selectedMain === -1
                      ? "text-muted-foreground" // Estado sin selección: texto sólido
                      : "text-muted-foreground"
                }`}
              >
                {item.title}  
              </span>
            </button>
          ))}
        </div>

        {/* Botón derecha oculto */}
        {/* <button
          onClick={() => setSelectedMain((prev) => (prev < items.length - 1 ? prev + 1 : 0))}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button> */}
      </div>

      {/* Sub-menú: un solo bloque animado (spring + stagger) */}
      {selectedMain > -1 && subItems.length > 0 && (
        <div
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-0 px-6"
          data-menu-element="submenu"
        >
          <AnimatePresence mode="wait">
            {showSub && selectedMain > -1 ? (
              <motion.div
                key={`submenu-panel-${selectedMain}`}
                className="flex w-full flex-col items-center gap-2"
                initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  y: 18,
                  scale: 0.98,
                  filter: "blur(6px)",
                  transition: {
                    duration: isClosing ? 0.55 : 0.28,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                transition={{
                  y: subSpring,
                  scale: { ...subSpring, stiffness: 300 },
                  opacity: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                  filter: { duration: 0.45 },
                }}
              >
                <motion.button
                  data-menu-element="nav"
                  type="button"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...subSpring, delay: 0.06 }}
                  onClick={() =>
                    setSelectedSub((prev) =>
                      prev > 0 ? prev - 1 : (subItems.length || 1) - 1
                    )
                  }
                  className="text-muted-foreground transition-colors hover:text-secondary focus:border-transparent focus:outline-none focus:ring-0 cursor-pointer hover:drop-shadow-[0_0_8px_#c485ff]"
                >
                  <ChevronUp className="h-6 w-6" />
                </motion.button>

                <div className="mb-5 flex w-full max-w-6xl justify-center gap-6 sm:gap-8">
                  <motion.div
                    key={`submenu-list-${selectedMain}`}
                    variants={subListVariants}
                    initial="hidden"
                    animate="visible"
                    className="scrollbar-hide flex max-h-[500px] w-80 flex-col items-center gap-3 overflow-y-auto p-5"
                  >
                    {subItems.map((subItem, index) => (
                      <motion.button
                        key={subItem.id}
                        data-menu-element="subitem"
                        type="button"
                        variants={subLineVariants}
                        onClick={() => {
                          setSelectedSub(index);
                          onSelect?.(items[selectedMain]!.id, subItem.id);
                        }}
                        className={`flex w-64 cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-0 ${
                          safeSub === index
                            ? "glow-secondary scale-105 border border-secondary/20 bg-secondary/30 shadow-[0_0_8px_#c485ff,0_0_4px_#c485ff] backdrop-blur-sm"
                            : "border border-border/50 bg-background/85 opacity-60 backdrop-blur-sm hover:opacity-80 hover:shadow-[0_0_4px_#c485ff] hover:shadow-secondary/30"
                        }`}
                      >
                        {(subItem.menuImage || subItem.image) && (
                          <div className="w-12 h-12 rounded-md bg-muted shrink-0 overflow-hidden flex items-center justify-center">
                            {subItem.menuImage ? (
                              <img
                                src={subItem.menuImage}
                                alt=""
                                className="max-h-12 max-w-12 w-full h-full object-contain"
                              />
                            ) : subItem.image?.startsWith('/projects/') ? (
                              <Wrench className="w-4 h-4 text-muted-foreground" />
                            ) : subItem.id === 'project1' || subItem.title.includes('Fresh Market') ? (
                              <img
                                src="/images/cart-favicon.svg"
                                alt="Cart icon"
                                className="w-8 h-8 object-contain"
                              />
                            ) : subItem.id === 'project2' || subItem.title.includes('Comida Casera') ? (
                              <img
                                src="/projects/pollo-icono.png"
                                alt="Comida Casera icon"
                                className="w-8 h-8 object-contain"
                              />
                            ) : subItem.id === 'project3' || subItem.title.includes('Social Dashboard') ? (
                              <img
                                src="/images/SD.svg"
                                alt="Social Dashboard icon"
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <img
                                src={subItem.image!}
                                alt={subItem.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        )}
                        <h3
                          className={`font-medium text-base text-left ${
                            safeSub === index ? "text-secondary" : "text-foreground"
                          }`}
                        >
                          {subItem.title}
                        </h3>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div
                    key={currentSub.id}
                    initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 12, filter: "blur(4px)" }}
                    transition={subSpring}
                    className="border-primary/30 bg-background/92 flex max-h-[500px] min-w-[min(100%,500px)] max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border p-6 shadow-[0_0_0_1px_oklch(0.55_0.18_300/0.12),0_20px_50px_-20px_oklch(0.45_0.15_280/0.25)] backdrop-blur-md"
                  >
                    <h2 className="text-2xl font-bold text-primary">
                      {currentSub.title}
                    </h2>
                    
                    {currentSub.content ? (
                      <>
                        {currentSub.content}
                        {currentSub.showScrollIndicator && (
                          <div className="flex justify-center mt-3 pointer-events-none" style={{ animation: 'none' }}>
                            <div className="flex items-center gap-2 text-primary/90 text-xs bg-background/30 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30 shadow-lg" style={{ animation: 'none', transform: 'none' }}>
                              <span>{t("common.scrollMore")}</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {currentSub.description && (
                          <p className="text-muted-foreground leading-relaxed">
                            {currentSub.description}
                          </p>
                        )}
                        {currentSub.image && (
                          <div className="mt-10 rounded-lg overflow-hidden">
                            {currentSub.image.startsWith('/projects/') ? (
                              <div className="bg-muted p-8 flex items-center justify-center">
                                <Wrench className="w-16 h-16 text-muted-foreground" />
                              </div>
                            ) : currentSub.link ? (
                              <a 
                                href={currentSub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block cursor-pointer hover:opacity-80 transition-opacity"
                              >
                                <img
                                  src={currentSub.image}
                                  alt={currentSub.title}
                                  className="w-full h-auto object-cover"
                                />
                              </a>
                            ) : (
                              <img
                                src={currentSub.image}
                                alt={currentSub.title}
                                className="w-full h-auto object-cover"
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </div>

                <motion.button
                  data-menu-element="nav"
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...subSpring, delay: 0.08 }}
                  onClick={() =>
                    setSelectedSub((prev) =>
                      prev < (subItems.length || 1) - 1 ? prev + 1 : 0
                    )
                  }
                  className="text-muted-foreground transition-colors hover:text-secondary focus:border-transparent focus:outline-none focus:ring-0 cursor-pointer hover:drop-shadow-[0_0_8px_#c485ff]"
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
