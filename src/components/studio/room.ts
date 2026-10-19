import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import gsap from "gsap";
import { ACCENTS, PALETTES, type SceneTheme } from "./lights";
import { createAnimatedScreenTexture } from "./screen-texture";

export interface StudioRoom {
  group: THREE.Group;
  circles: THREE.Mesh[];
  update: (elapsed: number) => void;
  setTheme: (theme: SceneTheme) => void;
  dispose: () => void;
}

function standard(color: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0.04, ...opts });
}

export function buildRoom(initial: SceneTheme): StudioRoom {
  const palette = PALETTES[initial];
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(obj: T): T => {
    disposables.push(obj);
    return obj;
  };

  // ---------------------------------------------------------------- shells
  const wallMat = track(standard(palette.wall, { roughness: 0.95 }));
  const wallSideMat = track(standard(palette.wallSide, { roughness: 0.95 }));
  const floorMat = track(standard(palette.floor, { roughness: 0.9 }));
  const deskMat = track(standard(palette.desk, { roughness: 0.6 }));
  const deskLegMat = track(standard(palette.deskLeg, { roughness: 0.7 }));

  const floorGeo = track(new RoundedBoxGeometry(12.4, 0.35, 12.4, 2, 0.12));
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = -0.175;
  floor.receiveShadow = true;
  group.add(floor);

  const backWallGeo = track(new RoundedBoxGeometry(12.4, 7.2, 0.35, 2, 0.1));
  const backWall = new THREE.Mesh(backWallGeo, wallMat);
  backWall.position.set(0, 3.6, -6.05);
  backWall.receiveShadow = true;
  group.add(backWall);

  const sideWallGeo = track(new RoundedBoxGeometry(0.35, 7.2, 12.4, 2, 0.1));
  const sideWall = new THREE.Mesh(sideWallGeo, wallSideMat);
  sideWall.position.set(-6.05, 3.6, 0);
  sideWall.receiveShadow = true;
  group.add(sideWall);

  // ------------------------------------------------------------ floor circles
  const circles: THREE.Mesh[] = [];
  const circleAngles = [-50, 20, 90, 160, 230];
  const circleColors = [ACCENTS.pink, ACCENTS.blue, ACCENTS.green, ACCENTS.lilac, ACCENTS.gold];
  const circleGeo = track(new THREE.CircleGeometry(1.55, 48));
  circleAngles.forEach((deg, i) => {
    const mat = track(
      new THREE.MeshBasicMaterial({
        color: circleColors[i],
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    const mesh = new THREE.Mesh(circleGeo, mat);
    const rad = (deg * Math.PI) / 180;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(Math.cos(rad) * 3.4, 0.02, Math.sin(rad) * 3.4);
    mesh.renderOrder = -1;
    circles.push(mesh);
    group.add(mesh);
  });

  // ------------------------------------------------------------------- desk
  const desk = new THREE.Group();
  const topGeo = track(new RoundedBoxGeometry(4.8, 0.18, 2.1, 3, 0.06));
  const deskTop = new THREE.Mesh(topGeo, deskMat);
  deskTop.position.y = 1.55;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  desk.add(deskTop);

  const legGeo = track(new RoundedBoxGeometry(0.16, 1.5, 0.16, 2, 0.04));
  const legPositions: [number, number][] = [
    [-2.15, 0.85],
    [2.15, 0.85],
    [-2.15, -0.85],
    [2.15, -0.85],
  ];
  legPositions.forEach(([x, z]) => {
    const leg = new THREE.Mesh(legGeo, deskLegMat);
    leg.position.set(x, 0.75, z);
    leg.castShadow = true;
    desk.add(leg);
  });

  const shelfGeo = track(new RoundedBoxGeometry(4.4, 0.1, 1.6, 2, 0.04));
  const deskShelf = new THREE.Mesh(shelfGeo, deskLegMat);
  deskShelf.position.set(0, 2.15, -0.55);
  deskShelf.castShadow = true;
  desk.add(deskShelf);

  desk.position.set(0.4, 0, -2.3);
  group.add(desk);

  // --------------------------------------------------------------- monitor
  const monitor = new THREE.Group();
  const frameGeo = track(new RoundedBoxGeometry(2.7, 1.75, 0.12, 3, 0.05));
  const frameMat = track(standard("#1c2438", { roughness: 0.5, metalness: 0.25 }));
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.y = 2.85;
  frame.castShadow = true;
  monitor.add(frame);

  const screen = createAnimatedScreenTexture();
  const screenGeo = track(new THREE.PlaneGeometry(2.45, 1.5));
  const screenMat = track(
    new THREE.MeshStandardMaterial({
      map: screen.texture,
      emissive: 0xffffff,
      emissiveMap: screen.texture,
      emissiveIntensity: 0.85,
      roughness: 0.4,
    })
  );
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, 2.85, 0.07);
  monitor.add(screenMesh);

  const standGeo = track(new THREE.CylinderGeometry(0.09, 0.12, 1.05, 12));
  const standMat = track(standard("#1c2438", { metalness: 0.3, roughness: 0.5 }));
  const stand = new THREE.Mesh(standGeo, standMat);
  stand.position.set(0, 1.95, -0.1);
  stand.castShadow = true;
  monitor.add(stand);

  const baseGeo = track(new RoundedBoxGeometry(0.9, 0.08, 0.55, 2, 0.03));
  const base = new THREE.Mesh(baseGeo, standMat);
  base.position.set(0, 1.68, -0.05);
  monitor.add(base);

  monitor.position.set(0.4, 0, -2.55);
  group.add(monitor);

  // -------------------------------------------------------------- keyboard
  const kbGeo = track(new RoundedBoxGeometry(1.5, 0.07, 0.55, 2, 0.025));
  const kbMat = track(standard("#2a3350", { roughness: 0.65 }));
  const keyboard = new THREE.Mesh(kbGeo, kbMat);
  keyboard.position.set(0.4, 1.68, -1.55);
  keyboard.castShadow = true;
  group.add(keyboard);

  // ------------------------------------------------------------------ chair
  const chair = new THREE.Group();
  const chairMat = track(standard(ACCENTS.pink, { roughness: 0.75 }));
  const darkMat = track(standard("#2a3149", { roughness: 0.6, metalness: 0.15 }));

  const seatGeo = track(new RoundedBoxGeometry(1.15, 0.16, 1.1, 3, 0.07));
  const seat = new THREE.Mesh(seatGeo, chairMat);
  seat.position.y = 1.0;
  seat.castShadow = true;
  chair.add(seat);

  const backGeo = track(new RoundedBoxGeometry(1.15, 1.25, 0.15, 3, 0.06));
  const back = new THREE.Mesh(backGeo, chairMat);
  back.position.set(0, 1.75, -0.48);
  back.rotation.x = -0.12;
  back.castShadow = true;
  chair.add(back);

  const poleGeo = track(new THREE.CylinderGeometry(0.07, 0.09, 0.85, 10));
  const pole = new THREE.Mesh(poleGeo, darkMat);
  pole.position.y = 0.5;
  chair.add(pole);

  const chairBaseGeo = track(new THREE.CylinderGeometry(0.5, 0.55, 0.08, 16));
  const chairBase = new THREE.Mesh(chairBaseGeo, darkMat);
  chairBase.position.y = 0.06;
  chairBase.castShadow = true;
  chair.add(chairBase);

  chair.position.set(0.55, 0, -0.35);
  chair.rotation.y = Math.PI + 0.25;
  group.add(chair);

  // ------------------------------------------------------------------- lamp
  const lamp = new THREE.Group();
  const lampMetal = track(standard("#3d4666", { metalness: 0.4, roughness: 0.4 }));
  const lampBaseGeo = track(new THREE.CylinderGeometry(0.22, 0.26, 0.08, 16));
  const lampBase = new THREE.Mesh(lampBaseGeo, lampMetal);
  lampBase.position.y = 1.68;
  lamp.add(lampBase);

  const armGeo = track(new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8));
  const arm = new THREE.Mesh(armGeo, lampMetal);
  arm.position.set(0.08, 2.12, 0);
  arm.rotation.z = -0.35;
  lamp.add(arm);

  const shadeGeo = track(new THREE.ConeGeometry(0.26, 0.34, 20, 1, true));
  const shadeMat = track(
    standard(ACCENTS.gold, { roughness: 0.55, side: THREE.DoubleSide, emissive: ACCENTS.gold, emissiveIntensity: 0.25 })
  );
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.26, 2.56, 0);
  shade.rotation.z = -0.9;
  lamp.add(shade);

  lamp.position.set(-1.45, 0, -2.5);
  group.add(lamp);

  // --------------------------------------------------------------- shelves
  const shelfGroup = new THREE.Group();
  const boardGeo = track(new RoundedBoxGeometry(3.4, 0.12, 0.85, 2, 0.04));
  const boardMat = track(standard(palette.desk, { roughness: 0.65 }));
  [4.0, 5.15].forEach((y) => {
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(-3.6, y, -5.55);
    board.castShadow = true;
    board.receiveShadow = true;
    shelfGroup.add(board);
  });

  const bookColors = [ACCENTS.pink, ACCENTS.blue, ACCENTS.green, ACCENTS.lilac, ACCENTS.gold, "#e8b88a"];
  const bookGeo = track(new RoundedBoxGeometry(0.22, 0.62, 0.5, 1, 0.02));
  let bookX = -4.9;
  for (let i = 0; i < 9; i++) {
    const mat = track(standard(bookColors[i % bookColors.length], { roughness: 0.8 }));
    const book = new THREE.Mesh(bookGeo, mat);
    const h = 0.52 + (i % 3) * 0.08;
    book.scale.y = h / 0.62;
    book.position.set(bookX, 4.38 + (h - 0.52) / 2, -5.55);
    book.rotation.z = i === 4 ? 0.18 : 0;
    book.castShadow = true;
    shelfGroup.add(book);
    bookX += 0.28;
  }

  const shelfPlantPotGeo = track(new THREE.CylinderGeometry(0.16, 0.12, 0.24, 12));
  const shelfPlantPotMat = track(standard(ACCENTS.pink, { roughness: 0.7 }));
  const shelfPot = new THREE.Mesh(shelfPlantPotGeo, shelfPlantPotMat);
  shelfPot.position.set(-2.7, 5.32, -5.55);
  shelfGroup.add(shelfPot);

  const shelfLeafGeo = track(new THREE.IcosahedronGeometry(0.24, 0));
  const leafMat = track(standard(ACCENTS.green, { roughness: 0.85, flatShading: true }));
  const shelfLeaf = new THREE.Mesh(shelfLeafGeo, leafMat);
  shelfLeaf.position.set(-2.7, 5.62, -5.55);
  shelfLeaf.castShadow = true;
  shelfGroup.add(shelfLeaf);

  group.add(shelfGroup);

  // ----------------------------------------------------------------- plant
  const plant = new THREE.Group();
  const potGeo = track(new THREE.CylinderGeometry(0.42, 0.3, 0.6, 16));
  const potMat = track(standard("#d98d7c", { roughness: 0.8 }));
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.y = 0.3;
  pot.castShadow = true;
  plant.add(pot);

  const foliage: THREE.Mesh[] = [];
  const folGeo = track(new THREE.IcosahedronGeometry(0.5, 0));
  [
    [0, 1.05, 0, 1],
    [0.3, 1.45, 0.1, 0.72],
    [-0.28, 1.35, -0.12, 0.62],
    [0.05, 1.75, -0.05, 0.5],
  ].forEach(([x, y, z, s]) => {
    const m = new THREE.Mesh(folGeo, leafMat);
    m.position.set(x, y, z);
    m.scale.setScalar(s);
    m.castShadow = true;
    foliage.push(m);
    plant.add(m);
  });

  plant.position.set(3.9, 0, -4.6);
  group.add(plant);

  // ------------------------------------------------------------- aquarium
  const tank = new THREE.Group();
  const glassGeo = track(new RoundedBoxGeometry(1.6, 1.05, 0.95, 2, 0.04));
  const glassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: "#cfeaf0",
      transparent: true,
      opacity: 0.22,
      roughness: 0.08,
      metalness: 0,
      transmission: 0.6,
      thickness: 0.4,
    })
  );
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.y = 0.55;
  tank.add(glass);

  const waterGeo = track(new THREE.BoxGeometry(1.48, 0.85, 0.84));
  const waterMat = track(
    new THREE.MeshStandardMaterial({
      color: ACCENTS.green,
      transparent: true,
      opacity: 0.28,
      roughness: 0.3,
    })
  );
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.y = 0.5;
  tank.add(water);

  const gravelGeo = track(new RoundedBoxGeometry(1.44, 0.12, 0.8, 1, 0.03));
  const gravelMat = track(standard("#5a6788", { roughness: 0.95 }));
  const gravel = new THREE.Mesh(gravelGeo, gravelMat);
  gravel.position.y = 0.1;
  tank.add(gravel);

  const fish: { mesh: THREE.Mesh; radius: number; speed: number; phase: number; y: number }[] = [];
  const fishGeo = track(new THREE.SphereGeometry(0.09, 10, 8));
  const fishColors = [ACCENTS.pink, ACCENTS.gold, ACCENTS.blue];
  for (let i = 0; i < 3; i++) {
    const mat = track(standard(fishColors[i], { roughness: 0.5, emissive: fishColors[i], emissiveIntensity: 0.15 }));
    const mesh = new THREE.Mesh(fishGeo, mat);
    mesh.scale.set(1.5, 0.8, 0.7);
    fish.push({ mesh, radius: 0.38 + i * 0.08, speed: 0.6 + i * 0.22, phase: i * 2.2, y: 0.42 + i * 0.16 });
    tank.add(mesh);
  }

  const standBoxGeo = track(new RoundedBoxGeometry(1.8, 0.85, 1.1, 2, 0.05));
  const standBox = new THREE.Mesh(standBoxGeo, deskLegMat);
  standBox.position.y = -0.42;
  standBox.castShadow = true;
  tank.add(standBox);

  tank.position.set(3.6, 0.85, -1.2);
  group.add(tank);

  // ------------------------------------------------------------- theme sync
  const themeMaterials: Array<{ mat: THREE.MeshStandardMaterial; key: keyof typeof PALETTES.dark }> = [
    { mat: wallMat, key: "wall" },
    { mat: wallSideMat, key: "wallSide" },
    { mat: floorMat, key: "floor" },
    { mat: deskMat, key: "desk" },
    { mat: deskLegMat, key: "deskLeg" },
    { mat: boardMat, key: "desk" },
  ];

  function setTheme(theme: SceneTheme) {
    const target = PALETTES[theme];
    themeMaterials.forEach(({ mat, key }) => {
      const c = new THREE.Color(target[key]);
      gsap.to(mat.color, { r: c.r, g: c.g, b: c.b, duration: 0.9, ease: "power2.out" });
    });
  }

  function update(elapsed: number) {
    screen.update(elapsed);
    fish.forEach((f) => {
      const a = elapsed * f.speed + f.phase;
      f.mesh.position.set(Math.cos(a) * f.radius, f.y, Math.sin(a) * f.radius * 0.55);
      f.mesh.rotation.y = -a + Math.PI / 2;
    });
    foliage.forEach((leaf, i) => {
      leaf.rotation.z = Math.sin(elapsed * 0.7 + i) * 0.05;
      leaf.rotation.x = Math.cos(elapsed * 0.55 + i * 1.3) * 0.04;
    });
    screenMat.emissiveIntensity = 0.8 + Math.sin(elapsed * 1.7) * 0.07;
  }

  function dispose() {
    screen.dispose();
    disposables.forEach((d) => d.dispose());
    group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
  }

  return { group, circles, update, setTheme, dispose };
}
