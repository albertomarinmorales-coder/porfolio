"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
}

interface XMBMenuProps {
  items: MenuItem[];
  onSelect?: (mainId: string, subId?: string) => void;
}

export function XMBMenu({ items, onSelect }: XMBMenuProps) {
  const [selectedMain, setSelectedMain] = useState(0);
  const [selectedSub, setSelectedSub] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (showSub) {
            setShowSub(false);
            setSelectedSub(0);
          } else {
            setSelectedMain((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          // Solo navegar entre categorías principales
          if (showSub) {
            // Si hay submenú abierto, cerrarlo y mover a la siguiente categoría
            setShowSub(false);
            setSelectedSub(0);
          }
          setSelectedMain((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (showSub && items[selectedMain]?.subItems) {
            setSelectedSub((prev) =>
              prev > 0 ? prev - 1 : (items[selectedMain].subItems?.length || 1) - 1
            );
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (showSub && items[selectedMain]?.subItems) {
            setSelectedSub((prev) =>
              prev < (items[selectedMain].subItems?.length || 1) - 1 ? prev + 1 : 0
            );
          }
          break;
        case "Enter":
        case " ": // Espacio también abre
          e.preventDefault();
          if (showSub) {
            // Si hay submenú abierto, seleccionar el item
            onSelect?.(items[selectedMain].id, items[selectedMain].subItems?.[selectedSub].id);
          } else if (items[selectedMain]?.subItems) {
            // Abrir submenú si existe
            setShowSub(true);
          }
          break;
        case "Escape":
          e.preventDefault();
          if (showSub) {
            setShowSub(false);
            setSelectedSub(0);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMain, selectedSub, showSub, items, onSelect]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden retro-grid scanlines pt-32">
      {/* Indicadores de navegación - OCULTOS */}
      {/* <div className="absolute top-8 right-8 flex gap-2 text-muted-foreground text-sm z-40">
        <kbd className="px-2 py-1 bg-muted rounded border border-border">←→</kbd>
        <span>Navegar</span>
        <kbd className="px-2 py-1 bg-muted rounded border border-border">↑↓</kbd>
        <span>Seleccionar</span>
        <kbd className="px-2 py-1 bg-muted rounded border border-border">Enter</kbd>
        <span>Abrir</span>
      </div> */}

      {/* Menú principal horizontal */}
      <div className="flex items-center justify-center gap-12 mb-8">
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
              className={`flex flex-col items-center gap-3 transition-all duration-300 ${
                selectedMain === index
                  ? "scale-110"
                  : "scale-75 opacity-40"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  selectedMain === index
                    ? "bg-primary/20 glow-border text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.icon ? (
                  <item.icon className="w-10 h-10" strokeWidth={1.5} />
                ) : (
                  <div className="w-10 h-10" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  selectedMain === index
                    ? "text-foreground glow-text"
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

      {/* Sub-menú vertical */}
      {items[selectedMain]?.subItems && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <AnimatePresence>
            {showSub && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  setSelectedSub((prev) =>
                    prev > 0 ? prev - 1 : (items[selectedMain].subItems?.length || 1) - 1
                  )
                }
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                <ChevronUp className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4 max-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              {showSub ? (
                <motion.div
                  key="submenu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  {items[selectedMain].subItems.map((subItem, index) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setSelectedSub(index);
                        onSelect?.(items[selectedMain].id, subItem.id);
                      }}
                      className={`flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 min-w-[400px] ${
                        selectedSub === index
                          ? "bg-secondary/20 glow-secondary scale-105"
                          : "bg-card/50 opacity-60"
                      }`}
                    >
                      {subItem.image && (
                        <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                          <img
                            src={subItem.image}
                            alt={subItem.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="text-left">
                        <h3
                          className={`font-medium ${
                            selectedSub === index ? "text-secondary" : "text-foreground"
                          }`}
                        >
                          {subItem.title}
                        </h3>
                        {subItem.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {subItem.description}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-muted-foreground p-8"
                >
                  <p className="text-sm">← → ↑ ↓ para moverte • Enter/Space para abrir</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showSub && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  setSelectedSub((prev) =>
                    prev < (items[selectedMain].subItems?.length || 1) - 1 ? prev + 1 : 0
                  )
                }
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Información del item seleccionado */}
      {showSub && items[selectedMain]?.subItems?.[selectedSub] && (
        <div className="absolute bottom-8 left-8 right-8 max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border glow-border">
            <h2 className="text-xl font-bold text-primary mb-2">
              {items[selectedMain].subItems[selectedSub].title}
            </h2>
            <p className="text-muted-foreground">
              {items[selectedMain].subItems[selectedSub].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
