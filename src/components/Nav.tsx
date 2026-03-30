import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const EASE = [0.76, 0, 0.24, 1] as const;

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "#contact" },
];

const scrollPositions: Record<string, number> = {};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = document.getElementById("scroll-container");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      scrollPositions[location.pathname] = container.scrollTop;
      setScrolled(container.scrollTop > 60);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const saved = scrollPositions[location.pathname];

    requestAnimationFrame(() => {
      container.scrollTo({
        top: saved ?? 0,
        behavior: "auto",
      });
    });
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const onHome = location.pathname === "/";
  const darkBg = onHome && !scrolled && !menuOpen;

  const fgColor = darkBg ? "rgba(255,255,255,0.88)" : "#0d0d0d";

  const scrollToHash = (hash: string) => {
    const target = document.querySelector(hash);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (href.startsWith("#")) {
      scrollToHash(href);
      return;
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);

    const container = containerRef.current;

    if (location.pathname === "/" && container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const linkClass = `
    relative text-[0.68rem] tracking-[0.18em] uppercase no-underline font-light
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px
    after:w-0 after:transition-[width] after:duration-300 hover:after:w-full pb-[2px]
  `;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[200] px-6 sm:px-10 py-6 sm:py-7"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
      >
        <div className="flex items-center justify-end relative">
          <ul></ul>

          <a
            href="/"
            onClick={handleLogoClick}
            className="font-serif font-light uppercase no-underline absolute left-1/2 -translate-x-1/2"
            style={{
              fontSize: "1.05rem",
              letterSpacing: "0.2em",
              color: fgColor,
            }}
          >
            Lily Magic
          </a>

          <ul className="hidden md:flex gap-8 lg:gap-10 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  className={linkClass}
                  style={{ color: fgColor }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <motion.span
              className="block h-px w-6"
              style={{ backgroundColor: fgColor }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />

            <motion.span
              className="block h-px w-4"
              style={{ backgroundColor: fgColor }}
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />

            <motion.span
              className="block h-px w-5"
              style={{ backgroundColor: fgColor }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[190] flex flex-col justify-center items-center bg-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    style={{ fontSize: "2.5rem" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
