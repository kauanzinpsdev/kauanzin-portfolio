import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../data/projects";
import { buttonClass } from "./ButtonLink";
import ProjectVisual from "./ProjectVisual";

export type DialogMode = "preview" | "details";

type ProjectDialogProps = {
  project: Project;
  initialMode: DialogMode;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Janela de "Ver projeto" (prévia grande) e "Detalhes".
 * Acessível: role="dialog", foco preso dentro dela, fecha com Esc/clique fora e devolve o foco ao botão de origem.
 */
export default function ProjectDialog({ project, initialMode, onClose }: ProjectDialogProps) {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<DialogMode>(initialMode);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const titleId = `projeto-${project.id}-titulo`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;

    // Trava a rolagem do fundo sem "pular" o layout quando a barra some.
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-8"
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/85 sm:backdrop-blur-sm" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0b0d] shadow-[0_0_80px_-30px_rgba(34,211,238,0.35)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink/80 text-white transition-colors hover:border-accent/60 hover:text-accent"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {mode === "preview" ? (
          <div>
            <ProjectVisual project={project} className="relative aspect-[16/10] w-full" />
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div>
                <h2 id={titleId} className="font-display text-2xl font-bold">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {project.kind} · {project.category}
                </p>
              </div>
              <button type="button" onClick={() => setMode("details")} className={buttonClass("ghost", "min-h-11")}>
                Ver detalhes
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.45fr_1fr]">
            <div className="flex items-center bg-black">
              <ProjectVisual project={project} className="relative aspect-[16/10] w-full" />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold text-accent">{project.category}</p>
              <h2 id={titleId} className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight">
                {project.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{project.description}</p>

              <h3 className="mt-6 text-sm font-semibold">Foco do projeto</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.focus.map((item) => (
                  <li key={item} className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent-soft">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold">Tecnologias</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-muted">
                {project.kind}: criado por mim para estudo e demonstração. Não é um site de cliente.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setMode("preview")} className={buttonClass("primary", "min-h-11")}>
                  Ver prévia
                </button>
                <a href="#contato" onClick={onClose} className={buttonClass("ghost", "min-h-11")}>
                  Quero algo parecido
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
