import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titleLines = ["Turning vision", "into beauty,", "Owerri"];

const heroImages = ["/image-1.jpeg", "/image-3.jpeg", "/image-5.jpeg"];

interface HeroProps {
  loaderDone?: boolean;
}

export function Hero({ loaderDone = false }: HeroProps) {
  const bgTextRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageIntervalRef = useRef<number>();

  useEffect(() => {
    const onScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      if (bgTextRef.current) {
        const y = container.scrollTop * 0.3;
        bgTextRef.current.style.transform = `translate(-50%, calc(-50% + ${y}px))`;
      }
    };
    const container = document.querySelector("[data-scroll-container]");
    container?.addEventListener("scroll", onScroll, { passive: true });
    return () => container?.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    imageIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
    };
  }, []);

  const handleScroll = () => {
    const next = document.getElementById("marquee-section");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  const show = loaderDone;

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-end px-12 pb-[72px] overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 font-serif font-light pointer-events-none select-none leading-none whitespace-nowrap z-10"
        style={{
          fontSize: "clamp(14vw, 18vw, 22vw)",
          color: "rgba(255,255,255,0.03)",
          letterSpacing: "-0.02em",
          transform: "translate(-50%, -50%)",
        }}
      >
        MAKEUP
      </div>

      <div className="relative z-20 mb-8">
        <motion.p
          className="text-[0.7rem] tracking-[0.22em] uppercase text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          Professional Makeup Artist
        </motion.p>

        <h1
          className="font-serif font-light leading-[1.0] max-w-[900px] text-white"
          style={{
            fontSize: "clamp(3.5rem, 7.5vw, 8.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={show ? { y: 0 } : {}}
                transition={{
                  duration: 1.0,
                  delay: 0.3 + i * 0.12,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={
                  i === 2
                    ? { fontStyle: "italic", color: "rgba(255,255,255,0.8)" }
                    : {}
                }
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-sm text-[0.88rem] leading-[1.75] text-white/80 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          Specialized in Bridal Makeup, Advertising Shootings and Events.
          Creating unforgettable looks with precision and artistry.
        </motion.p>
      </div>

      <motion.span
        className="absolute bottom-[72px] right-12 font-serif text-[0.85rem] tracking-[0.25em] uppercase text-white/70 italic z-20"
        initial={{ opacity: 0, y: 15 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
      >
        Owerri · Nigeria
      </motion.span>

      <div className="absolute bottom-[72px] left-12 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="w-1.5 h-1.5 rounded-full bg-white/40 transition-all duration-300"
            animate={{
              scale: currentImageIndex === index ? 1.5 : 1,
              backgroundColor:
                currentImageIndex === index
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <motion.button
        onClick={handleScroll}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-label="Scroll to next section"
      >
        <motion.div
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
          }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
        <span className="text-[0.6rem] tracking-[0.25em] uppercase text-white/60">
          Scroll
        </span>
      </motion.button>
    </section>
  );
}
