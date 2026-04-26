"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FINAL_TEXT = "< Full Stack Developer />";
const MATRIX_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]|\\:;\"'<>,.?/~`+-=_";

/** Subtítulo bajo el hero (matrix). */
export function MatrixCodeSubtitle() {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const totalDuration = 2000;
    const interval = totalDuration / FINAL_TEXT.length;

    const animate = () => {
      if (currentIndex <= FINAL_TEXT.length) {
        const formedPart = FINAL_TEXT.slice(0, currentIndex);
        const remainingLength = Math.max(0, FINAL_TEXT.length - currentIndex);
        const randomPart = Array.from({ length: remainingLength }, () =>
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ).join("");

        setDisplayText(formedPart + randomPart);
        currentIndex++;

        if (currentIndex > FINAL_TEXT.length) {
          setDisplayText(FINAL_TEXT);
          setIsComplete(true);
        } else {
          setTimeout(animate, interval);
        }
      }
    };

    const startTimer = setTimeout(animate, 500);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <div className="relative w-full text-right leading-none">
      {!isComplete && (
        <motion.span
          className="dev-subtitle-shimmer block text-xs font-mono font-medium leading-none tracking-wide sm:text-sm sm:tracking-wider md:text-base"
        >
          {displayText}
        </motion.span>
      )}
      {isComplete && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="dev-subtitle-shimmer block text-xs font-mono font-medium leading-none tracking-wide sm:text-sm sm:tracking-wider md:text-base"
        >
          {FINAL_TEXT}
        </motion.span>
      )}
    </div>
  );
}
