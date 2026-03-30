import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data";
import { ProjectDetail } from "../components/ProjectDetail";
import { Nav } from "../components/Nav";
import { Contact } from "../components/Contact";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function PageWipe() {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-[999] pointer-events-none"
      style={{ transformOrigin: "top" }}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

export default function WorkPageById() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <motion.div
        className="min-h-screen bg-white flex items-center justify-center relative z-[300]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <p className="text-warm-grey text-[0.62rem] tracking-[0.28em] uppercase mb-4">
            404
          </p>

          <h1
            className="font-serif font-light text-3xl mb-8"
            style={{ letterSpacing: "-0.02em" }}
          >
            Project not found
          </h1>

          <button
            onClick={() => navigate("/work")}
            className="px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase border-b border-warm-black hover:opacity-50 transition-opacity"
          >
            ← Back to Work
          </button>
        </div>
      </motion.div>
    );
  }

  const rawGallery = project.gallery ?? [];
  const gallery =
    rawGallery.length > 0 && rawGallery[0] === project.image
      ? rawGallery
      : [project.image, ...rawGallery];

  return (
    <>
      <PageWipe />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{
          opacity: { duration: 0.7, delay: 0.2, ease: EASE },
          y: { duration: 0.9, delay: 0.2, ease: EASE },
        }}
      >
        <Nav />
        <ProjectDetail project={project} gallery={gallery} />
      </motion.div>
      <Contact />
    </>
  );
}
