"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SPATIAL_SKILLS, createSkillBadgeTexture } from "@/lib/skill-textures";

/** Deterministic random number generator for stable particle seeds */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SectorConfig {
  id: string;
  name: string;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  coreScale: number;
  gridAlpha: number;
  orbsExpand: number;
}

const SECTORS: SectorConfig[] = [
  {
    id: "home",
    name: "01 // NEXUS CORE",
    camPos: [0, 0, 7.8],
    lookAt: [0, 0, 0],
    coreScale: 1.0,
    gridAlpha: 0.15,
    orbsExpand: 1.0,
  },
  {
    id: "about",
    name: "02 // COGNITIVE LATTICE",
    camPos: [-1.4, -0.6, 8.2],
    lookAt: [0.2, -0.2, 0],
    coreScale: 0.85,
    gridAlpha: 0.22,
    orbsExpand: 1.15,
  },
  {
    id: "skills",
    name: "03 // SKILL CONSTELLATION",
    camPos: [1.6, -1.2, 8.6],
    lookAt: [-0.3, -0.4, 0],
    coreScale: 0.75,
    gridAlpha: 0.35,
    orbsExpand: 1.45,
  },
  {
    id: "projects",
    name: "04 // PRODUCTION CLUSTERS",
    camPos: [-0.8, -1.8, 9.2],
    lookAt: [0.1, -0.6, 0],
    coreScale: 0.9,
    gridAlpha: 0.28,
    orbsExpand: 1.3,
  },
  {
    id: "dev-updates",
    name: "05 // TELEMETRY STREAMS",
    camPos: [1.0, -2.4, 8.8],
    lookAt: [-0.2, -0.8, 0],
    coreScale: 0.8,
    gridAlpha: 0.38,
    orbsExpand: 1.2,
  },
  {
    id: "experience",
    name: "06 // TEMPORAL SPINE",
    camPos: [-1.2, -3.0, 8.5],
    lookAt: [0.3, -1.0, 0],
    coreScale: 0.7,
    gridAlpha: 0.42,
    orbsExpand: 1.1,
  },
  {
    id: "resume",
    name: "07 // DOSSIER VAULT",
    camPos: [0.6, -3.6, 8.2],
    lookAt: [0, -1.2, 0],
    coreScale: 0.75,
    gridAlpha: 0.3,
    orbsExpand: 1.15,
  },
  {
    id: "contact",
    name: "08 // QUANTUM BEACON",
    camPos: [0, -4.2, 7.4],
    lookAt: [0, -1.4, 0],
    coreScale: 1.1,
    gridAlpha: 0.45,
    orbsExpand: 0.9,
  },
];

