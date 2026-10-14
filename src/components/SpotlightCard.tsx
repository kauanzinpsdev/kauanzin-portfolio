import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "../utils/cn";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card de vidro com um brilho ciano discreto que acompanha o cursor.
 * Usa só CSS variables + transform, então é leve.
 */
export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass transition-all duration-300",
        "hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_48px_-16px_rgba(34,211,238,0.45)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 0%), rgba(34,211,238,0.14), transparent 60%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
