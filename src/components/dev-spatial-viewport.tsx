"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Eye, RotateCw, Pause, Play, Cpu, Layers, Network } from "lucide-react";
import { projects } from "@/lib/site";
import { SPATIAL_SKILLS, createSkillBadgeTexture } from "@/lib/skill-textures";

interface DevSpatialViewportProps {
  onSelectProject?: (projectId: string) => void;
  className?: string;
}

interface NodeData {
  id: string;
  name: string;
  tag: string;
  color: number;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
  glowMesh?: THREE.Mesh;
}

const NODE_DEFINITIONS: NodeData[] = [
  {
    id: "stockmatrix",
    name: "StockMatrix",
    tag: "FastAPI · WebSockets · React",
    color: 0x38bdf8, // sky-400
    position: new THREE.Vector3(-2.8, 1.4, 0.8),
  },
  {
    id: "ai-reel-studio",
    name: "AI Reel Studio",
    tag: "Gemini AI · React 19 · Vite",
    color: 0x818cf8, // indigo-400
    position: new THREE.Vector3(2.8, 1.6, -0.6),
  },
  {
    id: "kira-calculator",
    name: "Kira Calculator",
    tag: "Python · PySide6 · pytest",
    color: 0xfbbf24, // amber-400
    position: new THREE.Vector3(-2.2, -1.8, -1.0),
  },
  {
    id: "smart-file-organizer",
    name: "Smart File Organizer",
    tag: "Python CLI · Watchdog",
    color: 0x34d399, // emerald-400
    position: new THREE.Vector3(2.4, -1.5, 1.2),
  },
  {
    id: "yt-downloader",
    name: "YT Downloader",
    tag: "Electron · yt-dlp · React",
    color: 0xf43f5e, // rose-500
    position: new THREE.Vector3(0.0, 2.5, -1.2),
  },
  {
    id: "mpm-services",
    name: "Melbourne Property Mgmt",
    tag: "Next.js · Vercel · Production",
    color: 0xa855f7, // purple-500
    position: new THREE.Vector3(0.0, -2.5, 1.2),
  },
];

