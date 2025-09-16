import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function createCardTexture(
  gl: GL,
  name: string,
  role: string,
  affiliation: string,
  image: string,
  textColor: string,
  bgColor: string,
  nameFont: string = "bold 26px Arial",
  roleFont: string = "20px Arial",
  affiliationFont: string = "16px Arial",
  linkedinUrl?: string
): Promise<{ texture: Texture; width: number; height: number }> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2d context");

    const cardWidth = 420;
    const cardHeight = 560;
    const imageSize = 220;
    const padding = 28;

    canvas.width = cardWidth;
    canvas.height = cardHeight;

    context.fillStyle = "#0a0a0a";
    context.fillRect(0, 0, cardWidth, cardHeight);

    context.beginPath();
    const cornerRadius = 16;
    context.moveTo(cornerRadius, 0);
    context.lineTo(cardWidth - cornerRadius, 0);
    context.quadraticCurveTo(cardWidth, 0, cardWidth, cornerRadius);
    context.lineTo(cardWidth, cardHeight - cornerRadius);
    context.quadraticCurveTo(
      cardWidth,
      cardHeight,
      cardWidth - cornerRadius,
      cardHeight
    );
    context.lineTo(cornerRadius, cardHeight);
    context.quadraticCurveTo(0, cardHeight, 0, cardHeight - cornerRadius);
    context.lineTo(0, cornerRadius);
    context.quadraticCurveTo(0, 0, cornerRadius, 0);
    context.closePath();
    context.clip();

    // Enhanced card background with subtle gradient and better border
    const gradient = context.createLinearGradient(0, 0, 0, cardHeight);
    gradient.addColorStop(0, "#1f1f1f");
    gradient.addColorStop(1, "#0f0f0f");
    context.fillStyle = gradient;
    context.fillRect(0, 0, cardWidth, cardHeight);

    // Enhanced border with subtle glow
    context.strokeStyle = "rgba(255, 255, 255, 0.15)";
    context.lineWidth = 2;
    context.strokeRect(1, 1, cardWidth - 2, cardHeight - 2);

    // Inner subtle glow
    context.strokeStyle = "rgba(255, 255, 255, 0.05)";
    context.lineWidth = 4;
    context.strokeRect(2, 2, cardWidth - 4, cardHeight - 4);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    img.onload = () => {
      const centerX = cardWidth / 2;
      const imageY = padding + imageSize / 2 + 10;

      context.fillStyle = "#0f0f0f";
      context.beginPath();
      context.arc(centerX, imageY, imageSize / 2 + 4, 0, Math.PI * 2);
      context.fill();

      const glowGradient = context.createRadialGradient(
        centerX,
        imageY,
        imageSize / 2 - 5,
        centerX,
        imageY,
        imageSize / 2 + 20
      );
      glowGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      glowGradient.addColorStop(1, "rgba(255, 255, 255, 0.08)");

      context.fillStyle = glowGradient;
      context.beginPath();
      context.arc(centerX, imageY, imageSize / 2 + 20, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(centerX, imageY, imageSize / 2 + 2, 0, Math.PI * 2);
      context.strokeStyle = "rgba(255, 255, 255, 0.2)";
      context.lineWidth = 1;
      context.stroke();

      context.save();
      context.beginPath();
      context.arc(centerX, imageY, imageSize / 2, 0, Math.PI * 2);
      context.closePath();
      context.clip();

      context.drawImage(
        img,
        centerX - imageSize / 2,
        imageY - imageSize / 2,
        imageSize,
        imageSize
      );
      context.restore();

      const textY = imageY + imageSize / 2 + 30;

      context.font = nameFont;
      context.fillStyle = "rgba(255, 255, 255, 0.95)";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const maxWidth = cardWidth - padding * 2;
      const nameLines = wrapText(context, name, maxWidth);
      const nameY = textY + 8;

      nameLines.forEach((line, index) => {
        context.fillText(line, centerX, nameY + index * 34);
      });

      context.font = roleFont;
      context.fillStyle = "rgba(255, 255, 255, 0.7)";
      context.textAlign = "center";

      const roleLines = wrapText(context, role, maxWidth);
      const roleY = nameY + nameLines.length * 34 + 18;

      roleLines.forEach((line, index) => {
        context.fillText(line, centerX, roleY + index * 26);
      });

      context.font = affiliationFont;
      context.fillStyle = "rgba(255, 255, 255, 0.5)";
      context.textAlign = "center";

      const affiliationLines = wrapText(context, affiliation, maxWidth);
      const affiliationY = roleY + roleLines.length * 26 + 12;

      affiliationLines.forEach((line, index) => {
        context.fillText(line, centerX, affiliationY + index * 22);
      });

      // Draw LinkedIn icon if URL is provided
      if (linkedinUrl) {
        const iconSize = 36;
        const iconX = cardWidth - iconSize - 18;
        const iconY = cardHeight - iconSize - 18;

        // Background circle with subtle styling to match dark theme
        context.fillStyle = "rgba(255, 255, 255, 0.08)";
        context.beginPath();
        context.arc(
          iconX + iconSize / 2,
          iconY + iconSize / 2,
          iconSize / 2 + 2,
          0,
          Math.PI * 2
        );
        context.fill();

        // Border for the circle
        context.strokeStyle = "rgba(255, 255, 255, 0.2)";
        context.lineWidth = 1;
        context.stroke();

        // Draw official LinkedIn logo using SVG path
        const scale = iconSize / 24; // Scale to fit our icon size
        const offsetX = iconX + (iconSize - 24 * scale) / 2;
        const offsetY = iconY + (iconSize - 24 * scale) / 2;

        context.fillStyle = "#ffffff";
        context.save();
        context.translate(offsetX, offsetY);
        context.scale(scale, scale);

        // Official LinkedIn logo path
        const path = new Path2D(
          "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        );
        context.fill(path);

        context.restore();
      }

      const texture = new Texture(gl, { generateMipmaps: false });
      texture.image = canvas;
      resolve({ texture, width: cardWidth, height: cardHeight });
    };
  });
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = context.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  name: string;
  role: string;
  affiliation: string;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  textColor: string;
  bgColor: string;
  borderRadius?: number;
  nameFont?: string;
  roleFont?: string;
  affiliationFont?: string;
  linkedinUrl?: string;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  name: string;
  role: string;
  affiliation: string;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  textColor: string;
  bgColor: string;
  borderRadius: number;
  nameFont?: string;
  roleFont?: string;
  affiliationFont?: string;
  linkedinUrl?: string;
  program!: Program;
  plane!: Mesh;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  isInitialized: boolean = false;

  constructor({
    geometry,
    gl,
    name,
    role,
    affiliation,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    textColor,
    bgColor,
    borderRadius = 0,
    nameFont,
    roleFont,
    affiliationFont,
    linkedinUrl,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.name = name;
    this.role = role;
    this.affiliation = affiliation;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.bgColor = bgColor;
    this.borderRadius = borderRadius;
    this.nameFont = nameFont;
    this.roleFont = roleFont;
    this.affiliationFont = affiliationFont;
    this.linkedinUrl = linkedinUrl;
    this.createShader();
    this.createMesh(
      name,
      role,
      affiliation,
      image,
      textColor,
      bgColor,
      nameFont,
      roleFont,
      affiliationFont,
      linkedinUrl
    );
  }

  createShader() {
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uSpeed;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.z = 0.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
      fragment: `
      precision highp float;
      uniform sampler2D tMap;
      uniform float uBorderRadius;
      varying vec2 vUv;
      
      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 d = abs(p) - b;
        return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
      }
      
      void main() {
        vec4 color = texture2D(tMap, vUv);
        
        float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
        
        float edgeSmooth = 0.002;
        float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
        
        gl_FragColor = vec4(color.rgb, alpha);
      }
    `,
      uniforms: {
        tMap: { value: null },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
  }

  async createMesh(
    name: string,
    role: string,
    affiliation: string,
    image: string,
    textColor: string,
    bgColor: string,
    nameFont?: string,
    roleFont?: string,
    affiliationFont?: string,
    linkedinUrl?: string
  ) {
    try {
      const { texture } = await createCardTexture(
        this.gl,
        name,
        role,
        affiliation,
        image,
        textColor,
        bgColor,
        nameFont,
        roleFont,
        affiliationFont,
        linkedinUrl
      );

      this.program.uniforms.tMap.value = texture;
      this.plane = new Mesh(this.gl, {
        geometry: this.geometry,
        program: this.program,
      });
      this.plane.setParent(this.scene);

      this.isInitialized = true;
      this.onResize();
    } catch (error) {
      console.error("Error creating mesh:", error);
    }
  }

  update(
    scroll: { current: number; last: number },
    direction: "right" | "left"
  ) {
    if (!this.isInitialized || !this.plane) return;

    this.plane.position.x = this.x - scroll.current - this.extra;

    // For normal carousel, keep cards flat (no bending effect)
    this.plane.position.y = 0;
    this.plane.rotation.z = 0;

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isAfter = this.isAfter = false;
    }
  }

  onResize({
    screen,
    viewport,
  }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (!this.isInitialized || !this.plane) return;

    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }

    this.scale = (this.screen.height / 1500) * 1.8;
    this.plane.scale.y =
      (this.viewport.height * (560 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (420 * this.scale)) / this.screen.width;

    this.padding = 1.5; // Slightly reduced padding for tighter layout
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: {
    name: string;
    role: string;
    affiliation: string;
    image: string;
    linkedinUrl?: string;
  }[];
  bend?: number;
  textColor?: string;
  bgColor?: string;
  borderRadius?: number;
  nameFont?: string;
  roleFont?: string;
  affiliationFont?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  galleryId?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  autoRotate: boolean = true;
  autoRotateSpeed: number = 0.5;
  isHovered: boolean = false;
  autoRotateTimer: number = 0;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasItems: {
    name: string;
    role: string;
    affiliation: string;
    image: string;
    linkedinUrl?: string;
  }[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  galleryId: string;

  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;
  boundOnMouseEnter!: (e: Event) => void;
  boundOnMouseLeave!: (e: Event) => void;

  isDown: boolean = false;
  start: number = 0;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 0, // Default to 0 for flat carousel
      textColor = "#ffffff",
      bgColor = "#0a0a0a", // Updated default
      borderRadius = 0.08, // Updated default
      nameFont = "bold 30px system-ui, -apple-system, sans-serif", // Updated default
      roleFont = "22px system-ui, -apple-system, sans-serif", // Updated default
      affiliationFont = "18px system-ui, -apple-system, sans-serif", // Updated default
      scrollSpeed = 1, // Slower default speed
      scrollEase = 0.08, // Smoother easing
      galleryId = "default",
      autoRotate = true,
      autoRotateSpeed = 0.8, // Slower auto-rotate
    }: AppConfig
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.galleryId = galleryId;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.autoRotate = autoRotate;
    this.autoRotateSpeed = autoRotateSpeed;
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(
      items,
      bend,
      textColor,
      bgColor,
      borderRadius,
      nameFont,
      roleFont,
      affiliationFont
    );
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items:
      | {
          name: string;
          role: string;
          affiliation: string;
          image: string;
          linkedinUrl?: string;
        }[]
      | undefined,
    bend: number = 1,
    textColor: string,
    bgColor: string,
    borderRadius: number,
    nameFont: string,
    roleFont: string,
    affiliationFont: string
  ) {
    const defaultItems = [
      {
        name: "John Doe",
        role: "Software Engineer",
        affiliation: "Google Inc.",
        image: "https://picsum.photos/seed/1/300/300",
      },
      {
        name: "Jane Smith",
        role: "Product Designer",
        affiliation: "Apple Inc.",
        image: "https://picsum.photos/seed/2/300/300",
      },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasItems = galleryItems.concat(galleryItems);

    this.mediasItems.forEach((data, index) => {
      const media = new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        name: data.name,
        role: data.role,
        affiliation: data.affiliation,
        image: data.image,
        index,
        length: this.mediasItems.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        textColor,
        bgColor,
        borderRadius,
        nameFont,
        roleFont,
        affiliationFont,
        linkedinUrl: data.linkedinUrl,
      });

      this.medias.push(media);
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    // Check if the interaction is within the card area
    const rect = this.renderer.gl.canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    // Define the card interaction area
    const cardAreaTop = rect.height * 0.1;
    const cardAreaBottom = rect.height * 0.9;
    const cardAreaLeft = rect.width * 0.1;
    const cardAreaRight = rect.width * 0.9;

    const isInCardArea =
      mouseX >= cardAreaLeft &&
      mouseX <= cardAreaRight &&
      mouseY >= cardAreaTop &&
      mouseY <= cardAreaBottom;

    if (!isInCardArea) return;

    // Check if click is on LinkedIn icon area
    const linkedinIconClicked = this.checkLinkedInIconClick(mouseX, mouseY);
    if (linkedinIconClicked) {
      e.preventDefault();
      e.stopPropagation();
      return; // Don't start dragging if LinkedIn icon was clicked
    }

    this.isDown = true;
    this.isHovered = true;
    this.scroll.position = this.scroll.current;
    this.start = clientX;

    // Add move and up listeners only when actively dragging
    window.addEventListener("mousemove", this.boundOnTouchMove, {
      passive: false,
    });
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchmove", this.boundOnTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  checkLinkedInIconClick(mouseX: number, mouseY: number): boolean {
    if (!this.medias || this.medias.length === 0) return false;

    const canvasRect = this.renderer.gl.canvas.getBoundingClientRect();

    // Check all visible cards, not just the center one
    for (let i = 0; i < this.medias.length; i++) {
      const media = this.medias[i];
      const mediaData = this.mediasItems[i % this.mediasItems.length];

      if (!media.isInitialized || !media.plane || !mediaData?.linkedinUrl)
        continue;

      // Calculate card position on screen
      const cardScreenX =
        canvasRect.width / 2 +
        media.plane.position.x * (canvasRect.width / this.viewport.width);
      const cardScreenY =
        canvasRect.height / 2 +
        media.plane.position.y * (canvasRect.height / this.viewport.height);

      const cardWidth =
        media.plane.scale.x * (canvasRect.width / this.viewport.width);
      const cardHeight =
        media.plane.scale.y * (canvasRect.height / this.viewport.height);

      // Check if this card is visible (at least partially on screen)
      const cardLeft = cardScreenX - cardWidth / 2;
      const cardRight = cardScreenX + cardWidth / 2;
      const isCardVisible = cardRight > 0 && cardLeft < canvasRect.width;

      if (!isCardVisible) continue;

      // Calculate LinkedIn icon position for this specific card
      const iconSize = 36 * media.scale;
      const iconScreenSize =
        iconSize * (canvasRect.width / this.viewport.width);
      const iconX =
        cardScreenX +
        cardWidth / 2 -
        iconScreenSize -
        18 * media.scale * (canvasRect.width / this.viewport.width);
      const iconY =
        cardScreenY +
        cardHeight / 2 -
        iconScreenSize -
        18 * media.scale * (canvasRect.height / this.viewport.height);

      // Check if click is within this card's icon area
      const isInIconArea =
        mouseX >= iconX &&
        mouseX <= iconX + iconScreenSize &&
        mouseY >= iconY &&
        mouseY <= iconY + iconScreenSize;

      if (isInIconArea) {
        // Open LinkedIn profile in new tab
        window.open(mediaData.linkedinUrl, "_blank", "noopener,noreferrer");
        return true;
      }
    }

    return false;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    e.preventDefault(); // Only prevent default when actively dragging
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    // Reduced touch sensitivity for smoother movement
    const distance = (this.start - x) * (this.scrollSpeed * 0.02);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;

    // Remove move and up listeners when done dragging
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);

    setTimeout(() => {
      if (!this.isHovered) {
        // Auto-resume logic if needed
      }
    }, 2000);

    this.onCheck();
  }

  onWheel(e: Event) {
    // Only prevent default if user is actively scrolling horizontally or interacting with carousel
    // and the mouse is within the card area (center region)
    const rect = this.renderer.gl.canvas.getBoundingClientRect();
    const mouseEvent = e as WheelEvent;
    const mouseX = mouseEvent.clientX - rect.left;
    const mouseY = mouseEvent.clientY - rect.top;

    // Define the card interaction area (center region where cards are visible)
    const cardAreaTop = rect.height * 0.1; // 10% from top
    const cardAreaBottom = rect.height * 0.9; // 90% from top
    const cardAreaLeft = rect.width * 0.1; // 10% from left
    const cardAreaRight = rect.width * 0.9; // 90% from left

    const isInCardArea =
      mouseX >= cardAreaLeft &&
      mouseX <= cardAreaRight &&
      mouseY >= cardAreaTop &&
      mouseY <= cardAreaBottom;

    if (this.isHovered && isInCardArea) {
      e.preventDefault();
      e.stopPropagation();
      const wheelEvent = e as WheelEvent;
      const delta =
        wheelEvent.deltaY ||
        (wheelEvent as any).wheelDelta ||
        (wheelEvent as any).detail;
      // Reduced wheel sensitivity for smoother scrolling
      this.scroll.target +=
        (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.15;
      this.onCheckDebounce();
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }

  update() {
    // Continuous slow movement for normal carousel
    if (this.autoRotate && !this.isHovered && !this.isDown) {
      this.autoRotateTimer += 0.016;
      this.scroll.target += this.autoRotateSpeed * 0.015; // Slower continuous movement
    }

    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    const boundOnMouseEnter = this.onMouseEnter.bind(this);
    const boundOnMouseLeave = this.onMouseLeave.bind(this);
    const boundOnMouseMove = this.onMouseMove.bind(this);

    window.addEventListener("resize", this.boundOnResize);

    // Add wheel event only to canvas, not window
    this.renderer.gl.canvas.addEventListener("wheel", this.boundOnWheel, {
      passive: false,
    });

    // Touch/mouse events for carousel interaction
    this.renderer.gl.canvas.addEventListener(
      "mousedown",
      this.boundOnTouchDown
    );
    this.renderer.gl.canvas.addEventListener(
      "touchstart",
      this.boundOnTouchDown,
      { passive: true }
    );

    // Mouse move for cursor changes
    this.renderer.gl.canvas.addEventListener("mousemove", boundOnMouseMove);

    // Only add move listeners to window when actively dragging
    // These will be added/removed dynamically in onTouchDown/onTouchUp
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    // Hover events for auto-rotation control
    this.renderer.gl.canvas.addEventListener("mouseenter", boundOnMouseEnter);
    this.renderer.gl.canvas.addEventListener("mouseleave", boundOnMouseLeave);
    this.boundOnMouseEnter = boundOnMouseEnter;
    this.boundOnMouseLeave = boundOnMouseLeave;
  }

  onMouseMove(e: MouseEvent) {
    const rect = this.renderer.gl.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if hovering over LinkedIn icon
    const isOverLinkedIn = this.checkLinkedInIconHover(mouseX, mouseY);

    if (isOverLinkedIn) {
      this.renderer.gl.canvas.style.cursor = "pointer";
    } else {
      this.renderer.gl.canvas.style.cursor = "grab";
    }
  }

  checkLinkedInIconHover(mouseX: number, mouseY: number): boolean {
    if (!this.medias || this.medias.length === 0) return false;

    const canvasRect = this.renderer.gl.canvas.getBoundingClientRect();

    // Check all visible cards for hover
    for (let i = 0; i < this.medias.length; i++) {
      const media = this.medias[i];
      const mediaData = this.mediasItems[i % this.mediasItems.length];

      if (!media.isInitialized || !media.plane || !mediaData?.linkedinUrl)
        continue;

      // Calculate card position on screen
      const cardScreenX =
        canvasRect.width / 2 +
        media.plane.position.x * (canvasRect.width / this.viewport.width);
      const cardScreenY =
        canvasRect.height / 2 +
        media.plane.position.y * (canvasRect.height / this.viewport.height);

      const cardWidth =
        media.plane.scale.x * (canvasRect.width / this.viewport.width);
      const cardHeight =
        media.plane.scale.y * (canvasRect.height / this.viewport.height);

      // Check if this card is visible (at least partially on screen)
      const cardLeft = cardScreenX - cardWidth / 2;
      const cardRight = cardScreenX + cardWidth / 2;
      const isCardVisible = cardRight > 0 && cardLeft < canvasRect.width;

      if (!isCardVisible) continue;

      // Calculate LinkedIn icon position for this specific card
      const iconSize = 36 * media.scale;
      const iconScreenSize =
        iconSize * (canvasRect.width / this.viewport.width);
      const iconX =
        cardScreenX +
        cardWidth / 2 -
        iconScreenSize -
        18 * media.scale * (canvasRect.width / this.viewport.width);
      const iconY =
        cardScreenY +
        cardHeight / 2 -
        iconScreenSize -
        18 * media.scale * (canvasRect.height / this.viewport.height);

      // Check if hover is within this card's icon area
      const isInIconArea =
        mouseX >= iconX &&
        mouseX <= iconX + iconScreenSize &&
        mouseY >= iconY &&
        mouseY <= iconY + iconScreenSize;

      if (isInIconArea) {
        return true;
      }
    }

    return false;
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);

    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas) {
      this.renderer.gl.canvas.removeEventListener("wheel", this.boundOnWheel);
      this.renderer.gl.canvas.removeEventListener(
        "mousedown",
        this.boundOnTouchDown
      );
      this.renderer.gl.canvas.removeEventListener(
        "touchstart",
        this.boundOnTouchDown
      );
      this.renderer.gl.canvas.removeEventListener(
        "mousemove",
        this.onMouseMove.bind(this)
      );
      this.renderer.gl.canvas.removeEventListener(
        "mouseenter",
        this.boundOnMouseEnter
      );
      this.renderer.gl.canvas.removeEventListener(
        "mouseleave",
        this.boundOnMouseLeave
      );
    }

    // Clean up any remaining window listeners
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);

    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(
        this.renderer.gl.canvas as HTMLCanvasElement
      );
    }
  }
}

