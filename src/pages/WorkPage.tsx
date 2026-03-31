import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data";
import { Nav } from "../components/Nav";
import { Contact } from "../components/Contact";

type GridCell =
  | { type: "project"; projectIndex: number; flatIdx: number }
  | { type: "gap"; id: string };

function buildDesktopCells(count: number): GridCell[] {
  const cells: GridCell[] = [];
  let pi = 0;
  let row = 0;
  let fi = 0;

  while (pi < count) {
    if (row % 2 === 0) {
      cells.push({ type: "project", projectIndex: pi++, flatIdx: fi++ });
      cells.push({ type: "gap", id: `gap-${row}-mid` });
      fi++;
      cells.push({
        type: "project",
        projectIndex: pi < count ? pi++ : -1,
        flatIdx: fi++,
      });
    } else {
      cells.push({ type: "gap", id: `gap-${row}-L` });
      fi++;
      cells.push({
        type: "project",
        projectIndex: pi < count ? pi++ : -1,
        flatIdx: fi++,
      });
      cells.push({ type: "gap", id: `gap-${row}-R` });
      fi++;
    }
    row++;
  }
  return cells;
}

function getCellDelay(flatIdx: number) {
  const col = flatIdx % 3;
  const row = Math.floor(flatIdx / 3);
  return 0.1 + row * 0.07 + col * 0.05;
}

function WipeCover({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none"
      style={{ background: "white", transformOrigin: "top" }}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.0, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

const CELL_HEIGHT_LG = 440;
const CELL_HEIGHT_MD = 320;

export function WorkPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const desktopCells = buildDesktopCells(projects.length);
  const isHovering = hoveredIndex !== null;
  const hoveredProject = isHovering ? projects[hoveredIndex!] : null;

  return (
    <>
      <motion.section
        id="work-page"
        className="relative min-h-screen pb-24"
        style={{ backgroundColor: isHovering ? "transparent" : "white" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Nav />

        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <AnimatePresence mode="sync">
            {hoveredProject && (
              <motion.div
                key={hoveredProject.id}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(100% 0 0 0)" }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              >
                <img
                  src={hoveredProject.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          style={{ position: "relative", zIndex: 10 }}
          className="pt-28 sm:pt-32 mb-0 text-center overflow-hidden px-6"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{
              y: isHovering ? -10 : 0,
              opacity: isHovering ? 0 : 1,
            }}
            transition={{
              y: {
                duration: isHovering ? 0.4 : 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              opacity: {
                duration: isHovering ? 0.22 : 0.7,
                delay: isHovering ? 0 : 0.1,
              },
            }}
          >
            <p
              className="text-warm-grey font-light mb-4"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </p>
            <h1
              className="font-serif font-light leading-[0.95]"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              All
              <br />
              <em className="text-warm-grey">Work</em>
            </h1>
          </motion.div>
        </div>

        <div className="lg:hidden relative z-10 grid grid-cols-1 gap-[3px] mt-10 px-3 sm:px-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              style={{
                height: CELL_HEIGHT_MD,
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + idx * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <ProjectCard
                project={project}
                className="h-full"
                onSelect={() => navigate(`/work/${project.id}`)}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
              />
            </motion.div>
          ))}
        </div>

        <div
          className="hidden lg:grid relative z-[1] mt-10"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {desktopCells.map((cell, flatIdx) => {
            const delay = getCellDelay(flatIdx);

            if (cell.type === "gap") {
              return (
                <motion.div
                  key={cell.id}
                  style={{ height: CELL_HEIGHT_LG }}
                  animate={{
                    backgroundColor: isHovering
                      ? "rgba(255,255,255,0)"
                      : "rgba(255,255,255,1)",
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              );
            }

            if (cell.projectIndex < 0 || cell.projectIndex >= projects.length) {
              return (
                <div
                  key={`ph-${flatIdx}`}
                  style={{ height: CELL_HEIGHT_LG, background: "transparent" }}
                />
              );
            }

            return (
              <div
                key={`project-${cell.projectIndex}`}
                style={{
                  height: CELL_HEIGHT_LG,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <ProjectCard
                  project={projects[cell.projectIndex]}
                  className="h-full"
                  onSelect={() =>
                    navigate(`/work/${projects[cell.projectIndex].id}`)
                  }
                  onHoverStart={() => setHoveredIndex(cell.projectIndex)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
                <WipeCover delay={delay} />
              </div>
            );
          })}
        </div>
      </motion.section>
      <Contact />
    </>
  );
}
