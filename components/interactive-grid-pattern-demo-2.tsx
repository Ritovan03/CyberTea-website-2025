"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { useEffect, useState, useRef, useCallback } from "react";

export function InteractiveGridPatternDemo() {
  // Grid configuration
  const cellSize = 30;
  const cols = 40;
  const rows = 50;
  const spotlightRadius = 20;

  // Center of spotlight (adjusted slightly upward for better visual balance)
  const centerX = Math.floor(cols / 2);
  const centerY = Math.floor(rows / 2) - 10;

  // Firefly state
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [fireflyOpacity, setFireflyOpacity] = useState(1);

  // Mouse position tracking
  const mouseGridPosRef = useRef({ x: 0, y: 0 });
  const lastMoveDirRef = useRef<"x" | "y" | null>(null);

  // Animation timer reference — NOW INITIALIZED!
  const animationRef = useRef<number | null>(null);

  // Animation timing config
  const MIN_DELAY = 50;
  const MAX_DELAY = 300;
  const MAX_SPEED_DISTANCE = 10;

  // Calculate hop delay based on distance to target
  const getHopDelay = useCallback(
    (frogX: number, frogY: number, targetX: number, targetY: number) => {
      const dx = Math.abs(targetX - frogX);
      const dy = Math.abs(targetY - frogY);
      const distance = dx + dy;

      const t = Math.max(0, Math.min(1, distance / MAX_SPEED_DISTANCE));
      const delay = MAX_DELAY - t * (MAX_DELAY - MIN_DELAY);

      return Math.round(delay);
    },
    []
  );

  // Hop logic: move firefly toward mouse position with adaptive speed
  const hopToMouse = useCallback(() => {
    setCurrentPos((prev) => {
      const target = mouseGridPosRef.current;

      let newX = prev.x;
      let newY = prev.y;

      const dx = target.x - prev.x;
      const dy = target.y - prev.y;

      // If already at target, schedule next hop
      if (dx === 0 && dy === 0) {
        const nextDelay = getHopDelay(prev.x, prev.y, target.x, target.y);
        animationRef.current = window.setTimeout(hopToMouse, nextDelay);
        return prev;
      }

      // Move in direction of greatest delta; prioritize last axis if equal
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > absDy) {
        newX += dx > 0 ? 1 : -1;
        lastMoveDirRef.current = "x";
      } else if (absDy > absDx) {
        newY += dy > 0 ? 1 : -1;
        lastMoveDirRef.current = "y";
      } else {
        // Equal movement — prefer last direction or default to Y
        if (lastMoveDirRef.current === "x" && dy !== 0) {
          newY += dy > 0 ? 1 : -1;
          lastMoveDirRef.current = "y";
        } else if (dx !== 0) {
          newX += dx > 0 ? 1 : -1;
          lastMoveDirRef.current = "x";
        } else if (dy !== 0) {
          newY += dy > 0 ? 1 : -1;
          lastMoveDirRef.current = "y";
        }
      }

      // Schedule next hop with dynamic delay
      const nextDelay = getHopDelay(newX, newY, target.x, target.y);
      animationRef.current = window.setTimeout(hopToMouse, nextDelay);

      return { x: newX, y: newY };
    });
  }, [getHopDelay]);

  // Start animation loop
  useEffect(() => {
    animationRef.current = window.setTimeout(hopToMouse, 150);
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [hopToMouse]);

  // Fade firefly based on distance from center (spotlight effect)
  useEffect(() => {
    const dx = currentPos.x - centerX;
    const dy = currentPos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxVisibleDistance = spotlightRadius;
    const t = Math.max(0, Math.min(1, distance / maxVisibleDistance));
    const opacity = 1 - t;

    setFireflyOpacity(opacity);
  }, [currentPos, centerX, centerY, spotlightRadius]);

  // Handle mouse movement to update target grid position
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const gridX = Math.floor(mouseX / cellSize);
      const gridY = Math.floor(mouseY / cellSize);

      const clampedX = Math.max(0, Math.min(cols - 1, gridX));
      const clampedY = Math.max(0, Math.min(rows - 1, gridY));

      mouseGridPosRef.current = { x: clampedX, y: clampedY };
    },
    [cellSize, cols, rows]
  );

  // Firefly SVG Icon — Bold, bright, full-cell design (30x30px)
  const FireflyIcon = () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        filter:
          "drop-shadow(0 0 6px rgba(255, 255, 102, 1)) drop-shadow(0 0 12px rgba(255, 255, 50, 0.6))",
      }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFAA" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFF66" stopOpacity="0.4" />
        </radialGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>

      {/* Enhanced glow */}
      <circle cx="100" cy="100" r="35" fill="url(#glow)" filter="url(#blur)" />

      {/* Bolder body */}
      <ellipse
        cx="100"
        cy="100"
        rx="12"
        ry="26"
        fill="#333"
        stroke="#000"
        strokeWidth="2.5"
      />

      {/* Head */}
      <circle
        cx="100"
        cy="76"
        r="9"
        fill="#222"
        stroke="#000"
        strokeWidth="2.5"
      />

      {/* Bright glowing eyes */}
      <circle
        cx="95"
        cy="73"
        r="3"
        fill="#FFF"
        stroke="#FFF"
        strokeWidth="1.5"
      />
      <circle
        cx="105"
        cy="73"
        r="3"
        fill="#FFF"
        stroke="#FFF"
        strokeWidth="1.5"
      />

      {/* Thick glowing antennae */}
      <path
        d="M100 70 Q 90 55 88 50"
        stroke="#FFFF66"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100 70 Q 110 55 112 50"
        stroke="#FFFF66"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Simplified bold wings */}
      <path
        d="M100 78 Q 75 105 75 130 Q 75 155 100 160 Q 125 155 125 130 Q 125 105 100 78 Z"
        fill="none"
        stroke="#BBB"
        strokeWidth="2.5"
        strokeOpacity="0.8"
      />

      {/* Bold abdomen segments */}
      <ellipse
        cx="100"
        cy="108"
        rx="9"
        ry="4"
        fill="#444"
        stroke="#111"
        strokeWidth="2"
      />
      <ellipse
        cx="100"
        cy="118"
        rx="8"
        ry="4"
        fill="#444"
        stroke="#111"
        strokeWidth="2"
      />
      <ellipse
        cx="100"
        cy="128"
        rx="7"
        ry="4"
        fill="#444"
        stroke="#111"
        strokeWidth="2"
      />

      {/* SUPER GLOWING LIGHT ORGAN */}
      <ellipse
        cx="100"
        cy="138"
        rx="8"
        ry="5"
        fill="#FFFF33"
        stroke="#FFDD00"
        strokeWidth="2.5"
      />
      <ellipse
        cx="100"
        cy="138"
        rx="10"
        ry="7"
        fill="#FFFF99"
        fillOpacity="0.6"
        filter="url(#blur)"
      />

      {/* Bold legs */}
      <path d="M95 95 L 85 88" stroke="#444" strokeWidth="2" />
      <path d="M105 95 L 115 88" stroke="#444" strokeWidth="2" />
      <path d="M93 108 L 82 100" stroke="#444" strokeWidth="2" />
      <path d="M107 108 L 118 100" stroke="#444" strokeWidth="2" />
      <path d="M92 120 L 82 112" stroke="#444" strokeWidth="2" />
      <path d="M108 120 L 118 112" stroke="#444" strokeWidth="2" />
    </svg>
  );

  // Firefly positioning style — fills entire grid cell exactly
  const fireflyStyle = {
    position: "absolute" as const,
    left: `${currentPos.x * cellSize}px`,
    top: `${currentPos.y * cellSize}px`,
    pointerEvents: "none",
    zIndex: 25,
    opacity: fireflyOpacity,
    transition: "opacity 0.3s ease",
  };

  const gridSize = cols * cellSize;

  return (
    <div
      className="relative w-full overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 60%, #1a1a1a 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section — Contains interactive grid and firefly */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "70vh" }}
      >
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          onMouseMove={handleMouseMove}
          style={{ cursor: "default" }}
        >
          {/* Grid container with dual mask: radial spotlight + vertical fade */}
          <div
            style={{
              width: gridSize,
              height: gridSize,
              position: "relative",
              // Single radial gradient mask for circular fade
              maskImage: `radial-gradient(circle ${
                spotlightRadius * cellSize
              }px at ${centerX * cellSize}px ${
                centerY * cellSize
              }px, white, transparent)`,
              WebkitMaskImage: `radial-gradient(circle ${
                spotlightRadius * cellSize
              }px at ${centerX * cellSize}px ${
                centerY * cellSize
              }px, white, transparent)`,
            }}
          >
            {/* Interactive Grid Pattern — only visible within masked area */}
            <InteractiveGridPattern
              width={cellSize}
              height={cellSize}
              squares={[cols, rows]}
              className={cn("stroke-white/50", "hover:stroke-gray-300")}
              squaresClassName="hover:fill-white/5"
            />

            {/* Firefly — positioned absolutely, unaffected by grid mask */}
            <div style={fireflyStyle as React.CSSProperties}>
              <FireflyIcon />
            </div>
          </div>

          {/* CyberTea 3.0 Overlay — positioned outside grid container to avoid mask */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 20,
              pointerEvents: "none",
              // Apply circular mask to text as well
              maskImage: `radial-gradient(circle ${
                spotlightRadius * cellSize * 1.2
              }px at 50% 50%, white, transparent)`,
              WebkitMaskImage: `radial-gradient(circle ${
                spotlightRadius * cellSize * 1.2
              }px at 50% 50%, white, transparent)`,
            }}
          >
            <h1
              className="text-5xl md:text-6xl font-black tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 12px rgba(255,255,255,0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              CyberTea 3.0
            </h1>
            <p
              className="mt-4 text-lg md:text-xl font-medium"
              style={{
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 0 8px rgba(0,0,0,0.3)",
              }}
            >
              CyberSecurity Trends & Emerging Applications
            </p>
          </div>
        </div>
      </div>

      {/* Content Below — Unaffected by masks */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Event Details</h2>
        <p className="text-gray-300">
          Dates: <span className="font-medium text-white">TBA</span>
        </p>
      </div>

      <div className="border-t border-gray-800 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-gray-500">
            Follow us for updates on speakers, agenda, and registration.
          </p>
        </div>
      </div>
    </div>
  );
}
