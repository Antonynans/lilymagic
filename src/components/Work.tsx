import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";

function RevealWrapper({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function WorkCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  const imageLeft = index % 2 === 0;

  const ImageBlock = (
    <div
      className="w-full md:w-1/2 lg:flex-1 overflow-hidden"
      style={{
        paddingRight: imageLeft ? "0" : "2rem",
        paddingLeft: imageLeft ? "0" : "2rem",
      }}
    >
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <motion.div className="absolute inset-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale: imgScale }}
          />
        </motion.div>
      </div>
    </div>
  );

  const TextBlock = (
    <motion.div className="w-full md:w-1/2 lg:flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-0">
      <p
        style={{
          fontSize: "0.58rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: "16px",
          fontWeight: 400,
        }}
      >
        {project.tag}
        {project.date && (
          <span className="ml-2 opacity-60">{"{" + project.date + "}"}</span>
        )}
      </p>

      <h2
        className="font-serif font-light text-warm-black mb-8"
        style={{
          fontSize: "clamp(1.8rem, 5vw, 4rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          borderBottom: "1.5px solid currentColor",
          paddingBottom: "14px",
          display: "inline-block",
        }}
      >
        {project.title}
      </h2>

      <p
        className="text-warm-grey font-light mb-8 max-w-sm"
        style={{
          fontSize: "0.95rem",
          lineHeight: "1.7",
        }}
      >
        {project.description}
      </p>

      <motion.button
        onClick={onSelect}
        className="flex items-center gap-2 w-fit"
        whileHover="hover"
        initial="rest"
      >
        <motion.span
          className="block bg-warm-black"
          style={{ height: "1px" }}
          variants={{ rest: { width: 20 }, hover: { width: 34 } }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        <span
          className="font-serif text-warm-grey"
          style={{ fontStyle: "italic", fontSize: "0.9rem" }}
        >
          View Album
        </span>
      </motion.button>
    </motion.div>
  );

  return (
    <RevealWrapper delay={index * 0.1}>
      <div ref={ref} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center w-full gap-6 md:gap-0">
          <div className="block md:hidden w-full">
            {ImageBlock}
            {TextBlock}
          </div>

          <div className="hidden md:flex md:w-full md:items-center">
            {imageLeft ? (
              <>
                {ImageBlock}
                {TextBlock}
              </>
            ) : (
              <>
                {TextBlock}
                {ImageBlock}
              </>
            )}
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}

export function Work() {
  const navigate = useNavigate();

  return (
    <section
      id="work"
      className="bg-white pt-24 sm:pt-32 lg:pt-48 pb-24 sm:pb-32 lg:pb-48"
    >
      <div className="px-6 sm:px-12 mb-20">
        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
            <div>
              <p
                className="text-warm-grey font-light mb-6"
                style={{
                  fontSize: "0.64rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                }}
              >
                Selected Projects
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/work")}
              className="text-[0.68rem] tracking-[0.2em] uppercase text-warm-black flex items-center gap-3 pb-[2px] border-b border-warm-black hover:text-warm-grey hover:border-warm-grey transition-colors duration-300 w-fit whitespace-nowrap"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              View All Work <span>→</span>
            </motion.button>
          </div>
        </RevealWrapper>
      </div>

      <div className="flex flex-col gap-20 sm:gap-28 lg:gap-40 px-6 sm:px-0">
        {projects.map((project, i) => (
          <WorkCard
            key={project.id}
            project={project}
            index={i}
            onSelect={() => navigate(`/work/${project.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