export default function GlobalBackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. WebGL Renderer with graceful fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "absolute inset-0 size-full pointer-events-none";
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.038);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 3. Dynamic Sci-Fi Lighting Palette
    const CYAN = new THREE.Color("#38bdf8");
    const VIOLET = new THREE.Color("#818cf8");
    const AMBER = new THREE.Color("#fbbf24");
    const EMERALD = new THREE.Color("#34d399");

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(VIOLET, 1.4);
    dirLight1.position.set(5, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(CYAN, 1.1);
    dirLight2.position.set(-6, -3, 3);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight(CYAN, 4.0, 28);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 4. Central 3D Spatial Rig Group
    const spatialRig = new THREE.Group();
    scene.add(spatialRig);

    // Core Solid Faceted Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x070c18,
      emissive: CYAN,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.18,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    spatialRig.add(coreMesh);

    // Counter-rotating Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: VIOLET,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    spatialRig.add(wireMesh);

    // 5. Gyroscopic Orbital Torus Rings
    const ringGroup = new THREE.Group();
    spatialRig.add(ringGroup);

    const ringConfigs = [
      { radius: 2.4, tube: 0.014, rotX: Math.PI / 4, rotY: 0.2, color: CYAN, speed: 0.18 },
      { radius: 3.3, tube: 0.016, rotX: -Math.PI / 3, rotY: -0.35, color: VIOLET, speed: -0.14 },
      { radius: 4.2, tube: 0.018, rotX: Math.PI / 5, rotY: Math.PI / 4, color: AMBER, speed: 0.22 },
    ];

    const rings: { mesh: THREE.Mesh; speed: number }[] = [];
    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 96);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.48,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.y = cfg.rotY;
      ringGroup.add(mesh);
      rings.push({ mesh, speed: cfg.speed });
    });

    // 6. Interactive 3D Skill Constellation with Authentic Icons
    // Renders Python, React, Next.js, TypeScript, FastAPI, Docker, PostgreSQL, Git, GraphQL, Tailwind
    const orbsGroup = new THREE.Group();
    spatialRig.add(orbsGroup);

    const skillSprites: THREE.Sprite[] = [];
    const orbMeshes: THREE.Mesh[] = [];
    const orbConnectingLines: THREE.Line[] = [];

    SPATIAL_SKILLS.forEach((skill, idx) => {
      const angle = (idx / SPATIAL_SKILLS.length) * Math.PI * 2;
      const isOuterTier = idx % 2 === 1;
      const radius = isOuterTier ? 4.5 : 3.4;
      const yOffset = isOuterTier ? (idx % 4 === 1 ? 1.4 : -1.2) : (idx % 4 === 0 ? 0.8 : -0.7);

      const x = Math.cos(angle) * radius;
      const y = yOffset;
      const z = Math.sin(angle) * radius;

      // Glowing 3D Anchor Node
      const col = new THREE.Color(skill.accentColor);
      const nodeGeo = new THREE.OctahedronGeometry(0.18, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.8,
        metalness: 0.6,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      orbsGroup.add(nodeMesh);
      orbMeshes.push(nodeMesh);

      // Ultra-crisp 3D Canvas Sprite Badge with Vector Icon & Typography
      const texture = createSkillBadgeTexture(skill);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.52, 1);
      sprite.position.set(x, y + 0.38, z);
      orbsGroup.add(sprite);
      skillSprites.push(sprite);

      // Connecting Laser Line to Quantum Core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineDashedMaterial({
        color: col,
        dashSize: 0.2,
        gapSize: 0.18,
        transparent: true,
        opacity: 0.28,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      spatialRig.add(line);
      orbConnectingLines.push(line);
    });

    // 7. Architectural 3D Ground Spatial Grid Plane
    const gridHelper = new THREE.GridHelper(32, 32, CYAN, 0x1e293b);
    gridHelper.position.set(0, -2.8, 0);
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.22;
    scene.add(gridHelper);

    // 8. Depth Particle Stardust Field (1,000 Depth-attenuated stars)
    const particleCount = 1000;
    const rand = mulberry32(1337);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [CYAN, VIOLET, AMBER, EMERALD, new THREE.Color("#94a3b8"), new THREE.Color("#cbd5e1")];

    for (let i = 0; i < particleCount; i++) {
      const r = 7 + rand() * 26;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.75;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const col = palette[Math.floor(rand() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Interactive State & Listeners (Scroll & Mouse Parallax)
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    const targetCamPos = new THREE.Vector3(0, 0, 7.8);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    let targetCoreScale = 1.0;
    let targetGridAlpha = 0.22;
    let targetOrbsExpand = 1.0;
    let spatialMode: "reactive" | "orbit" | "zen" = "reactive";

    const onPointerMove = (e: MouseEvent) => {
      targetPointerX = (e.clientX / window.innerWidth) * 2 - 1;
      targetPointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const updateActiveSectorFromScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const midPoint = scrollY + winHeight * 0.45;

      let foundIdx = 0;
      for (let i = 0; i < SECTORS.length; i++) {
        const el = document.getElementById(SECTORS[i].id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (midPoint >= top && midPoint <= bottom) {
            foundIdx = i;
            break;
          }
        }
      }

      const cfg = SECTORS[foundIdx];
      targetCamPos.set(cfg.camPos[0], cfg.camPos[1], cfg.camPos[2]);
      targetLookAt.set(cfg.lookAt[0], cfg.lookAt[1], cfg.lookAt[2]);
      targetCoreScale = cfg.coreScale;
      targetGridAlpha = cfg.gridAlpha;
      targetOrbsExpand = cfg.orbsExpand;

      // Dispatch telemetry event for spatial HUD
      window.dispatchEvent(
        new CustomEvent("spatial-telemetry-update", {
          detail: {
            sectorId: cfg.id,
            sectorName: cfg.name,
            sectorIndex: foundIdx + 1,
            totalSectors: SECTORS.length,
            x: camera.position.x.toFixed(2),
            y: camera.position.y.toFixed(2),
            z: camera.position.z.toFixed(2),
            mode: spatialMode,
          },
        })
      );
    };

    // Mode listener from HUD
    const handleSetMode = (e: Event) => {
      const custom = e as CustomEvent<{ mode: "reactive" | "orbit" | "zen" }>;
      if (custom.detail?.mode) {
        spatialMode = custom.detail.mode;
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("scroll", updateActiveSectorFromScroll, { passive: true });
    window.addEventListener("set-spatial-mode", handleSetMode as EventListener);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Initial sync
    setTimeout(updateActiveSectorFromScroll, 200);

    // 10. Animation Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.08);
      const time = clock.getElapsedTime();

      // Smooth pointer interpolation
      pointerX = THREE.MathUtils.damp(pointerX, targetPointerX, 3.5, delta);
      pointerY = THREE.MathUtils.damp(pointerY, targetPointerY, 3.5, delta);

      // Core rotation & scaling
      const speedMult = spatialMode === "zen" ? 0.4 : spatialMode === "orbit" ? 1.6 : 1.0;
      coreMesh.rotation.y += delta * 0.22 * speedMult;
      coreMesh.rotation.x += delta * 0.09 * speedMult;
      wireMesh.rotation.y -= delta * 0.17 * speedMult;
      wireMesh.rotation.z += delta * 0.07 * speedMult;

      const curScale = coreMesh.scale.x;
      const nextScale = THREE.MathUtils.damp(curScale, targetCoreScale, 3.0, delta);
      coreMesh.scale.setScalar(nextScale);
      wireMesh.scale.setScalar(nextScale * 1.14);

      // Orbital rings rotation
      rings.forEach((r) => {
        r.mesh.rotation.z += delta * r.speed * speedMult;
      });

      // 3D Skill Constellation with Authentic Icons Orbiting
      orbMeshes.forEach((mesh, idx) => {
        mesh.rotation.x += delta * 0.7 * speedMult;
        mesh.rotation.y += delta * 1.0 * speedMult;

        const isOuterTier = idx % 2 === 1;
        const speed = isOuterTier ? 0.15 : 0.22;
        const baseAngle = (idx / SPATIAL_SKILLS.length) * Math.PI * 2 + time * speed * speedMult;
        const radius = (isOuterTier ? 4.5 : 3.4) * targetOrbsExpand;
        const yOffset =
          (isOuterTier ? (idx % 4 === 1 ? 1.4 : -1.2) : (idx % 4 === 0 ? 0.8 : -0.7)) +
          Math.sin(time * 0.8 + idx) * 0.15;
        const x = Math.cos(baseAngle) * radius;
        const y = yOffset;
        const z = Math.sin(baseAngle) * radius;

        mesh.position.set(x, y, z);

        // Update corresponding 3D skill badge sprite position
        if (skillSprites[idx]) {
          skillSprites[idx].position.set(x, y + 0.38, z);
        }

        // Update connecting line geometry
        const line = orbConnectingLines[idx];
        if (line) {
          const linePos = line.geometry.attributes.position as THREE.BufferAttribute;
          linePos.setXYZ(1, x, y, z);
          linePos.needsUpdate = true;
        }
      });

      // Grid opacity lerp & slow wave
      gridMat.opacity = THREE.MathUtils.damp(gridMat.opacity, targetGridAlpha, 2.5, delta);
      gridHelper.rotation.y = time * 0.02 * speedMult;

      // Stardust drift
      particles.rotation.y = time * 0.012 * speedMult;

      // Camera Rig calculation based on Mode & Sector
      if (spatialMode === "orbit") {
        const orbitRadius = 8.5;
        const orbitAngle = time * 0.15;
        camera.position.x = Math.cos(orbitAngle) * orbitRadius;
        camera.position.z = Math.sin(orbitAngle) * orbitRadius;
        camera.position.y = -1.2 + Math.sin(time * 0.2) * 0.8;
        currentLookAt.set(0, -0.6, 0);
      } else {
        const parallaxWeight = spatialMode === "zen" ? 0.2 : 0.65;
        const finalCamX = targetCamPos.x + pointerX * parallaxWeight;
        const finalCamY = targetCamPos.y + pointerY * (parallaxWeight * 0.6);
        const finalCamZ = targetCamPos.z;

        camera.position.x = THREE.MathUtils.damp(camera.position.x, finalCamX, 2.8, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, finalCamY, 2.8, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, finalCamZ, 2.8, delta);

        currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, targetLookAt.x + pointerX * 0.2, 2.8, delta);
        currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, targetLookAt.y + pointerY * 0.15, 2.8, delta);
        currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, targetLookAt.z, 2.8, delta);
      }

      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", updateActiveSectorFromScroll);
      window.removeEventListener("set-spatial-mode", handleSetMode as EventListener);
      window.removeEventListener("resize", onResize);
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
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Visual Scrim Overlay tuned for rich 3D visibility and sharp text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-background/15 to-background/50 pointer-events-none" />
    </div>
  );
}
