"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildRoom } from "./room";
import { createLights, PALETTES } from "./lights";
import { attachChoreography, type ChoreographyHandle } from "./scene-controller";
import { useTheme } from "./theme-context";
import type { SceneTheme } from "./lights";

gsap.registerPlugin(ScrollTrigger);

const FRUSTUM = 7;

interface StudioApi {
  setTheme: (theme: SceneTheme) => void;
}

export default function StudioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<StudioApi | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const initialTheme: SceneTheme = document.documentElement.classList.contains(
      "dark"
    )
      ? "dark"
      : "light";

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(PALETTES[initialTheme].background);
    scene.background = bgColor;
    scene.fog = new THREE.Fog(bgColor.clone(), 22, 48);

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -FRUSTUM * aspect,
      FRUSTUM * aspect,
      FRUSTUM,
      -FRUSTUM,
      0.1,
      120
    );
    camera.position.set(8.6, 13.6, 9.6);
    camera.lookAt(0, 1.45, -0.4);

    const room = buildRoom(initialTheme);
    scene.add(room.group);

    const lights = createLights(initialTheme);
    scene.add(lights.group);

    const choreo: ChoreographyHandle = attachChoreography({
      camera,
      roomGroup: room.group,
      circles: room.circles,
      reducedMotion,
    });

    const onIntro = () => choreo.playIntro();
    document.addEventListener("studio:intro", onIntro);

    apiRef.current = {
      setTheme(next) {
        room.setTheme(next);
        lights.setTheme(next);
        const target = new THREE.Color(PALETTES[next].background);
        gsap.to(scene.background as THREE.Color, {
          r: target.r,
          g: target.g,
          b: target.b,
          duration: 0.9,
          ease: "power2.out",
        });
        if (scene.fog) {
          gsap.to(scene.fog.color, {
            r: target.r,
            g: target.g,
            b: target.b,
            duration: 0.9,
            ease: "power2.out",
          });
        }
      },
    };

    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      const a = w / h;
      camera.left = -FRUSTUM * a;
      camera.right = FRUSTUM * a;
      camera.top = FRUSTUM;
      camera.bottom = -FRUSTUM;
      camera.updateProjectionMatrix();
    }
    onResize();
    window.addEventListener("resize", onResize);

    const lenis = reducedMotion
      ? null
      : new Lenis({ lerp: 0.11, smoothWheel: true });
    let lenisRaf: ((time: number) => void) | null = null;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      lenisRaf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    let rafId = 0;
    let running = true;
    let lastTime = performance.now();
    let elapsed = 0;

    function loop(now: number) {
      rafId = requestAnimationFrame(loop);
      if (!running || document.hidden) {
        lastTime = now;
        return;
      }
      elapsed += (now - lastTime) / 1000;
      lastTime = now;
      room.update(elapsed);
      choreo.update();
      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(loop);

    document.dispatchEvent(new CustomEvent("studio:ready"));

    function onVisibility() {
      lastTime = performance.now();
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("studio:intro", onIntro);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      choreo.kill();
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      lenis?.destroy();
      room.dispose();
      renderer.dispose();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    apiRef.current?.setTheme(theme);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full"
    />
  );
}
