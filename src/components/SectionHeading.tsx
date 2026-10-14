import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type SectionHeadingProps = {
  id?: string;
  /** Rótulo pequeno acima do título (ex.: "PROJETOS"). */
  eyebrow?: string;
  title: ReactNode;
  /** Título maior em telas grandes. */
  large?: boolean;
  children?: ReactNode;
  className?: string;
};

/** Título de seção padronizado (h2) com texto de apoio opcional. */
export default function SectionHeading({ id, eyebrow, title, large = false, children, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl",
          large && "lg:text-6xl",
        )}
      >
        {title}
      </h2>
      {children ? (
        <div className={cn("mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg")}>{children}</div>
      ) : null}
    </div>
  );
}
