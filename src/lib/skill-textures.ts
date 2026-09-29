import * as THREE from "three";

export interface SkillNodeMeta {
  id: string;
  name: string;
  category: "Language" | "Frontend" | "Backend" | "DevOps" | "Database";
  accentColor: string;
  tagline: string;
  iconType: "python" | "react" | "next" | "ts" | "fastapi" | "docker" | "postgres" | "git" | "graphql" | "tailwind";
}

export const SPATIAL_SKILLS: SkillNodeMeta[] = [
  {
    id: "python",
    name: "Python",
    category: "Language",
    accentColor: "#fbbf24", // Amber
    tagline: "OOP · AsyncIO · PySide6",
    iconType: "python",
  },
  {
    id: "react",
    name: "React.js",
    category: "Frontend",
    accentColor: "#38bdf8", // Sky Blue
    tagline: "React 19 · Virtual DOM · Hooks",
    iconType: "react",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    accentColor: "#ffffff", // Pure White
    tagline: "App Router · Server Actions · SSR",
    iconType: "next",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Language",
    accentColor: "#60a5fa", // Blue
    tagline: "Static Types · Strict Mode · Generics",
    iconType: "ts",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    accentColor: "#34d399", // Emerald
    tagline: "Async APIs · Pydantic · OpenAPI",
    iconType: "fastapi",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    accentColor: "#38bdf8", // Sky Blue
    tagline: "Containers · Multi-stage · Compose",
    iconType: "docker",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Database",
    accentColor: "#818cf8", // Indigo
    tagline: "SQL · Relational Schema · Indexing",
    iconType: "postgres",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "DevOps",
    accentColor: "#f87171", // Rose
    tagline: "Git Flow · CI/CD · Actions",
    iconType: "git",
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Backend",
    accentColor: "#e879f9", // Fuchsia
    tagline: "Queries · Mutations · Schemas",
    iconType: "graphql",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    accentColor: "#2dd4bf", // Teal
    tagline: "Utility-First · CSS Variables · Design",
    iconType: "tailwind",
  },
];

const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Generates an ultra-crisp, high-DPI 2D canvas texture with an iconic skill vector
 * and typography for rendering inside Three.js 3D spatial scenes.
 */
