"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Deterministic pseudo-random generator */
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

export default function GlobalBackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Safe WebGL Renderer creation
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      // WebGL not available or context conflict - gracefully do nothing
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "absolute inset-0 size-full pointer-events-none";
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    // 3. Palette & Lights
    const CYAN = new THREE.Color("#38bdf8");
    const VIOLET = new THREE.Color("#818cf8");
    const AMBER = new THREE.Color("#fbbf24");
    const EMERALD = new THREE.Color("#34d399");

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x818cf8, 1.2);
    dirLight1.position.set(4, 5, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.9);
    dirLight2.position.set(-5, -2, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(CYAN, 3.5, 30);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 4. Center Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Solid faceted Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      emissive: CYAN,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Counter-rotating Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: VIOLET,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 5. Orbital Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringConfigs = [
      { radius: 2.5, tube: 0.015, rotX: Math.PI / 4, rotY: 0.2, color: CYAN },
      { radius: 3.4, tube: 0.018, rotX: -Math.PI / 3, rotY: -0.4, color: VIOLET },
      { radius: 4.2, tube: 0.02, rotX: Math.PI / 6, rotY: Math.PI / 5, color: AMBER },
    ];

    const rings: THREE.Mesh[] = [];
    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 80);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.y = cfg.rotY;
      ringGroup.add(mesh);
      rings.push(mesh);
    });

    // 6. Project Nodes (6 Real GitHub Projects)
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeColors = [CYAN, AMBER, VIOLET, EMERALD, AMBER, CYAN];
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3.6 + (i % 2) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 1.5) * 1.2;
      const z = Math.sin(angle) * radius;

      const nodeGeo = new THREE.OctahedronGeometry(0.24, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.7,
        metalness: 0.6,
        roughness: 0.2,
        flatShading: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodesGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Connecting line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineDashedMaterial({
        color: nodeColors[i],
        dashSize: 0.3,
        gapSize: 0.2,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      scene.add(line);
    }

    // 7. Ambient Particle Field (850 particles in spherical shell)
    const particleCount = 850;
    const rand = mulberry32(4242);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [CYAN, VIOLET, AMBER, EMERALD, new THREE.Color("#94a3b8")];

    for (let i = 0; i < particleCount; i++) {
      const r = 8 + rand() * 20;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.7;
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

    // 8. Motion Tracking (Mouse & Scroll)
    let pointerX = 0;
    let pointerY = 0;
    let scrollProgress = 0;

    const onPointerMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // 9. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Core rotation & swell on scroll
      const scale = 1 + scrollProgress * 0.35;
      coreMesh.rotation.y += delta * 0.2;
      coreMesh.rotation.x += delta * 0.08;
      coreMesh.scale.setScalar(scale);

      wireMesh.rotation.y -= delta * 0.15;
      wireMesh.rotation.z += delta * 0.06;
      wireMesh.scale.setScalar(scale * 1.12);

      // Rings rotation
      rings.forEach((r, idx) => {
        r.rotation.z += delta * (0.15 + idx * 0.05);
      });

      // Nodes orbiting
      nodeMeshes.forEach((mesh, idx) => {
        mesh.rotation.x += delta * 0.8;
        mesh.rotation.y += delta * 1.1;
        const angle = (idx / 6) * Math.PI * 2 + time * 0.25;
        const radius = 3.6 + (idx % 2) * 0.8;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
      });

      // Particle slow drift
      particles.rotation.y = time * 0.015;

      // Camera Rig with scroll and mouse parallax
      const targetZ = 7.6 + scrollProgress * 3.2;
      const targetY = -scrollProgress * 2.2 + pointerY * 0.35;
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * 0.6, 2.5, delta);

      camera.lookAt(0, camera.position.y * 0.45, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />
    </div>
  );
}
