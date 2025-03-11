
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Staggered animation delay utility
export function staggeredDelay(index: number, baseDelay = 50): string {
  return `${index * baseDelay}ms`;
}

// Transition ease presets
export const transitions = {
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
};

// Animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: transitions.easeOut }
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.5, ease: transitions.easeOutBack }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.5, ease: transitions.spring }
};

export const blurIn = {
  initial: { filter: "blur(8px)", opacity: 0 },
  animate: { filter: "blur(0px)", opacity: 1 },
  exit: { filter: "blur(8px)", opacity: 0 },
  transition: { duration: 0.6, ease: transitions.easeOut }
};

// Pulse animation
export const pulse = {
  animate: { 
    scale: [1, 1.03, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Click animations
export const clickScale = {
  scale: 0.97,
  transition: { duration: 0.1 }
};

export const cardHover = {
  y: -5,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  transition: { duration: 0.3, ease: transitions.easeOutBack }
};
