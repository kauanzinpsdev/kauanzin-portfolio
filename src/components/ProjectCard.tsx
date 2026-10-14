import { motion, useReducedMotion } from "framer-motion";
import { Eye } from "lucide-react";
import type { Project } from "../data/projects";
import { cn } from "../utils/cn";
import ButtonLink, { buttonClass } from "./ButtonLink";
import ProjectVisual from "./ProjectVisual";

type ProjectCardProps = {
  project: Project;
  /** Número do projeto na lista (começa em 1). */
  index: number;
  /** Projeto em destaque: ocupa a largura toda no desktop. */
  featured?: boolean;
  onPreview: () => void;
  onDetails: () => void;
};

/**
 * Card grande de projeto: mockup em destaque + informações.
 * Hover (só com mouse): sobe 4px, imagem com zoom leve, overlay escuro com botão "Visualizar"
 * e borda com glow ciano discreto. Com "reduzir movimento", não há zoom nem elevação.
 */
export default function ProjectCard({ project, index, featured = false, onPreview, onDetails }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const { title, category, kind, description, tags, url } = project;

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/80",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-accent/30 hover:shadow-[0_0_44px_-20px_rgba(34,211,238,0.4)]",
        "focus-within:border-accent/30 focus-within:shadow-[0_0_44px_-20px_rgba(34,211,238,0.4)]",
        featured ? "lg:grid lg:grid-cols-[1.5fr_1fr]" : "flex flex-col",
      )}
    >
      {/* Visual */}
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-black",
          featured ? "lg:aspect-auto lg:min-h-[27rem]" : "lg:aspect-auto lg:h-[19rem]",
        )}
      >
        <ProjectVisual
          project={project}
          className={cn(
            "absolute inset-0 transition-transform duration-700 ease-out",
            !reduceMotion && "group-hover:scale-[1.03]",
          )}
        />

        {/* Overlay escuro + botão de visualizar (aparece no hover e no foco do teclado) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={onPreview}
            className="pointer-events-auto inline-flex min-h-11 translate-y-2 items-center gap-2 rounded-full border border-white/25 bg-ink/70 px-5 text-sm font-semibold text-white transition-all duration-500 hover:border-accent/60 hover:text-accent group-hover:translate-y-0 group-focus-within:translate-y-0"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            Visualizar
          </button>
        </div>
      </div>

      {/* Informações */}
      <div className={cn("flex flex-1 flex-col p-6 sm:p-8", featured && "lg:justify-center lg:p-10")}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">
            <span className="font-semibold text-accent">{category}</span>
            <span className="text-muted"> · {kind}</span>
          </p>
          <span aria-hidden="true" className="font-display text-sm font-semibold text-white/30">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-bold leading-tight tracking-tight",
            featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
          )}
        >
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias utilizadas">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {url ? (
            <ButtonLink href={url} external className="min-h-11">
              Ver projeto
            </ButtonLink>
          ) : (
            <button type="button" onClick={onPreview} className={buttonClass("primary", "min-h-11")}>
              Ver projeto
            </button>
          )}
          <button type="button" onClick={onDetails} className={buttonClass("ghost", "min-h-11")}>
            Detalhes
          </button>
        </div>
      </div>
    </motion.article>
  );
}
