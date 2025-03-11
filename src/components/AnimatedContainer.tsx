
import React, { useEffect, useRef, useState } from "react";
import { cn, transitions } from "@/lib/animations";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fade" | "slide" | "scale" | "blur";
  once?: boolean;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  delay = 0,
  duration = 500,
  animation = "fade",
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    
    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "slide":
        return "animate-slide-up";
      case "scale":
        return "animate-scale-in";
      case "blur":
        return "animate-blur-in";
      default:
        return "animate-fade-in";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform will-change-opacity",
        getAnimationClass(),
        className
      )}
      style={{
        transitionTimingFunction: transitions.easeOut,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
