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
import "./CircularGallery.css";

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
  affiliationFont: string = "16px Arial"
): Promise<{ texture: Texture; width: number; height: number }> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2d context");

    // Card dimensions
    const cardWidth = 320;
    const cardHeight = 420;
    const imageSize = 180;
    const padding = 20;

    canvas.width = cardWidth;
    canvas.height = cardHeight;

    context.fillStyle = "#121212";
    context.fillRect(0, 0, cardWidth, cardHeight);


    context.beginPath();
    const cornerRadius = 12;
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

    const gradient = context.createLinearGradient(0, 0, 0, cardHeight);
    gradient.addColorStop(0, "#1a1a1a");
    gradient.addColorStop(1, "#121212");
    context.fillStyle = gradient;
    context.fillRect(0, 0, cardWidth, cardHeight);

    context.strokeStyle = "rgba(255, 255, 255, 0.08)";
    context.lineWidth = 1;
    context.strokeRect(0, 0, cardWidth, cardHeight);

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
        imageSize / 2 + 15
      );
      glowGradient.addColorStop(0, "rgba(80, 120, 255, 0)");
      glowGradient.addColorStop(1, "rgba(80, 120, 255, 0.15)");

      context.fillStyle = glowGradient;
      context.beginPath();
      context.arc(centerX, imageY, imageSize / 2 + 15, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(centerX, imageY, imageSize / 2 + 2, 0, Math.PI * 2);
      context.strokeStyle = "rgba(80, 120, 255, 0.4)";
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

      const textY = imageY + imageSize / 2 + 25;

      context.font = nameFont;
      context.fillStyle = "rgba(255, 255, 255, 0.95)";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const maxWidth = cardWidth - padding * 2;
      const nameLines = wrapText(context, name, maxWidth);
      const nameY = textY + 5;

      nameLines.forEach((line, index) => {
        context.fillText(line, centerX, nameY + index * 30);
      });

      context.font = roleFont;
      context.fillStyle = "rgba(80, 120, 255, 0.9)";
      context.textAlign = "center";

      const roleLines = wrapText(context, role, maxWidth);
      const roleY = nameY + nameLines.length * 30 + 15;

      roleLines.forEach((line, index) => {
        context.fillText(line, centerX, roleY + index * 24);
      });

      context.font = affiliationFont;
      context.fillStyle = "rgba(255, 255, 255, 0.6)";
      context.textAlign = "center";

      const affiliationLines = wrapText(context, affiliation, maxWidth);
      const affiliationY = roleY + roleLines.length * 24 + 10;

      affiliationLines.forEach((line, index) => {
        context.fillText(line, centerX, affiliationY + index * 20);
      });

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
      affiliationFont
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
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
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
    affiliationFont?: string
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
        affiliationFont
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

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

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

    // Increased scale multiplier for bigger cards
    this.scale = (this.screen.height / 1500) * 1.4;
    this.plane.scale.y =
      (this.viewport.height * (450 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (350 * this.scale)) / this.screen.width;

    // Increased padding between cards
    this.padding = 1.7;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: { name: string; role: string; affiliation: string; image: string }[];
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
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
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

  isDown: boolean = false;
  start: number = 0;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      bgColor = "#121212", // Matching your site's background
      borderRadius = 0,
      nameFont = "bold 26px Arial",
      roleFont = "20px Arial",
      affiliationFont = "16px Arial",
      scrollSpeed = 2,
      scrollEase = 0.05,
      galleryId = "default",
    }: AppConfig
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.galleryId = galleryId;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
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
      | { name: string; role: string; affiliation: string; image: string }[]
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
      });

      this.medias.push(media);
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta =
      wheelEvent.deltaY ||
      (wheelEvent as any).wheelDelta ||
      (wheelEvent as any).detail;
    this.scroll.target +=
      (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
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

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
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
  items?: { name: string; role: string; affiliation: string; image: string }[];
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
}

export default function CircularGallery({
  items,
  bend = 2.5,
  textColor = "#ffffff",
  bgColor = "#121212",
  borderRadius = 0.05,
  nameFont = "bold 26px Arial",
  roleFont = "20px Arial",
  affiliationFont = "16px Arial",
  scrollSpeed = 2,
  scrollEase = 0.05,
  galleryId = "default",
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
    });

    return () => {
      app.destroy();
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
  ]);

  return (
    <div
      className="circular-gallery-container"
      data-gallery-id={galleryId}
      ref={containerRef}
    />
  );
}
