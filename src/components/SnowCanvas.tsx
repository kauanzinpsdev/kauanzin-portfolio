import { useEffect, useRef, type MutableRefObject } from "react";

export type PointerRef = MutableRefObject<{ x: number; y: number }>;

type SnowCanvasProps = {
  /** Quantidade de flocos (use menos no celular). */
  count: number;
  /** Posição do mouse normalizada (-1 a 1). Gera um leve deslocamento de profundidade. */
  pointer?: PointerRef;
};

type Flake = {
  x: number;
  y: number;
  /** Profundidade: 0 = longe (pequeno, lento), 1 = perto (grande, rápido, desfocado). */
  z: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
};

const WIND = -16; // px/s — vento suave para a esquerda, seguindo a descida da montanha

/** Desenha uma vez um floco macio e reutiliza (drawImage é bem mais barato que gradientes por frame). */
function createSprite(size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.65)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

export default function SnowCanvas({ count, pointer }: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const sprite = createSprite(64);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const flakes: Flake[] = [];

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let inView = true;
    let smoothX = 0;

    const spawn = (anywhere: boolean): Flake => {
      const z = Math.random();
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : -24,
        z,
        size: (1 + z * z * 4.2) * 4,
        speed: 18 + z * 62,
        sway: 6 + z * 16,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + z * 0.5,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (flakes.length === 0) {
        for (let i = 0; i < count; i++) flakes.push(spawn(true));
      } else {
        for (const flake of flakes) {
          flake.x = Math.min(flake.x, width);
          flake.y = Math.min(flake.y, height);
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const targetX = pointer?.current.x ?? 0;
      smoothX += (targetX - smoothX) * Math.min(1, dt * 3);

      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.phase += dt * (0.6 + flake.z * 0.6);
        flake.y += flake.speed * dt;
        flake.x += (WIND * (0.3 + flake.z) + Math.sin(flake.phase) * flake.sway) * dt;

        if (flake.y > height + 24) Object.assign(flake, spawn(false));
        if (flake.x < -24) flake.x = width + 24;
        else if (flake.x > width + 24) flake.x = -24;

        // Deslocamento por profundidade: flocos "perto" reagem mais ao mouse.
        const drawX = flake.x - smoothX * flake.z * 26;

        ctx.globalAlpha = flake.alpha;
        ctx.drawImage(sprite, drawX - flake.size / 2, flake.y - flake.size / 2, flake.size, flake.size);
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || !inView || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pausa quando o Hero sai da tela ou a aba fica em segundo plano.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, pointer]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
