import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -40 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

function RevealUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="px-12 py-36 lg:grid grid-cols-2 gap-20 items-center border-t border-mid-grey"
    >
      <RevealLeft>
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-warm-grey mb-6">
          The Artist
        </p>
        <h2
          className="font-serif font-light leading-[1.1]"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-0.02em' }}
        >
          Craft meets
          <br />
          <em className="text-warm-grey">intuition</em>
        </h2>
      </RevealLeft>

      <RevealUp delay={0.15}>
        <p className="text-[0.92rem] leading-[1.9] text-warm-grey font-light my-6">
          Lily Magic is a professional Makeup Artist based in Nigeria, specialized in Bridal
          Makeup, Advertising Shootings and Events. With a meticulous eye for detail and a deep
          understanding of light and form, she transforms faces into living art.
        </p>
        <p className="text-[0.92rem] leading-[1.9] text-warm-grey font-light mb-10">
          Her work bridges the worlds of fashion, beauty, and photography — always with sensitivity,
          precision, and an unmistakable personal touch.
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="
            inline-flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase
            text-warm-black border border-warm-black px-7 py-4 no-underline
            transition-all duration-300 ease-expo-in-out
            hover:bg-warm-black hover:text-cream hover:gap-6
          "
        >
          Get in touch <span>→</span>
        </a>
      </RevealUp>
    </section>
  );
}