export function createSkillBadgeTexture(skill: SkillNodeMeta): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    // Return dummy texture for SSR
    return new THREE.CanvasTexture(document?.createElement("canvas") || ({} as HTMLCanvasElement));
  }

  if (textureCache.has(skill.id)) {
    return textureCache.get(skill.id)!;
  }

  const width = 360;
  const height = 130;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const dummy = new THREE.CanvasTexture(canvas);
    return dummy;
  }

  // 1. Draw Obsidian Glass Container with Neon Stroke
  ctx.save();
  ctx.shadowColor = skill.accentColor;
  ctx.shadowBlur = 18;

  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(8, 8, width - 16, height - 16, 28);
  } else {
    ctx.rect(8, 8, width - 16, height - 16);
  }
  ctx.fillStyle = "rgba(7, 12, 24, 0.92)";
  ctx.fill();

  ctx.lineWidth = 3.5;
  ctx.strokeStyle = skill.accentColor;
  ctx.stroke();
  ctx.restore();

  // Subtle interior divider line
  ctx.beginPath();
  ctx.moveTo(116, 20);
  ctx.lineTo(116, height - 20);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.stroke();

  // 2. Draw Distinctive Vector Icon on the Left (Center: x=62, y=65)
  ctx.save();
  const iconX = 62;
  const iconY = 65;

  switch (skill.iconType) {
    case "python": {
      // Dual-interlocking snake heads (Gold & Sky)
      // Top snake head (Sky Blue)
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(iconX - 6, iconY - 12, 16, Math.PI, 0, false);
      ctx.lineTo(iconX + 16, iconY - 4);
      ctx.arc(iconX + 6, iconY - 4, 10, 0, Math.PI / 2, false);
      ctx.lineTo(iconX - 16, iconY + 1);
      ctx.fill();
      // Sky blue snake eye
      ctx.fillStyle = "#070c18";
      ctx.beginPath();
      ctx.arc(iconX - 4, iconY - 18, 3, 0, Math.PI * 2);
      ctx.fill();

      // Bottom snake head (Amber Gold)
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(iconX + 6, iconY + 12, 16, 0, Math.PI, false);
      ctx.lineTo(iconX - 16, iconY + 4);
      ctx.arc(iconX - 6, iconY + 4, 10, Math.PI, Math.PI * 1.5, false);
      ctx.lineTo(iconX + 16, iconY - 1);
      ctx.fill();
      // Gold snake eye
      ctx.fillStyle = "#070c18";
      ctx.beginPath();
      ctx.arc(iconX + 4, iconY + 18, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "react": {
      // Central nucleus
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(iconX, iconY, 8, 0, Math.PI * 2);
      ctx.fill();

      // 3 Orbital Ellipses rotated at 0, 60, 120 degrees
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.8;

      [0, Math.PI / 3, (2 * Math.PI) / 3].forEach((angle) => {
        ctx.save();
        ctx.translate(iconX, iconY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, 32, 12, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
      break;
    }

    case "next": {
      // Black disc with white border & iconic 'N'
      ctx.beginPath();
      ctx.arc(iconX, iconY, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Bold 'N' path
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 36px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("N", iconX, iconY + 2);
      break;
    }

    case "ts": {
      // Blue Square with 'TS'
      ctx.fillStyle = "#3178c6";
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(iconX - 26, iconY - 26, 52, 52, 10);
      } else {
        ctx.rect(iconX - 26, iconY - 26, 52, 52);
      }
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TS", iconX + 1, iconY + 2);
      break;
    }

    case "fastapi": {
      // Emerald Lightning Bolt
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.moveTo(iconX + 6, iconY - 30);
      ctx.lineTo(iconX - 16, iconY + 4);
      ctx.lineTo(iconX - 1, iconY + 4);
      ctx.lineTo(iconX - 6, iconY + 30);
      ctx.lineTo(iconX + 16, iconY - 4);
      ctx.lineTo(iconX + 1, iconY - 4);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "docker": {
      // Blue Whale with containers
      ctx.fillStyle = "#38bdf8";

      // 2x3 Container grid
      const cW = 8;
      const cH = 6;
      const cStartX = iconX - 18;
      const cStartY = iconY - 20;
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          ctx.fillRect(cStartX + col * 10, cStartY + row * 8, cW, cH);
        }
      }
      // Top single container
      ctx.fillRect(iconX - 8, cStartY - 8, cW, cH);

      // Whale body
      ctx.beginPath();
      ctx.arc(iconX, iconY + 8, 22, Math.PI * 0.9, 0, false);
      ctx.lineTo(iconX + 30, iconY + 12);
      ctx.lineTo(iconX + 24, iconY + 2);
      ctx.arc(iconX, iconY + 12, 18, 0, Math.PI, true);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "postgres": {
      // 3 Stacked database cylinder platters
      ctx.strokeStyle = "#818cf8";
      ctx.fillStyle = "rgba(129, 140, 248, 0.35)";
      ctx.lineWidth = 3;

      [-16, 0, 16].forEach((offsetY) => {
        ctx.beginPath();
        ctx.ellipse(iconX, iconY + offsetY, 26, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // Side connecting walls
      ctx.beginPath();
      ctx.moveTo(iconX - 26, iconY - 16);
      ctx.lineTo(iconX - 26, iconY + 16);
      ctx.moveTo(iconX + 26, iconY - 16);
      ctx.lineTo(iconX + 26, iconY + 16);
      ctx.stroke();
      break;
    }

    case "git": {
      // Git commit branch tree
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 3.5;

      // Trunk line
      ctx.beginPath();
      ctx.moveTo(iconX - 10, iconY + 20);
      ctx.lineTo(iconX - 10, iconY - 20);
      // Branch curve
      ctx.moveTo(iconX - 10, iconY + 6);
      ctx.quadraticCurveTo(iconX + 8, iconY + 4, iconX + 12, iconY - 10);
      ctx.stroke();

      // 3 Node circles
      ctx.fillStyle = "#f87171";
      [
        { x: iconX - 10, y: iconY - 20 },
        { x: iconX - 10, y: iconY + 18 },
        { x: iconX + 12, y: iconY - 10 },
      ].forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#070c18";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      break;
    }

    case "graphql": {
      // Pink Hexagon
      ctx.strokeStyle = "#e879f9";
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      const hexR = 24;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = iconX + Math.cos(a) * hexR;
        const hy = iconY + Math.sin(a) * hexR;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner triangular lines
      ctx.beginPath();
      ctx.moveTo(iconX, iconY - hexR);
      ctx.lineTo(iconX + Math.cos(Math.PI / 3) * hexR, iconY + Math.sin(Math.PI / 3) * hexR);
      ctx.lineTo(iconX + Math.cos((2 * Math.PI) / 3) * hexR, iconY + Math.sin((2 * Math.PI) / 3) * hexR);
      ctx.closePath();
      ctx.stroke();
      break;
    }

    case "tailwind": {
      // Dual breeze waves
      ctx.strokeStyle = "#2dd4bf";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(iconX - 22, iconY - 8);
      ctx.bezierCurveTo(iconX - 10, iconY - 24, iconX + 6, iconY - 2, iconX + 22, iconY - 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(iconX - 18, iconY + 14);
      ctx.bezierCurveTo(iconX - 6, iconY - 2, iconX + 10, iconY + 20, iconX + 26, iconY + 8);
      ctx.stroke();
      break;
    }
  }
  ctx.restore();

  // 3. Draw Typography on the Right Side
  ctx.save();
  // Skill Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px 'Geist Mono', monospace, -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(skill.name, 134, 46);

  // Category Badge & Tagline
  ctx.fillStyle = skill.accentColor;
  ctx.font = "600 13px 'Geist Mono', monospace, sans-serif";
  ctx.fillText(`[${skill.category.toUpperCase()}]`, 134, 78);

  ctx.fillStyle = "rgba(203, 213, 225, 0.85)";
  ctx.font = "12px 'Geist Mono', monospace, sans-serif";
  ctx.fillText(skill.tagline, 134, 100);
  ctx.restore();

  // 4. Create and Cache Three.js Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  textureCache.set(skill.id, texture);
  return texture;
}
