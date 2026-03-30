import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = ["L", "I", "L", "Y", "\u00A0", "M", "A", "G", "I", "C"];
const LAST_LETTER_DELAY = (letters.length - 1) * 0.07 + 0.75;
const STRIKE_START = LAST_LETTER_DELAY + 0.2;
const SUBTITLE_START = STRIKE_START + 0.65;
const DISMISS_AT = (SUBTITLE_START + 3.0) * 1000;

export function Loader({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [drawSignature, setDrawSignature] = useState(false);
  const textRef = useRef<SVGTextElement>(null);
  const [pathData, setPathData] = useState({ length: 0, ready: false });

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, DISMISS_AT);
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    const t = setTimeout(() => setDrawSignature(true), SUBTITLE_START * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!drawSignature) return;
    const measure = () => {
      if (textRef.current) {
        const len = textRef.current.getComputedTextLength();

        setPathData({ length: len * 3.5, ready: true });
      }
    };

    const t = setTimeout(measure, 80);
    return () => clearTimeout(t);
  }, [drawSignature]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-warm-black"
            style={{ gap: "36px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative flex items-center">
              <div className="flex overflow-hidden">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-serif text-cream font-light"
                    style={{
                      fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
                      letterSpacing: "0.2em",
                      display: "inline-block",
                    }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      delay: i * 0.07,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <motion.span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "52%",
                  height: "1.5px",
                  background: "#c8b89a",
                  transformOrigin: "left center",
                  display: "block",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  delay: STRIKE_START,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: drawSignature ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              style={{ lineHeight: 1 }}
            >
              <svg
                viewBox="0 0 360 90"
                width="360"
                height="90"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                    .sig-text {
                      font-family: 'Dancing Script', cursive;
                      font-size: 52px;
                      font-weight: 700;
                    }
                  `}</style>
                </defs>

                {drawSignature && (
                  <>
                    <text
                      ref={textRef}
                      x="8"
                      y="72"
                      className="sig-text"
                      fill="none"
                      stroke="rgba(200,184,154,0.15)"
                      strokeWidth="1"
                    >
                      Makeup artist
                    </text>

                    <motion.text
                      x="8"
                      y="72"
                      className="sig-text"
                      fill="none"
                      stroke="#f0ebe3"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        paintOrder: "stroke fill",
                      }}
                      initial={{
                        strokeDasharray: pathData.ready
                          ? `${pathData.length}`
                          : "2000",
                        strokeDashoffset: pathData.ready
                          ? pathData.length
                          : 2000,
                      }}
                      animate={{
                        strokeDashoffset: 0,
                      }}
                      transition={{
                        duration: 2.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      Makeup artist
                    </motion.text>

                    <motion.text
                      x="8"
                      y="72"
                      className="sig-text"
                      fill="#f0ebe3"
                      stroke="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.0, duration: 0.6, ease: "easeIn" }}
                    >
                      Makeup artist
                    </motion.text>
                  </>
                )}

                <motion.path
                  d="M 6 82 Q 182 94 354 80"
                  stroke="#c8b89a"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  opacity="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: drawSignature ? 1 : 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 2.4,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
