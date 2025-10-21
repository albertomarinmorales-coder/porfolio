"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ContentPanelProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  isVisible: boolean;
}

export function ContentPanel({ title, description, children, isVisible }: ContentPanelProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-background/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-4xl max-h-[80vh] overflow-auto bg-card rounded-lg border border-border glow-border">
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 z-10">
              <h2 className="text-3xl font-bold text-primary glow-text">{title}</h2>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
            </div>
            
            <div className="p-6">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