interface CircularGalleryProps {
  items?: {
    name: string;
    role: string;
    affiliation: string;
    image: string;
    linkedinUrl?: string;
  }[];
  bend?: number;
  textColor?: string;
  bgColor?: string;
  borderRadius?: number;
  nameFont?: string;
  roleFont?: string;
  affiliationFont?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  galleryId?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export default function CircularGallery({
  items,
  bend = 0, // Set to 0 for flat carousel
  textColor = "#ffffff",
  bgColor = "#0a0a0a",
  borderRadius = 0.08,
  nameFont = "bold 30px system-ui, -apple-system, sans-serif",
  roleFont = "22px system-ui, -apple-system, sans-serif",
  affiliationFont = "18px system-ui, -apple-system, sans-serif",
  scrollSpeed = 1, // Slower speed for smoother movement
  scrollEase = 0.08, // Smoother easing
  galleryId = "default",
  autoRotate = true,
  autoRotateSpeed = 0.8, // Slower auto-rotate speed
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Add styles for elements that can't be fully converted to Tailwind
    const style = document.createElement("style");
    style.textContent = `
      .circular-gallery-track {
        display: flex;
        height: 100%;
        padding: 0;
        align-items: center;
        gap: 40px;
        position: relative;
        z-index: 2;
        justify-content: flex-start;
        width: max-content;
        min-width: 100%;
      }

      .speaker-card {
        flex: 0 0 auto;
        width: 420px;
        height: 560px;
        background: linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%);
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        position: relative;
        z-index: 2;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .speaker-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .card-image-container {
        width: 220px;
        height: 220px;
        margin: 0 auto;
        margin-top: 35px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .speaker-card:hover .card-image {
        transform: scale(1.08);
      }

      .card-content {
        margin-top: 30px;
        padding: 0 28px;
        position: relative;
      }

      .card-name {
        font-size: 28px;
        font-weight: bold;
        margin: 0 0 15px 0;
        color: rgba(255, 255, 255, 0.95);
        font-family: system-ui, -apple-system, sans-serif;
      }

      .card-role {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 15px 0;
        font-weight: 500;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .card-affiliation {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.5);
        margin: 0;
        font-style: italic;
        font-family: system-ui, -apple-system, sans-serif;
      }
    `;
    document.head.appendChild(style);

    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      bgColor,
      borderRadius,
      nameFont,
      roleFont,
      affiliationFont,
      scrollSpeed,
      scrollEase,
      galleryId,
      autoRotate,
      autoRotateSpeed,
    });

    return () => {
      app.destroy();
      // Clean up the style element
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [
    items,
    bend,
    textColor,
    bgColor,
    borderRadius,
    nameFont,
    roleFont,
    affiliationFont,
    scrollSpeed,
    scrollEase,
    galleryId,
    autoRotate,
    autoRotateSpeed,
  ]);

  return (
    <div
      className="w-full h-[650px] overflow-hidden relative cursor-grab
                 hover:cursor-grab active:cursor-grabbing
                 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{
        background: "transparent",
      }}
      data-gallery-id={galleryId}
      ref={containerRef}
    />
  );
}
