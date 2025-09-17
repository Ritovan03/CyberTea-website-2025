"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

export default function NavbarDemo() {
  return (
    <div className="relative w-full">
      <StickyNavbar />
    </div>
  );
}

function StickyNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Download function for the brochure
  const handleBrochureDownload = () => {
    const link = document.createElement("a");
    link.href = "/CyberTea Brochure.pdf"; // Path to your PDF in the public folder
    link.download = "CyberTea-3.0-Brochure.pdf"; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Smooth scroll function for navigation
  const handleSmoothScroll = (href: string, linkId: string) => {
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveLink(linkId);
      }
    }
  };

  const navigationLinks = [
    { id: "schedule", label: "SCHEDULE", href: "#schedule" },
    { id: "speakers", label: "SPEAKERS", href: "#speakers" },
    {
      id: "brochure",
      label: "BROCHURE",
      href: "#",
      isDownload: true,
      onClick: handleBrochureDownload,
    },
    { id: "register", label: "REGISTER", href: "#registration" },
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
  // Removed - no longer needed for sticky navbar

  return (
    <>
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        {/* Main Sticky Pill Navbar */}
        <motion.nav
          variants={navbarVariants}
          initial="visible"
          animate="visible"
          className="bg-neutral-950/90 backdrop-blur rounded-2xl px-6 py-2.5 shadow-lg border border-white/10"
        >
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleSmoothScroll("#home", "home")}
                className="text-white tracking-wide font-mono font-bold text-xl whitespace-nowrap hover:text-white/90 transition-colors duration-150 cursor-pointer"
              >
                CyberTEA 3.0
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSmoothScroll(link.href, link.id)}
                      className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2 px-2 relative"
                    >
                      {link.label}
                    </button>
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
                      className="absolute right-0 top-full mt-5 bg-neutral-950/95 border border-white/10 rounded-xl shadow-lg backdrop-blur p-1 min-w-[12rem]"
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/90 hover:text-white p-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </motion.nav>
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
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleSmoothScroll(link.href, link.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-2.5 px-3.5 rounded-lg w-full text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </motion.div>
                ))}
                {/* Mobile Past Events submenu */}
                <div className="pt-2">
                  <div className="text-white/70 text-xs tracking-wider mb-1 px-3.5">
                    PAST EVENTS
                  </div>
                  <div className="flex flex-col">
                    {pastEvents.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
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
