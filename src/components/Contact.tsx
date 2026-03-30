import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

export function Contact() {
  return (
    <section id="contact" className="px-12 py-36 text-center">
      <RevealUp>
        <span className="block text-[0.68rem] tracking-[0.28em] uppercase text-warm-grey mb-7">
          Let's work together
        </span>
      </RevealUp>

      <RevealUp delay={0.1}>
        <a
          href="mailto:hola@lilymagic.com"
          className="
            font-serif font-light leading-[1] text-warm-black no-underline
            inline-block relative
            after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:right-0
            after:h-[2px] after:bg-warm-black after:origin-right after:scale-x-0
            after:transition-transform after:duration-[600ms] after:ease-expo-in-out
            hover:after:scale-x-100 hover:after:origin-left
          "
          style={{ fontSize: 'clamp(1.5rem, 6.5vw, 8rem)', letterSpacing: '-0.02em' }}
        >
          hola@lilymagic.com
        </a>
      </RevealUp>

      <RevealUp delay={0.2}>
        <div className="mt-16 flex justify-center gap-12">
          {[
            { label: 'Instagram', href: 'https://instagram.com/lilymagic_mua' },
            { label: 'Pinterest', href: 'https://www.pinterest.es/lilymagic' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[0.68rem] tracking-[0.22em] uppercase text-warm-grey no-underline
                transition-colors duration-300 hover:text-warm-black
              "
            >
              {link.label}
            </a>
          ))}
        </div>
      </RevealUp>
    </section>
  );
}