export default function DevSpatialViewport({
  onSelectProject,
  className = "",
}: DevSpatialViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"matrix" | "topology" | "wireframe">("matrix");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);
  const [activeNodeName, setActiveNodeName] = useState<string>("Core Architecture");
  const [fps, setFps] = useState<number>(60);
  const [vertexCount, setVertexCount] = useState<number>(2480);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);

  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  const onSelectProjectRef = useRef(onSelectProject);
  useEffect(() => {
    onSelectProjectRef.current = onSelectProject;
  }, [onSelectProject]);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const linesGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const coreWireRef = useRef<THREE.Mesh | null>(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, prevX: 0, prevY: 0 });

  // Initialize Three.js Scene once on mount
  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !canvasContainer) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Safe WebGL Renderer creation
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    const canvas = renderer.domElement;
    canvas.className = "absolute inset-0 size-full cursor-grab active:cursor-grabbing";
    canvas.setAttribute("aria-label", "Interactive 3D WebGL Developer Architecture");
    canvasContainer.appendChild(canvas);

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x818cf8, 2.5);
    dirLight1.position.set(5, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa5b4fc, 3.0, 12);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 1. Central Core: Solid glowing Icosahedron + outer wireframe Octahedron
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x312e81,
      emissiveIntensity: 0.6,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    const coreWireGeo = new THREE.OctahedronGeometry(1.65, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    coreGroup.add(coreWire);
    coreWireRef.current = coreWire;

    // Inner glowing core nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // 2. Project Nodes
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);
    nodesGroupRef.current = nodesGroup;

    const linesGroup = new THREE.Group();
    scene.add(linesGroup);
    linesGroupRef.current = linesGroup;

    NODE_DEFINITIONS.forEach((item) => {
      const nodeNodeGroup = new THREE.Group();
      nodeNodeGroup.position.copy(item.position);
      nodeNodeGroup.userData = { id: item.id, name: item.name };

      // Node sphere
      const nodeGeo = new THREE.SphereGeometry(0.38, 20, 20);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: item.color,
        roughness: 0.3,
        metalness: 0.7,
        emissive: item.color,
        emissiveIntensity: 0.5,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeNodeGroup.add(nodeMesh);

      // Node orbiting ring
      const ringGeo = new THREE.TorusGeometry(0.62, 0.025, 12, 36);
      const ringMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      nodeNodeGroup.add(ringMesh);

      nodesGroup.add(nodeNodeGroup);

      // Connection Line to Core (Origin)
      const points = [new THREE.Vector3(0, 0, 0), item.position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineDashedMaterial({
        color: item.color,
        dashSize: 0.25,
        gapSize: 0.15,
        transparent: true,
        opacity: 0.6,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      linesGroup.add(line);
    });

    // 2.5 3D Skill Icon Badges in Spatial Orbit (Python, React, Next, TS, FastAPI, Docker)
    const skillNodesGroup = new THREE.Group();
    scene.add(skillNodesGroup);

    const viewportSkills = SPATIAL_SKILLS.slice(0, 6);
    const skillSpritesList: { sprite: THREE.Sprite; angle: number; radius: number; speed: number; y: number }[] = [];

    viewportSkills.forEach((skill, idx) => {
      const angle = (idx / viewportSkills.length) * Math.PI * 2;
      const radius = 3.7;
      const y = (idx % 2 === 0 ? 1.05 : -1.05) + (idx % 3 === 0 ? 0.35 : -0.35);

      const texture = createSkillBadgeTexture(skill);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.35, 0.49, 1);
      sprite.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      sprite.userData = { id: skill.id, name: `${skill.name} · ${skill.tagline}` };
      skillNodesGroup.add(sprite);

      skillSpritesList.push({
        sprite,
        angle,
        radius,
        speed: 0.18 + (idx % 2) * 0.04,
        y,
      });
    });

    // 3. Ambient Code Particles Field
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x818cf8),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x34d399),
      new THREE.Color(0xf472b6),
      new THREE.Color(0xc7d2fe),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    setVertexCount(coreGeo.attributes.position.count + particleCount + 4 * 400);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates (-1 to +1)
      mouseVector.x = (clientX / rect.width) * 2 - 1;
      mouseVector.y = -(clientY / rect.height) * 2 + 1;

      mouseRef.current.targetX = mouseVector.x * 0.45;
      mouseRef.current.targetY = mouseVector.y * 0.35;

      // Detect hover on project nodes & skill badges
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(
        [...nodesGroup.children, ...skillNodesGroup.children],
        true
      );
      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== nodesGroup && root.parent !== skillNodesGroup) {
          root = root.parent;
        }
        if (root.userData?.name) {
          setActiveNodeName(root.userData.name);
          canvas.style.cursor = "pointer";
          return;
        }
      }
      canvas.style.cursor = "grab";
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseVector.x = (clientX / rect.width) * 2 - 1;
      mouseVector.y = -(clientY / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(nodesGroup.children, true);
      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== nodesGroup) {
          root = root.parent;
        }
        if (root.userData?.id && onSelectProjectRef.current) {
          onSelectProjectRef.current(root.userData.id);
        }
      }
    };

    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("click", handleClick);

    // Touch support for drag
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = (e.touches[0].clientX - touchStartX) * 0.005;
        const dy = (e.touches[0].clientY - touchStartY) * 0.005;
        mouseRef.current.targetX += dx;
        mouseRef.current.targetY += dy;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height || 460;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // WebGL context loss recovery
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
    const handleContextRestored = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight || 460);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    // Animation Loop
    const clock = new THREE.Clock();
    let frameCounter = 0;
    let lastTime = performance.now();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // FPS tracking
      frameCounter++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCounter * 1000) / (now - lastTime)));
        frameCounter = 0;
        lastTime = now;
      }

      // Smooth camera interpolation based on mouse target
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      camera.position.x = mouseRef.current.x * 3.5;
      camera.position.y = mouseRef.current.y * 2.8;
      camera.lookAt(0, 0, 0);

      // Core rotation
      if (coreGroup) {
        if (isRotatingRef.current) {
          coreMesh.rotation.x += delta * 0.35;
          coreMesh.rotation.y += delta * 0.45;
          coreWire.rotation.x -= delta * 0.25;
          coreWire.rotation.y += delta * 0.35;
          coreWire.rotation.z += delta * 0.15;
        }
      }

      // Orbiting project nodes
      if (nodesGroup) {
        nodesGroup.children.forEach((child, i) => {
          // Subtle hover breathing
          const offset = i * (Math.PI / 2);
          child.position.y = NODE_DEFINITIONS[i].position.y + Math.sin(time * 1.8 + offset) * 0.15;
          child.position.x = NODE_DEFINITIONS[i].position.x + Math.cos(time * 1.2 + offset) * 0.1;

          // Rotate individual rings
          if (child.children[1]) {
            child.children[1].rotation.z += delta * 0.8;
          }
        });

        // Update lines
        if (linesGroup) {
          linesGroup.children.forEach((lineMesh, i) => {
            const line = lineMesh as THREE.Line;
            const targetPos = nodesGroup.children[i]?.position;
            if (targetPos) {
              const geo = line.geometry as THREE.BufferGeometry;
              const positions = geo.attributes.position.array as Float32Array;
              positions[3] = targetPos.x;
              positions[4] = targetPos.y;
              positions[5] = targetPos.z;
              geo.attributes.position.needsUpdate = true;
              line.computeLineDistances();
            }
          });
        }
      }

      // Orbiting 3D Skill Badge Sprites
      if (skillNodesGroup) {
        skillSpritesList.forEach((item) => {
          if (isRotatingRef.current) {
            item.angle += delta * item.speed;
          }
          item.sprite.position.x = Math.cos(item.angle) * item.radius;
          item.sprite.position.z = Math.sin(item.angle) * item.radius;
          item.sprite.position.y = item.y + Math.sin(time * 1.4 + item.angle) * 0.12;
        });
      }

      // Particle cloud gentle rotation
      if (particles) {
        particles.rotation.y = time * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      // Dispose geometries & materials
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.Points ||
          obj instanceof THREE.Sprite
        ) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
      if (canvasContainer && canvas && canvasContainer.contains(canvas)) {
        canvasContainer.removeChild(canvas);
      }
      renderer.dispose();
    };
  }, []);

  // Handle Mode & Wireframe state changes
  useEffect(() => {
    if (!coreMeshRef.current || !coreWireRef.current) return;
    const coreMat = coreMeshRef.current.material as THREE.MeshStandardMaterial;
    const coreWireMat = coreWireRef.current.material as THREE.MeshBasicMaterial;

    if (wireframeOnly) {
      coreMat.wireframe = true;
      coreWireMat.opacity = 0.9;
    } else {
      coreMat.wireframe = false;
      coreWireMat.opacity = 0.65;
    }

    if (mode === "topology") {
      coreMeshRef.current.scale.set(0.65, 0.65, 0.65);
      coreWireRef.current.scale.set(0.85, 0.85, 0.85);
    } else if (mode === "wireframe") {
      coreMat.wireframe = true;
      coreWireRef.current.scale.set(1.2, 1.2, 1.2);
    } else {
      coreMeshRef.current.scale.set(1, 1, 1);
      coreWireRef.current.scale.set(1, 1, 1);
    }
  }, [mode, wireframeOnly]);

  const handleResetCamera = useCallback(() => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-border bg-slate-950/80 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* 3D Canvas Host with touch-pan-y for mobile scrolling */}
      {webGlAvailable ? (
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 size-full cursor-grab active:cursor-grabbing touch-pan-y"
          aria-label="Interactive 3D WebGL Developer Architecture"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <Cpu className="size-10 text-accent mb-3 animate-pulse" />
          <p className="font-display font-semibold text-foreground">3D Spatial Rig (CSS Fallback Active)</p>
          <p className="text-xs text-muted max-w-sm mt-1">WebGL is disabled or accelerating in low-power mode.</p>
        </div>
      )}

      {/* Top HUD: Mode Selector & Telemetry */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 p-3 sm:p-5">
        {/* Active Node Badge */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-2.5 sm:px-3.5 py-1.5 backdrop-blur-md max-w-[200px] sm:max-w-none">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
          </span>
          <span className="font-mono text-xs font-semibold text-white tracking-wide truncate">
            {activeNodeName}
          </span>
          <span className="hidden min-[480px]:inline text-[11px] font-mono text-slate-400 border-l border-white/10 pl-2">
            3D Spatial View
          </span>
        </div>

        {/* Real-time Telemetry Stats */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-3 font-mono text-[11px] text-slate-400 rounded-xl border border-white/10 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
          <span className="tabular-nums text-emerald-400 font-semibold">{fps} FPS</span>
          <span className="text-white/20">|</span>
          <span className="tabular-nums">{vertexCount} Verts</span>
          <span className="text-white/20">|</span>
          <span className="text-accent">Three.js WebGL</span>
        </div>
      </div>

      {/* Bottom HUD: Mode Controls & Quick Toggles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 p-3 sm:p-5">
        {/* Mode Switcher Tabs */}
        <div className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 rounded-xl border border-white/10 bg-black/70 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMode("matrix")}
            className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
              mode === "matrix"
                ? "bg-accent text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="size-3.5" />
            <span className="hidden min-[480px]:inline">Matrix Core</span>
            <span className="min-[480px]:hidden">Core</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("topology")}
            className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
              mode === "topology"
                ? "bg-accent text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Network className="size-3.5" />
            <span className="hidden min-[480px]:inline">Node Topology</span>
            <span className="min-[480px]:hidden">Nodes</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("wireframe")}
            className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
              mode === "wireframe"
                ? "bg-accent text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="size-3.5" />
            <span className="hidden min-[480px]:inline">Wireframe HUD</span>
            <span className="min-[480px]:hidden">Wire</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setIsRotating((v) => !v)}
            aria-label={isRotating ? "Pause 3D rotation" : "Play 3D rotation"}
            title={isRotating ? "Pause 3D rotation" : "Play 3D rotation"}
            className="flex size-7.5 sm:size-8 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-slate-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            {isRotating ? <Pause className="size-3 sm:size-3.5" /> : <Play className="size-3 sm:size-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setWireframeOnly((v) => !v)}
            aria-label="Toggle wireframe mode"
            title="Toggle wireframe geometry"
            className={`flex size-7.5 sm:size-8 items-center justify-center rounded-xl border border-white/10 backdrop-blur-md transition-colors ${
              wireframeOnly
                ? "bg-accent text-white"
                : "bg-black/60 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Layers className="size-3 sm:size-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            aria-label="Reset camera orientation"
            title="Reset camera center"
            className="flex size-7.5 sm:size-8 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-slate-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCw className="size-3 sm:size-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Interactive Project Pills overlay for quick navigation */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-2">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectProject?.(p.id)}
            className="pointer-events-auto group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-left backdrop-blur-md transition-all hover:border-accent/50 hover:bg-black/80 hover:translate-x-[-4px]"
          >
            <div>
              <p className="font-mono text-[11px] font-semibold text-white group-hover:text-accent transition-colors">
                {p.title}
              </p>
              <p className="font-mono text-[10px] text-slate-400">
                {p.version} · {p.status}
              </p>
            </div>
            <Eye className="size-3.5 text-slate-500 group-hover:text-accent transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
