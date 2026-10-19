import * as THREE from "three";
import gsap from "gsap";

export type SceneTheme = "dark" | "light";

export interface StudioPalette {
  background: string;
  wall: string;
  wallSide: string;
  floor: string;
  desk: string;
  deskLeg: string;
  ambient: number;
  hemi: number;
  dir: number;
  rect: number;
  lamp: number;
}

export const PALETTES: Record<SceneTheme, StudioPalette> = {
  dark: {
    background: "#0d1424",
    wall: "#1a2338",
    wallSide: "#151d30",
    floor: "#101827",
    desk: "#2d3552",
    deskLeg: "#232a42",
    ambient: 0.55,
    hemi: 0.4,
    dir: 1.0,
    rect: 2.4,
    lamp: 1.4,
  },
  light: {
    background: "#faf4e5",
    wall: "#f2e8d5",
    wallSide: "#ebdfc9",
    floor: "#e6d9bf",
    desk: "#c49a6c",
    deskLeg: "#a67c52",
    ambient: 0.9,
    hemi: 0.65,
    dir: 1.15,
    rect: 1.5,
    lamp: 0.9,
  },
};

export const ACCENTS = {
  pink: "#e5a1aa",
  blue: "#8395CD",
  green: "#7AD0AC",
  cream: "#f5edd8",
  gold: "#f0d28c",
  lilac: "#c9b8f0",
};

export interface LightsBundle {
  group: THREE.Group;
  setTheme: (theme: SceneTheme) => void;
}

export function createLights(initial: SceneTheme): LightsBundle {
  const group = new THREE.Group();
  const p = PALETTES[initial];

  const ambient = new THREE.AmbientLight(0xffffff, p.ambient);
  group.add(ambient);

  const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x3a2f45, p.hemi);
  group.add(hemi);

  const dir = new THREE.DirectionalLight(0xfff2dd, p.dir);
  dir.position.set(6, 12, 7);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  dir.shadow.camera.left = -10;
  dir.shadow.camera.right = 10;
  dir.shadow.camera.top = 10;
  dir.shadow.camera.bottom = -10;
  dir.shadow.camera.near = 1;
  dir.shadow.camera.far = 40;
  dir.shadow.bias = -0.0004;
  group.add(dir);

  const fill = new THREE.DirectionalLight(0xbfd0ff, 0.35);
  fill.position.set(-7, 5, 4);
  group.add(fill);

  const monitorGlow = new THREE.PointLight(ACCENTS.blue, p.rect, 9, 1.8);
  monitorGlow.position.set(0.5, 2.4, -1.4);
  group.add(monitorGlow);

  const lampLight = new THREE.PointLight(ACCENTS.gold, p.lamp, 6, 2);
  lampLight.position.set(-1.35, 2.7, -2.1);
  group.add(lampLight);

  function setTheme(theme: SceneTheme) {
    const target = PALETTES[theme];
    gsap.to(ambient, { intensity: target.ambient, duration: 0.9, ease: "power2.out" });
    gsap.to(hemi, { intensity: target.hemi, duration: 0.9, ease: "power2.out" });
    gsap.to(dir, { intensity: target.dir, duration: 0.9, ease: "power2.out" });
    gsap.to(monitorGlow, { intensity: target.rect, duration: 0.9, ease: "power2.out" });
    gsap.to(lampLight, { intensity: target.lamp, duration: 0.9, ease: "power2.out" });
  }

  return { group, setTheme };
}
