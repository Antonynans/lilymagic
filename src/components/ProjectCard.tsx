import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../types";

interface Props {
  project: Project;
  className?: string;
  onSelect?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const EASE_IMG = [0.16, 1, 0.3, 1] as const;

const EASE_OVER = [0.25, 0.46, 0.45, 0.94] as const;

const EASE_OUT = [0.4, 0, 1, 1] as const;

export function ProjectCard({
  project,
  className = "",
  onSelect,
  onHoverStart,
  onHoverEnd,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
    onHoverStart?.();
  };
  const leave = () => {
    setHovered(false);
    onHoverEnd?.();
  };

  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`relative overflow-hidden w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-black ${className}`}
      style={{ background: "transparent", display: "block" }}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform" }}
        animate={{ scale: hovered ? 1.08 : 1.0 }}
        transition={{
          duration: hovered ? 1.4 : 1.1,
          ease: EASE_IMG,
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.48)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{
          duration: hovered ? 0.65 : 0.45,
          ease: hovered ? EASE_OVER : EASE_OUT,
        }}
      />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ pointerEvents: "none" }}
      >
        <motion.p
          className="text-[0.52rem] tracking-[0.28em] uppercase text-white/60 mb-3"
          animate={{
            y: hovered ? 0 : 18,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            y: {
              duration: hovered ? 0.6 : 0.28,
              delay: hovered ? 0 : 0,
              ease: hovered ? EASE_OVER : EASE_OUT,
            },
            opacity: {
              duration: hovered ? 0.55 : 0.22,
              delay: hovered ? 0 : 0,
              ease: "easeInOut",
            },
          }}
        >
          {project.tag}
        </motion.p>

        <motion.h3
          className="font-serif font-light text-white leading-[1.1] mb-5"
          style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)" }}
          animate={{
            y: hovered ? 0 : 22,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            y: {
              duration: hovered ? 0.65 : 0.26,
              delay: hovered ? 0.06 : 0,
              ease: hovered ? EASE_OVER : EASE_OUT,
            },
            opacity: {
              duration: hovered ? 0.6 : 0.22,
              delay: hovered ? 0.06 : 0,
              ease: "easeInOut",
            },
          }}
        >
          {project.title}
        </motion.h3>

        <motion.div
          className="flex items-center gap-[7px]"
          animate={{
            y: hovered ? 0 : 22,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            y: {
              duration: hovered ? 0.65 : 0.24,
              delay: hovered ? 0.12 : 0,
              ease: hovered ? EASE_OVER : EASE_OUT,
            },
            opacity: {
              duration: hovered ? 0.6 : 0.2,
              delay: hovered ? 0.12 : 0,
              ease: "easeInOut",
            },
          }}
        >
          <span className="text-[0.53rem] tracking-[0.24em] uppercase text-white/80">
            View Gallery
          </span>

          <motion.span
            className="text-white/80 text-[0.65rem] leading-none"
            animate={{ x: hovered ? 5 : 0 }}
            transition={{
              duration: hovered ? 0.55 : 0.2,
              delay: hovered ? 0.2 : 0,
              ease: hovered ? EASE_OVER : EASE_OUT,
            }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      <motion.span
        className="absolute top-4 right-4 font-serif text-[0.65rem] z-10 select-none"
        style={{ color: "rgba(255,255,255,0.45)" }}
        animate={{ opacity: hovered ? 0.75 : 0.25 }}
        transition={{ duration: hovered ? 0.6 : 0.4, ease: EASE_OVER }}
      >
        {project.index}
      </motion.span>
    </motion.button>
  );
}
