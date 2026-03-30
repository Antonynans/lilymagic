import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function PageTransition() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9000] bg-warm-black"
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          exit={{ scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
}
