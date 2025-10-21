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
  link?: string;
  content?: React.ReactNode;
  showScrollIndicator?: boolean;
}

interface XMBMenuProps {
  items: MenuItem[];
  onSelect?: (mainId: string, subId?: string) => void;
}

export function XMBMenu({ items, onSelect }: XMBMenuProps) {
  const { t } = useLanguage();
  const [selectedMain, setSelectedMain] = useState(-1); // Sin selección inicial
  const [selectedSub, setSelectedSub] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

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
        case " ": // Espacio también abre
          e.preventDefault();
          if (selectedMain > -1) {
            if (showSub) {
              // Si hay submenú abierto, seleccionar el item
              onSelect?.(items[selectedMain].id, items[selectedMain].subItems?.[selectedSub].id);
            } else if (items[selectedMain]?.subItems) {
              // Abrir submenú si existe
              setShowSub(true);
            }
          } else {
            // Si no hay selección, ir al primer elemento
            setSelectedMain(0);
          }
          break;
        case "Escape":
          e.preventDefault();
          if (showSub) {
            // Si hay submenú abierto, cerrarlo
            setShowSub(false);
            setSelectedSub(0);
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
      // Si tiene subItems, mantener el submenú abierto pero resetear la selección
    }
  }, [selectedMain, items, showSub]);

  // Manejar clicks fuera del menú para deseleccionar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Si el click no es en ningún elemento del menú O en el botón de toggle del tema O en el botón de idioma, deseleccionar
      if (!target.closest('[data-menu-element]') && 
          !target.closest('[aria-label="Toggle theme"]') && 
          !target.closest('[aria-label="Toggle language"]')) {
        if (showSub) {
          // Si hay submenú abierto, cerrarlo
          setShowSub(false);
          setSelectedSub(0);
        } else if (selectedMain > -1) {
          // Si hay una selección pero no submenú, deseleccionar todo
          setSelectedMain(-1);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedMain, showSub]);

  return (
    <div className="relative w-full h-screen overflow-hidden retro-grid scanlines">
      {/* Indicadores de navegación - OCULTOS */}
      {/* <div className="absolute top-8 right-8 flex gap-2 text-muted-foreground text-sm z-40">
        <kbd className="px-2 py-1 bg-muted rounded border border-border">←→</kbd>
        <span>Navegar</span>
        <kbd className="px-2 py-1 bg-muted rounded border border-border">↑↓</kbd>
        <span>Seleccionar</span>
        <kbd className="px-2 py-1 bg-muted rounded border border-border">Enter</kbd>
        <span>Abrir</span>
      </div> */}

      {/* Menú principal horizontal - Posición ajustada */}
      <div 
        className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-12 z-10"
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
                const now = Date.now();
                const isDoubleClick = now - lastClickTime < 300;
                
                if (isDoubleClick && selectedMain === index && items[index]?.subItems) {
                  // Doble click: abrir submenú
                  setShowSub(true);
                } else {
                  // Click simple: solo seleccionar
                  setSelectedMain(index);
                  setShowSub(false);
                  setSelectedSub(0);
                }
                
                setLastClickTime(now);
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

      {/* Sub-menú vertical - Posicionado debajo del menú principal */}
      {selectedMain > -1 && items[selectedMain]?.subItems && (
        <div 
          className="absolute top-[40%] left-1/2 transform -translate-x-1/2 translate-y-12 flex flex-col items-center gap-4 mt-6 z-20"
          data-menu-element="submenu"
        >
          <AnimatePresence>
            {showSub && selectedMain > -1 && (
              <motion.button
                data-menu-element="nav"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  setSelectedSub((prev) =>
                    prev > 0 ? prev - 1 : (items[selectedMain].subItems?.length || 1) - 1
                  )
                }
                className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer hover:drop-shadow-[0_0_8px_#c485ff]"
              >
                <ChevronUp className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex gap-8 max-h-[300px] overflow-hidden w-full max-w-4xl">
            <AnimatePresence mode="wait">
              {showSub ? (
                <>
                  {/* Lista de sub-items a la izquierda */}
                  <motion.div
                    key="submenu-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col gap-3 items-center w-80 p-6"
                  >
                    {items[selectedMain].subItems.map((subItem, index) => (
                      <button
                        key={subItem.id}
                        data-menu-element="subitem"
                        onClick={() => {
                          setSelectedSub(index);
                          onSelect?.(items[selectedMain].id, subItem.id);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-64 overflow-hidden focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer ${
                          selectedSub === index
                            ? "bg-secondary/30 backdrop-blur-sm glow-secondary scale-105 shadow-[0_0_8px_#c485ff,0_0_4px_#c485ff] border border-secondary/20"
                            : "bg-background/85 backdrop-blur-sm border border-border/50 opacity-60 hover:opacity-80 hover:shadow-[0_0_4px_#c485ff] hover:shadow-secondary/30"
                        }`}
                      >
                        {subItem.image && (
                          <div className="w-12 h-12 rounded-md bg-muted shrink-0 overflow-hidden flex items-center justify-center">
                            {subItem.image.startsWith('/projects/') ? (
                              <Wrench className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <img
                                src={subItem.image}
                                alt={subItem.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        )}
                        <h3
                          className={`font-medium text-base text-left ${
                            selectedSub === index ? "text-secondary" : "text-foreground"
                          }`}
                        >
                          {subItem.title}
                        </h3>
                      </button>
                    ))}
                  </motion.div>

                  {/* Panel de detalles a la derecha */}
                  <motion.div
                    key={`detail-${selectedSub}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 p-6 rounded-2xl bg-background/90 backdrop-blur-sm border border-primary/30 shadow-lg max-w-lg min-w-[500px]"
                  >
                    <h2 className="text-2xl font-bold text-primary">
                      {items[selectedMain].subItems[selectedSub].title}
                    </h2>
                    
                    {/* Si hay contenido personalizado, mostrarlo */}
                    {items[selectedMain].subItems[selectedSub].content ? (
                      <>
                        {items[selectedMain].subItems[selectedSub].content}
                        {/* Indicador de scroll si está habilitado */}
                        {items[selectedMain].subItems[selectedSub].showScrollIndicator && (
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
                        {items[selectedMain].subItems[selectedSub].description && (
                          <p className="text-muted-foreground leading-relaxed">
                            {items[selectedMain].subItems[selectedSub].description}
                          </p>
                        )}
                        {items[selectedMain].subItems[selectedSub].image && (
                          <div className="rounded-lg overflow-hidden">
                            {items[selectedMain].subItems[selectedSub].image.startsWith('/projects/') ? (
                              <div className="bg-muted p-8 flex items-center justify-center">
                                <Wrench className="w-16 h-16 text-muted-foreground" />
                              </div>
                            ) : (
                              <img
                                src={items[selectedMain].subItems[selectedSub].image}
                                alt={items[selectedMain].subItems[selectedSub].title}
                                className="w-full h-auto object-cover"
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-muted-foreground p-8"
                >
                  <p className="text-sm">← → ↑ ↓ {t("common.navigation")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showSub && selectedMain > -1 && (
              <motion.button
                data-menu-element="nav"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  setSelectedSub((prev) =>
                    prev < (items[selectedMain].subItems?.length || 1) - 1 ? prev + 1 : 0
                  )
                }
                className="text-muted-foreground hover:text-secondary transition-colors focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer hover:drop-shadow-[0_0_8px_#c485ff]"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
