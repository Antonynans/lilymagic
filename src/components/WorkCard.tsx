import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "../types";

interface Props {
  project: Project;

  index: number;
  onSelect?: () => void;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function WorkCard({ project, index, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "60% center"],
  });

  const textX = useTransform(
    scrollYProgress,
    [0, 0.6],
    [index % 2 === 0 ? 40 : -40, 0],
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const imageLeft = index % 2 === 0;

  const ImageBlock = (
    <div className="relative overflow-hidden w-full h-full">
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        style={{ aspectRatio: "4/3" }}
      />
    </div>
  );

  const TextBlock = (
    <motion.div
      style={{ x: textX, opacity: textOpacity }}
      className="
      flex flex-col justify-center
      md:justify-end
      pb-10 md:pb-20
    "
    >
      <p
        className="text-warm-grey font-light mb-6"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
        }}
      >
        {project.tag}
      </p>

      <h2
        className="font-serif font-light text-warm-black mb-4"
        style={{
          fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          borderBottom: "1px solid currentColor",
          display: "inline-block",
          paddingBottom: "6px",
        }}
      >
        {project.title}
      </h2>

      <motion.button
        onClick={onSelect}
        className="flex items-center gap-3 mt-6 group w-fit"
        whileHover="hover"
        initial="rest"
      >
        <motion.span
          className="block bg-warm-black"
          style={{ height: "1px" }}
          variants={{
            rest: { width: 18 },
            hover: { width: 30 },
          }}
          transition={{ duration: 0.35 }}
        />
        <span
          className="font-serif text-warm-grey"
          style={{
            fontStyle: "italic",
            fontSize: "0.9rem",
          }}
        >
          View Album
        </span>
      </motion.button>
    </motion.div>
  );

  return (
    <div ref={ref}>
      <div
        className={`
        grid grid-cols-1 md:grid-cols-2 items-center gap-16
      `}
      >
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
  );
}
