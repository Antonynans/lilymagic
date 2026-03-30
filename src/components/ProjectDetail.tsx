import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../data";
import type { Project } from "../types";

interface Props {
  project: Project;
  gallery: string[];
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const EXPO = [0.76, 0, 0.24, 1] as const;

function RevealImage({
  src,
  alt,
  aspectRatio = "75%",
  onClick,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "65% center"],
  });

  const clipY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useTransform(clipY, (v) => `inset(0 0 ${v}% 0)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.07, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.6, 1]);

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden cursor-zoom-in"
      onClick={onClick}
    >
      <div className="relative w-full" style={{ paddingBottom: aspectRatio }}>
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ scale, opacity }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
}

function RevealLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 0.6], [32, 0]);
  const op = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div style={{ y, opacity: op }}>{children}</motion.div>
    </div>
  );
}

export function ProjectDetail({ project, gallery }: Props) {
  const navigate = useNavigate();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const projectIdx = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(projectIdx + 1) % projects.length];
  const prevProject =
    projects[(projectIdx - 1 + projects.length) % projects.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "22%"]);

  type Row =
    | { type: "full"; src: string; idx: number }
    | { type: "pair"; left: string; right: string; lidx: number; ridx: number };

  const bodyImages = gallery.slice(1);
  const rows: Row[] = [];
  let gi = 0;
  let ri = 0;

  while (gi < bodyImages.length) {
    if (ri % 3 === 0) {
      rows.push({ type: "full", src: bodyImages[gi], idx: gi + 1 });
      gi++;
    } else {
      if (gi + 1 >= bodyImages.length) {
        rows.push({ type: "full", src: bodyImages[gi], idx: gi + 1 });
        gi++;
      } else {
        rows.push({
          type: "pair",
          left: bodyImages[gi],
          right: bodyImages[gi + 1],
          lidx: gi + 1,
          ridx: gi + 2,
        });
        gi += 2;
      }
    }
    ri++;
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "100vh" }}
      >
        <motion.div
          className="absolute inset-0 w-full"
          style={{ y: heroY, height: "120%", top: "-10%" }}
        >
          <motion.img
            src={gallery[0]}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: EXPO }}
          />
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 42%, rgba(0,0,0,0.52) 100%)",
          }}
        />

        <motion.span
          className="absolute top-8 right-6 sm:right-12 z-20 font-serif"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {project.index}
        </motion.span>

        <div className="absolute bottom-0 left-0 px-6 sm:px-14 pb-14 z-10">
          <motion.p
            className="text-white/60 mb-3"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          >
            {project.tag}
            {project.date && (
              <span className="ml-2 opacity-50">
                {"{" + project.date + "}"}
              </span>
            )}
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            {project.title.split(" ").map((word, wi) => (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  marginRight: "0.3em",
                }}
              >
                <motion.span
                  className="font-serif font-light text-white block"
                  style={{
                    fontSize: "clamp(2.5rem, 7vw, 7rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.95,
                  }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.35 + wi * 0.1,
                    ease: EXPO,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.div
            className="mt-3"
            style={{
              height: "1.5px",
              background: "rgba(255,255,255,0.5)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EXPO }}
          />
        </div>

        <motion.div
          className="absolute bottom-8 right-6 sm:right-12 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="w-px"
            style={{
              height: 44,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
            }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
          <span
            style={{
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Scroll
          </span>
        </motion.div>
      </div>

      {project.description && (
        <div className="px-6 sm:px-14 pt-16 sm:pt-20 pb-12 sm:pb-16 max-w-3xl">
          <RevealLine>
            <p
              className="text-warm-grey leading-[1.9] font-light"
              style={{ fontSize: "0.95rem" }}
            >
              {project.description}
            </p>
          </RevealLine>
        </div>
      )}

      <div className="flex flex-col" style={{ gap: "4px" }}>
        {rows.map((row, rowIdx) => {
          if (row.type === "full") {
            return (
              <RevealImage
                key={rowIdx}
                src={row.src}
                alt={`${project.title} ${row.idx}`}
                aspectRatio="66%" 
                onClick={() => setLightboxSrc(row.src)}
              />
            );
          }

          return (
            <div key={rowIdx} className="flex flex-col md:flex-row gap-[4px]">
              <div className="w-full md:w-[60%]">
                <RevealImage
                  src={row.left}
                  alt={`${project.title} ${row.lidx}`}
                  aspectRatio="125%"
                  onClick={() => setLightboxSrc(row.left)}
                />
              </div>

              <div className="w-full md:w-[60%]">
                <RevealImage
                  src={row.right}
                  alt={`${project.title} ${row.ridx}`}
                  aspectRatio="125%"
                  onClick={() => setLightboxSrc(row.right)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="relative overflow-hidden cursor-pointer mt-1"
        style={{ height: "42vh", minHeight: 260 }}
        onClick={() => navigate(`/work/${nextProject.id}`)}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <img
            src={nextProject.image}
            alt={nextProject.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.46)" }}
          />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center px-8">
          <p
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 12,
            }}
          >
            Next Project
          </p>
          <h3
            className="font-serif font-light"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {nextProject.title}
          </h3>
          <motion.div
            className="mt-5 flex items-center gap-3"
            whileHover={{ x: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              View Album
            </span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>→</span>
          </motion.div>
        </div>
      </div>

      <div className="px-6 sm:px-14 py-10 sm:py-12 border-t border-warm-grey/15 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
        <motion.button
          onClick={() => navigate(`/work/${prevProject.id}`)}
          className="flex items-center gap-2 text-warm-grey hover:text-warm-black transition-colors duration-300"
          style={{
            fontSize: "0.63rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.3 }}
        >
          ← {prevProject.title}
        </motion.button>

        <button
          onClick={() => navigate("/work")}
          className="font-serif italic text-warm-grey hover:text-warm-black transition-colors duration-300"
          style={{ fontSize: "0.9rem" }}
        >
          All Work
        </button>

        <motion.button
          onClick={() => navigate(`/work/${nextProject.id}`)}
          className="flex items-center gap-2 text-warm-grey hover:text-warm-black transition-colors duration-300"
          style={{
            fontSize: "0.63rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          {nextProject.title} →
        </motion.button>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.93)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxSrc(null)}
          >
            <button
              className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors"
              style={{
                fontSize: "1.4rem",
                fontWeight: 300,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setLightboxSrc(null)}
            >
              ✕
            </button>
            <motion.img
              src={lightboxSrc}
              alt=""
              className="max-w-full max-h-[92vh] object-contain"
              style={{ maxWidth: "92vw" }}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
