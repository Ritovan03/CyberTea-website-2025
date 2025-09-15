"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

export default function NavbarDemo() {
  return (
    <div className="relative w-full">
      <FloatingNavbar />
    </div>
  );
}

function FloatingNavbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showPill, setShowPill] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isTouchInteractingRef = useRef(false);

  // Download function for the brochure
  const handleBrochureDownload = () => {
    const link = document.createElement("a");
    link.href = "/CyberTea Brochure.pdf"; // Path to your PDF in the public folder
    link.download = "CyberTea-3.0-Brochure.pdf"; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigationLinks = [
    { id: "home", label: "HOME", href: "/" },
    { id: "speakers", label: "SPEAKERS", href: "/speakers" },
    {
      id: "brochure",
      label: "BROCHURE",
      href: "#",
      isDownload: true,
      onClick: handleBrochureDownload,
    },
    { id: "register", label: "REGISTER", href: "/register" },
  ];

  const pastEvents = [
    {
      id: "cybertea-1",
      label: "CyberTEA 1.0",
      href: "https://cybertea.vercel.app/",
    },
    {
      id: "cybertea-2",
      label: "CyberTEA 2.0",
      href: "https://cybertea2-0.vercel.app/",
    },
  ];
  const [openPastDesktop, setOpenPastDesktop] = useState(false);

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const navbarVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.25,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08,
      },
    },
  };

  // Scroll-aware show/hide for the logo pill
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const lastY = lastScrollYRef.current;
        const delta = Math.abs(currentY - lastY);
        // Use threshold to avoid jitter
        if (delta > 6) {
          if (currentY > lastY) {
            // Scrolling down
            // Keep pill visible if user is interacting with navbar
            if (
              !isHoveringRef.current &&
              !isMobileMenuOpen &&
              !isTouchInteractingRef.current
            ) {
              setShowPill(false);
            }
            // If mobile menu is open, close it on downward scroll
            if (isMobileMenuOpen) {
              setIsMobileMenuOpen(false);
            }
          } else {
            // Scrolling up
            setShowPill(true);
          }
          lastScrollYRef.current = currentY;
        }
        scrollTickingRef.current = false;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Reveal if cursor near the top 120px
      if (e.clientY <= 120) {
        setShowPill(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      if (t.clientY <= 140) {
        isTouchInteractingRef.current = true;
        setShowPill(true);
      }
    };

    const handleTouchEnd = () => {
      isTouchInteractingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener(
      "touchstart",
      handleTouchStart as any,
      { passive: true } as any
    );
    window.addEventListener(
      "touchend",
      handleTouchEnd as any,
      { passive: true } as any
    );
    return () => {
      window.removeEventListener("scroll", handleScroll as any);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart as any);
      window.removeEventListener("touchend", handleTouchEnd as any);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
        onMouseEnter={() => {
          setIsHovered(true);
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          isHoveringRef.current = false;
        }}
      >
        {/* Invisible hover bridge */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-24 hidden md:block" />

        {/* Floating Logo (pill) with scroll-aware visibility */}
        <AnimatePresence initial={false}>
          {showPill && (
            <motion.div
              key="logo-pill"
              variants={logoVariants}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              whileHover="hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer relative z-10"
              onMouseEnter={() => setShowPill(true)}
            >
              <div className="bg-neutral-950/90 rounded-full px-7 py-3 shadow-lg shadow-white/10 border border-white/15 backdrop-blur">
                <h1 className="text-white tracking-wide font-mono font-bold text-xl whitespace-nowrap">
                  {"CyberTEA 3.0"}
                </h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navbar - slides down on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.nav
              variants={navbarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute top-16 left-1/2 transform -translate-x-1/2 hidden md:block"
            >
              <div className="bg-neutral-950/90 backdrop-blur rounded-2xl px-6 py-2.5 shadow-lg border border-white/10">
                <div className="flex items-center space-x-8">
                  {navigationLinks.map((link) => (
                    <motion.div
                      key={link.id}
                      variants={linkVariants}
                      className="relative"
                    >
                      {link.isDownload ? (
                        <button
                          onClick={() => {
                            setActiveLink(link.id);
                            link.onClick?.();
                          }}
                          className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2 px-2 relative flex items-center gap-1.5 group"
                        >
                          {link.label}
                          {/* <Download className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> */}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setActiveLink(link.id)}
                          className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2 px-2 relative"
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                  {/* Past Events desktop dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenPastDesktop(true)}
                    onMouseLeave={() => setOpenPastDesktop(false)}
                  >
                    <motion.div variants={linkVariants} className="relative">
                      <button className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2 px-2 whitespace-nowrap">
                        PAST EVENTS
                      </button>
                    </motion.div>
                    <AnimatePresence>
                      {openPastDesktop && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-5 bg-neutral-950/95 border border-white/10 rounded-xl shadow-lg backdrop-blur p-1 min-w-[12rem]"
                        >
                          {pastEvents.map((item) => (
                            <a
                              key={item.id}
                              href={item.href}
                              className="block text-white/80 hover:text-white text-sm px-3 py-2 rounded-md whitespace-nowrap"
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu - vertical dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-28 left-1/2 transform -translate-x-1/2 z-40 md:hidden w-64"
          >
            <div className="bg-neutral-950/90 backdrop-blur rounded-2xl py-4 shadow-xl border border-white/10">
              <div className="flex flex-col space-y-2 px-6">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    variants={linkVariants}
                    custom={index}
                    className="relative"
                  >
                    {link.isDownload ? (
                      <button
                        onClick={() => {
                          setActiveLink(link.id);
                          setIsMobileMenuOpen(false);
                          link.onClick?.();
                        }}
                        className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2.5 px-3.5 rounded-lg w-full text-left flex items-center gap-2"
                      >
                        {link.label}
                        {/* <Download className="w-3.5 h-3.5 opacity-70" /> */}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2.5 px-3.5 block rounded-lg"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
                {/* Mobile Past Events submenu */}
                <div className="pt-2">
                  <div className="text-white/70 text-xs tracking-wider mb-1">
                    PAST EVENTS
                  </div>
                  <div className="flex flex-col">
                    {pastEvents.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        className="text-white/90 hover:text-white text-sm py-2 px-3.5 rounded-lg"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
