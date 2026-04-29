"use client";

import { useState, useEffect, useRef } from "react";
import { LucideIcon, Wrench, ChevronDown } from "lucide-react";
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
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 34 },
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

/** Contenedor de la lista en escritorio: reparte stagger a los botones */
const subListStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

const MOBILE_SUBMENU_MQ = "(max-width: 1023px)";

function SubItemThumb({ subItem }: { subItem: SubMenuItem }) {
  if (!subItem.menuImage && !subItem.image) return null;
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
      {subItem.menuImage ? (
        <img
          src={subItem.menuImage}
          alt=""
          className="max-h-12 max-w-12 w-full h-full object-contain"
        />
      ) : subItem.image?.startsWith("/projects/") ? (
        <Wrench className="h-4 w-4 text-muted-foreground" />
      ) : subItem.id === "project1" || subItem.title.includes("Fresh Market") ? (
        <img src="/images/cart-favicon.svg" alt="" className="h-8 w-8 object-contain" />
      ) : subItem.id === "project2" || subItem.title.includes("Comida Casera") ? (
        <img src="/projects/pollo-icono.png" alt="" className="h-8 w-8 object-contain" />
      ) : subItem.id === "project3" || subItem.title.includes("Social Dashboard") ? (
        <img src="/images/SD.svg" alt="" className="h-8 w-8 object-contain" />
      ) : (
        <img src={subItem.image!} alt="" className="h-full w-full object-cover" />
      )}
    </div>
  );
}

