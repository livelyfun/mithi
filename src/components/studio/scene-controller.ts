import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Keyframe {
  cam: { x: number; y: number; z: number; zoom: number };
  room: { x: number; y: number; z: number; ry: number };
}

/** hero, about, skills, projects, experience, contact */
const KEYS: Keyframe[] = [
  { cam: { x: 8.6, y: 7.6, z: 9.6, zoom: 1.0 }, room: { x: 1.1, y: 0, z: 0, ry: 0 } },
  { cam: { x: 8.2, y: 8.6, z: 9.2, zoom: 0.96 }, room: { x: 2.5, y: 0, z: 0.35, ry: 0.32 } },
  { cam: { x: 7.6, y: 7.1, z: 10.2, zoom: 0.92 }, room: { x: -2.3, y: 0, z: 0.25, ry: -0.38 } },
  { cam: { x: 9.2, y: 9.6, z: 9.0, zoom: 0.86 }, room: { x: 2.2, y: 0, z: -0.35, ry: 0.52 } },
  { cam: { x: 8.0, y: 7.0, z: 9.8, zoom: 0.95 }, room: { x: -2.1, y: 0, z: 0.3, ry: -0.24 } },
  { cam: { x: 10.6, y: 10.2, z: 11.2, zoom: 0.78 }, room: { x: 0, y: 0, z: 0, ry: 0.14 } },
];

const LOOK_AT = new THREE.Vector3(0, 1.45, -0.4);

export interface ChoreographyHandle {
  playIntro: () => void;
  update: () => void;
  kill: () => void;
}

export function attachChoreography(opts: {
  camera: THREE.OrthographicCamera;
  roomGroup: THREE.Group;
  circles: THREE.Mesh[];
  reducedMotion: boolean;
}): ChoreographyHandle {
  const { camera, roomGroup, circles, reducedMotion } = opts;

  const isMobile = window.matchMedia("(max-width: 1023px)").matches;
  const roomScale = isMobile ? 0.35 : 1;
  const zoomScale = isMobile ? 0.88 : 1;

  const state = {
    camX: KEYS[0].cam.x,
    camY: KEYS[0].cam.y + (reducedMotion ? 0 : 6),
    camZ: KEYS[0].cam.z,
    zoom: reducedMotion ? KEYS[0].cam.zoom * zoomScale : KEYS[0].cam.zoom * 0.4 * zoomScale,
    roomX: KEYS[0].room.x * roomScale,
    roomY: reducedMotion ? 0 : -3.5,
    roomZ: KEYS[0].room.z,
    roomRY: KEYS[0].room.ry,
  };

  const circleState = { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0 };
  const circleKeys = ["c0", "c1", "c2", "c3", "c4"] as const;

  const pointer = { x: 0, y: 0, lx: 0, ly: 0 };

  function onPointerMove(e: PointerEvent) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  function apply() {
    const parallax = reducedMotion ? 0 : 1;
    pointer.lx += (pointer.x - pointer.lx) * 0.04;
    pointer.ly += (pointer.y - pointer.ly) * 0.04;

    camera.position.set(
      state.camX + pointer.lx * 0.55 * parallax,
      state.camY - pointer.ly * 0.35 * parallax,
      state.camZ
    );
    camera.zoom = state.zoom;
    camera.updateProjectionMatrix();
    camera.lookAt(LOOK_AT);

    roomGroup.position.set(state.roomX, state.roomY, state.roomZ);
    roomGroup.rotation.y = state.roomRY;

    circles.forEach((c, i) => {
      const mat = c.material as THREE.MeshBasicMaterial;
      mat.opacity = circleState[circleKeys[i]];
    });
  }

  apply();

  // ------------------------------------------------------------- intro rig
  let introTl: gsap.core.Timeline | null = null;
  let introStarted = false;

  function playIntro() {
    if (introStarted) return;
    introStarted = true;

    if (reducedMotion) {
      state.camY = KEYS[0].cam.y;
      state.zoom = KEYS[0].cam.zoom * zoomScale;
      state.roomY = 0;
      apply();
      document.dispatchEvent(new CustomEvent("studio:intro-complete"));
      return;
    }

    introTl = gsap.timeline({
      onComplete: () => {
        document.dispatchEvent(new CustomEvent("studio:intro-complete"));
      },
    });
    introTl.to(state, {
      camY: KEYS[0].cam.y,
      zoom: KEYS[0].cam.zoom * zoomScale,
      roomY: 0,
      duration: 1.9,
      ease: "power3.inOut",
    });
    introTl.to(
      state,
      {
        roomRY: KEYS[0].room.ry + 0.12,
        duration: 1.1,
        ease: "power2.out",
      },
      "-=0.9"
    );
    introTl.to(
      state,
      {
        roomRY: KEYS[0].room.ry,
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.2"
    );
  }

  // ----------------------------------------------------- scroll choreography
  let scrollTl: gsap.core.Timeline | null = null;

  if (!reducedMotion) {
    scrollTl = gsap.timeline({
      defaults: { ease: "none", duration: 1 },
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1,
      },
    });

    for (let i = 1; i < KEYS.length; i++) {
      const k = KEYS[i];
      scrollTl.to(state, {
        camX: k.cam.x,
        camY: k.cam.y,
        camZ: k.cam.z,
        zoom: k.cam.zoom * zoomScale,
        roomX: k.room.x * roomScale,
        roomY: k.room.y,
        roomZ: k.room.z,
        roomRY: k.room.ry,
      });
      scrollTl.to(circleState, {
        [circleKeys[i - 1]]: 0.5,
        ...(i >= 2 ? { [circleKeys[i - 2]]: 0 } : {}),
      }, "<");
    }
  }

  return {
    playIntro,
    update: apply,
    kill() {
      window.removeEventListener("pointermove", onPointerMove);
      introTl?.kill();
      scrollTl?.kill();
      scrollTl?.scrollTrigger?.kill();
    },
  };
}
