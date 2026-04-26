"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Solo móvil: botones de idioma y tema ocultos hacia la izquierda; pestaña en left:0 con chevron para abrir/cerrar.
 */
export function MobileTogglesDock() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "fixed left-0 top-1/2 z-[60] flex w-max max-w-[min(100vw,20rem)] flex-row items-center overflow-visible border-y border-r border-primary/30 bg-background/95 py-0.5 pl-0.5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-300 ease-out md:hidden",
        "-translate-y-1/2",
        open ? "translate-x-0" : "-translate-x-[calc(100%-1.75rem)]"
      )}
    >
      <div className="flex w-max min-w-0 flex-row items-center gap-1.5 pr-0.5 pl-0.5">
        <LanguageToggle
          className="static !right-auto !top-auto !left-auto h-9 w-9 !min-h-0 !min-w-0 shrink-0 !translate-x-0 !p-0 [&>div]:flex [&>div]:h-full [&>div]:w-full [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div]:gap-0.5 [&>div]:p-0.5 [&>div>svg]:!h-3.5 [&>div>svg]:!w-3.5 [&_span]:!text-[0.55rem] [&_span]:!leading-none [&_span]:!font-semibold"
        />
        <ThemeToggle
          className="static !right-auto !top-auto !left-auto h-9 w-9 !min-h-0 !min-w-0 shrink-0 !translate-x-0 !p-0 flex items-center justify-center [&_svg]:!h-4 [&_svg]:!w-4"
        />
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 w-7 shrink-0 items-center justify-center self-center border-l border-primary/20 bg-background/90 text-primary transition-colors hover:bg-primary/10"
        aria-expanded={open}
        aria-label={open ? "Ocultar idioma y tema" : "Mostrar idioma y tema"}
      >
        {open ? (
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