export function XMBMenu({ items, onSelect }: XMBMenuProps) {
  const { t } = useLanguage();
  const [selectedMain, setSelectedMain] = useState(-1); // Sin selección inicial
  const [selectedSub, setSelectedSub] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [subPickerOpen, setSubPickerOpen] = useState(false);
  const subPickerRef = useRef<HTMLDivElement>(null);
  const [isMobileSubmenu, setIsMobileSubmenu] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_SUBMENU_MQ);
    setIsMobileSubmenu(mq.matches);
    const onChange = () => {
      setIsMobileSubmenu(mq.matches);
      if (!mq.matches) setSubPickerOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
          if (isMobileSubmenu && subPickerOpen) {
            setSubPickerOpen(false);
            break;
          }
          if (showSub) {
            closeSubmenuSmoothly();
          } else if (selectedMain > -1) {
            setSelectedMain(-1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMain, selectedSub, showSub, subPickerOpen, isMobileSubmenu, items, onSelect]);

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

  useEffect(() => {
    setSubPickerOpen(false);
  }, [selectedMain, showSub]);

  useEffect(() => {
    if (!subPickerOpen || !isMobileSubmenu) return;
    const onDoc = (e: MouseEvent) => {
      if (subPickerRef.current && !subPickerRef.current.contains(e.target as Node)) {
        setSubPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [subPickerOpen, isMobileSubmenu]);

  // En viewport estrecho, al abrir el submenú llevar el bloque al área visible (evita quedar fuera de pantalla)
  useEffect(() => {
    if (!showSub || typeof window === "undefined") return;
    if (window.innerWidth >= 1024) return;
    const id = requestAnimationFrame(() => {
      document.querySelector("[data-menu-element='submenu']")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
    return () => cancelAnimationFrame(id);
  }, [showSub, selectedMain]);

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
  const hasMultipleSubItems = subItems.length > 1;

  return (
    <div className="relative min-h-[50vh] w-full min-w-0 overflow-x-hidden pt-10 pb-8 sm:min-h-[60vh] sm:pt-16 md:pt-20 md:pb-12">
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
        className="mb-6 flex max-w-full flex-col items-center justify-center gap-4 px-1 sm:mb-10 sm:gap-6 md:mb-12 md:gap-8 lg:gap-12"
        data-menu-element="main"
      >
        {/* Botón izquierda oculto */}
        {/* <button
          onClick={() => setSelectedMain((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button> */}

        <div className="flex max-w-full flex-wrap justify-center gap-3 [overflow-wrap:anywhere] min-[400px]:gap-4 sm:gap-6 md:gap-8">
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
                className={`z-1 flex h-20 w-20 shrink-0 items-center justify-center rounded-lg transition-all duration-300 sm:h-24 sm:w-24 sm:rounded-xl md:h-28 md:w-28 ${
                  selectedMain === index
                    ? "bg-primary/30 backdrop-blur-sm glow-border text-primary border border-primary/20 shadow-[0_0_15px_#06bdba,0_0_8px_#06bdba]"
                    : selectedMain === -1
                      ? "border border-border bg-gray-100 text-muted-foreground hover:shadow-primary/30 hover:shadow-[0_0_8px_#06bdba] dark:bg-gray-800" // Fondo gris claro sólido
                      : "border border-border bg-gray-100 text-muted-foreground hover:shadow-primary/30 hover:shadow-[0_0_8px_#06bdba] dark:bg-gray-800"
                }`}
              >
                {item.icon ? (
                  <item.icon className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14" strokeWidth={1.5} />
                ) : (
                  <div className="h-9 w-9 sm:h-12 sm:w-12" />
                )}
              </div>
              <span
                className={`max-w-[5.5rem] text-center text-[0.7rem] font-medium leading-tight transition-all duration-300 min-[400px]:max-w-[6.5rem] min-[400px]:text-xs sm:max-w-none sm:text-sm md:text-base ${
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
          className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-stretch gap-0 px-2 min-[400px]:px-3 sm:px-4 md:px-6"
          data-menu-element="submenu"
        >
          <AnimatePresence initial={false} mode="wait">
            {showSub && selectedMain > -1 ? (
              <motion.div
                key={`submenu-panel-${selectedMain}`}
                className="flex w-full min-w-0 flex-col items-center gap-2 overflow-hidden"
                initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(8px)", height: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", height: "auto" }}
                exit={{
                  opacity: 0,
                  y: 18,
                  scale: 0.98,
                  filter: "blur(6px)",
                  height: 0,
                  transition: {
                    duration: isClosing ? 0.55 : 0.32,
                    ease: [0.4, 0, 0.2, 1],
                    height: {
                      duration: isClosing ? 0.55 : 0.32,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  },
                }}
                transition={{
                  y: subSpring,
                  scale: { ...subSpring, stiffness: 300 },
                  opacity: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                  filter: { duration: 0.45 },
                  height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                }}
              >
                <div className="mb-3 w-full min-w-0 sm:mb-4 lg:mb-5">
                  <div
                    className={
                      "mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 " +
                      (hasMultipleSubItems
                        ? "lg:flex-row lg:items-stretch lg:justify-center lg:gap-6"
                        : "items-center justify-center")
                    }
                  >
                    {hasMultipleSubItems && (
                    <motion.div
                      key={`submenu-list-${selectedMain}`}
                      data-menu-element="subitem"
                      variants={subListVariants}
                      initial="hidden"
                      animate="visible"
                      className="w-full min-w-0 max-w-lg shrink-0 lg:max-w-[20rem] lg:basis-80 lg:flex lg:justify-start"
                    >
                      {(() => {
                        const current = subItems[safeSub]!;

                        if (!isMobileSubmenu) {
                          return (
                            <motion.div
                              variants={subListStaggerVariants}
                              initial="hidden"
                              animate="visible"
                              className="scrollbar-hide flex max-h-[min(45vh,420px)] w-full min-w-0 max-w-md flex-col items-stretch gap-2 overflow-y-auto p-2 min-[400px]:gap-3 min-[400px]:p-3 sm:max-h-[500px] sm:gap-3 sm:p-4 lg:mx-0 lg:w-80 lg:max-w-none lg:shrink-0 lg:items-stretch lg:px-3 lg:py-2"
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
                                  className={
                                    "flex w-full min-w-0 max-w-full cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl px-3 py-2.5 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-0 min-[400px]:gap-3 min-[400px]:px-4 min-[400px]:py-3 sm:max-w-sm sm:mx-auto sm:w-64 lg:mx-0 lg:w-full lg:max-w-full " +
                                    (safeSub === index
                                      ? "glow-secondary border border-secondary/20 bg-secondary/30 shadow-[0_0_8px_#a855f7,0_0_4px_#a855f7] backdrop-blur-sm sm:scale-105"
                                      : "border border-border/50 bg-background/85 opacity-60 backdrop-blur-sm hover:opacity-80 hover:shadow-[0_0_4px_#a855f7] hover:shadow-secondary/30")
                                  }
                                >
                                  {(subItem.menuImage || subItem.image) && <SubItemThumb subItem={subItem} />}
                                  <h3
                                    className={
                                      "min-w-0 flex-1 break-words text-left text-sm font-medium leading-snug min-[400px]:text-base " +
                                      (safeSub === index ? "text-secondary" : "text-foreground")
                                    }
                                  >
                                    {subItem.title}
                                  </h3>
                                </motion.button>
                              ))}
                            </motion.div>
                          );
                        }

                        return (
                          <div ref={subPickerRef} className="relative w-full min-w-0" data-menu-element="subitem">
                            <button
                              type="button"
                              onClick={() => setSubPickerOpen((o) => !o)}
                              aria-expanded={subPickerOpen}
                              aria-haspopup="listbox"
                              className="glow-secondary flex w-full min-w-0 min-h-[52px] items-center justify-between gap-2 overflow-hidden rounded-xl border border-secondary/20 bg-secondary/30 px-3 py-2.5 text-left shadow-[0_0_8px_#a855f7,0_0_4px_#a855f7] backdrop-blur-sm transition-shadow hover:shadow-[0_0_10px_#a855f7] sm:px-4"
                            >
                              <span className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                                {(current.menuImage || current.image) && <SubItemThumb subItem={current} />}
                                <span className="min-w-0 flex-1 break-words text-sm font-medium text-secondary min-[400px]:text-base">
                                  {current.title}
                                </span>
                              </span>
                              <ChevronDown
                                className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-200 ${
                                  subPickerOpen ? "rotate-180" : ""
                                }`}
                                aria-hidden
                              />
                            </button>
                            <AnimatePresence>
                              {subPickerOpen && (
                                <motion.ul
                                  role="listbox"
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  transition={subSpring}
                                  className="border-primary/30 absolute left-0 right-0 z-30 mt-1.5 max-h-[min(50vh,320px)] list-none space-y-0 overflow-y-auto rounded-xl border bg-background/95 p-1 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] backdrop-blur-md dark:bg-background/98"
                                >
                                  {subItems.map((s, i) => (
                                    <li key={s.id} role="none" className="p-0">
                                      <button
                                        type="button"
                                        role="option"
                                        aria-selected={safeSub === i}
                                        onClick={() => {
                                          setSelectedSub(i);
                                          onSelect?.(items[selectedMain]!.id, s.id);
                                          setSubPickerOpen(false);
                                        }}
                                        className={
                                          "flex w-full min-w-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm min-[400px]:text-base " +
                                          (safeSub === i
                                            ? "bg-secondary/25 font-medium text-secondary"
                                            : "text-foreground hover:bg-primary/10")
                                        }
                                      >
                                        {(s.menuImage || s.image) && <SubItemThumb subItem={s} />}
                                        <span className="min-w-0 break-words">{s.title}</span>
                                      </button>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })()}
                    </motion.div>
                    )}

                  <motion.div
                    key={currentSub.id}
                    initial={{ opacity: 0, x: hasMultipleSubItems ? 24 : 0, y: hasMultipleSubItems ? 0 : 16, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: hasMultipleSubItems ? 12 : 0, y: hasMultipleSubItems ? 0 : 8, filter: "blur(4px)" }}
                    transition={subSpring}
                    className={
                      "border-primary/30 bg-background/92 flex w-full min-w-0 shrink-0 flex-col gap-3 overflow-y-auto rounded-xl border p-4 shadow-[0_0_0_1px_oklch(0.55_0.18_300/0.12),0_20px_50px_-20px_oklch(0.45_0.15_280/0.25)] backdrop-blur-md min-[400px]:gap-4 min-[400px]:rounded-2xl min-[400px]:p-5 sm:max-h-[500px] sm:p-6 lg:min-h-0 lg:min-w-0 " +
                      (hasMultipleSubItems ? "max-w-lg" : "max-w-2xl mx-auto")
                    }
                  >
                    <h2 className="text-balance break-words text-lg font-bold text-primary min-[400px]:text-xl sm:text-2xl">
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
                          <p className="text-sm text-muted-foreground leading-relaxed min-[400px]:text-base">
                            {currentSub.description}
                          </p>
                        )}
                        {currentSub.image && (
                          <div className="mt-2 rounded-lg overflow-hidden min-[400px]:mt-3 sm:mt-4">
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
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
