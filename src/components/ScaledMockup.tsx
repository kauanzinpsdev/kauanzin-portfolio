import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

type ScaledMockupProps = {
  children: ReactNode;
  /** Descrição para leitores de tela. */
  label: string;
  /** Tamanho lógico em que o mockup foi desenhado. */
  width?: number;
  height?: number;
  /** Quem usa define o posicionamento (ex.: "absolute inset-0" ou "relative aspect-[16/10]"). */
  className?: string;
};

/**
 * Desenha o mockup em um tamanho fixo (960×600) e o escala para "cobrir" o espaço disponível,
 * como um object-cover. Assim o mesmo mockup fica nítido em qualquer tamanho de card.
 * Só usa transform (barato para o navegador).
 */
export default function ScaledMockup({ children, label, width = 960, height = 600, className }: ScaledMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const next = Math.max(container.clientWidth / width, container.clientHeight / height);
      setScale(Number.isFinite(next) ? next : 0);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div ref={containerRef} role="img" aria-label={label} className={cn("overflow-hidden bg-black", className)}>
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})`, visibility: scale > 0 ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}
