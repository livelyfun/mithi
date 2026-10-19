import * as THREE from "three";

/**
 * Animated procedural "code editor" texture for the studio monitor.
 * Draws a dark IDE window with scrolling syntax-colored code lines and
 * a small branded header — no external assets.
 */
export interface AnimatedScreen {
  texture: THREE.CanvasTexture;
  update: (elapsed: number) => void;
  dispose: () => void;
}

const LINE_COLORS = [
  "#8395CD",
  "#7AD0AC",
  "#e5a1aa",
  "#c9b8f0",
  "#8395CD",
  "#f0d28c",
];

export function createAnimatedScreenTexture(): AnimatedScreen {
  const width = 512;
  const height = 320;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const lineCount = 14;
  const lineSeed = Array.from({ length: lineCount }, (_, i) => ({
    indent: Math.floor(Math.random() * 3),
    len: 0.35 + Math.random() * 0.55,
    color: LINE_COLORS[i % LINE_COLORS.length],
    offset: Math.random() * 100,
  }));

  function draw(t: number) {
    ctx.fillStyle = "#0c1220";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#141c30";
    ctx.fillRect(0, 0, width, 34);

    ctx.fillStyle = "#e5a1aa";
    ctx.beginPath();
    ctx.arc(20, 17, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f0d28c";
    ctx.beginPath();
    ctx.arc(40, 17, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#7AD0AC";
    ctx.beginPath();
    ctx.arc(60, 17, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#8b93a7";
    ctx.font = "600 13px monospace";
    ctx.fillText("mithlesh — studio.ts", 88, 22);

    const scroll = (t * 18) % 48;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 34, width, height - 34);
    ctx.clip();

    for (let i = 0; i < lineCount + 3; i++) {
      const line = lineSeed[i % lineCount];
      const y = 48 + i * 20 - scroll;
      if (y < 40 || y > height - 8) continue;

      ctx.fillStyle = "#3a4560";
      ctx.font = "11px monospace";
      ctx.fillText(String((i % 9) + 1).padStart(2, " "), 10, y);

      const x = 36 + line.indent * 18;
      const pulse = 0.55 + 0.45 * Math.sin(t * 2 + line.offset);
      ctx.globalAlpha = 0.35 + pulse * 0.55;
      ctx.fillStyle = line.color;
      const barWidth = (width - x - 24) * line.len;
      ctx.beginPath();
      ctx.roundRect(x, y - 9, barWidth, 10, 3);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    const caretVisible = Math.floor(t * 2) % 2 === 0;
    if (caretVisible) {
      ctx.fillStyle = "#e5a1aa";
      ctx.fillRect(36, height - 26, 8, 12);
    }

    const glow = ctx.createLinearGradient(0, height - 60, 0, height);
    glow.addColorStop(0, "rgba(12,18,32,0)");
    glow.addColorStop(1, "rgba(229,161,170,0.12)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, height - 60, width, 60);

    texture.needsUpdate = true;
  }

  draw(0);

  return {
    texture,
    update: draw,
    dispose: () => {
      texture.dispose();
    },
  };
}
