import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Hammer } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog, { type DialogMode } from "../components/ProjectDialog";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { projects, type Project } from "../data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

// Aparecem ao rolar: opacity + translateY. O 3º projeto entra um instante depois do 2º (stagger).
const entry: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: index === 2 ? 0.14 : 0 },
  }),
};

/** Desktop: 1º projeto ocupa a linha toda; 2º e 3º ficam lado a lado (7/5, assimétricos). */
function spanClass(index: number): string {
  if (index === 0) return "lg:col-span-12";
  if (index === 1) return "lg:col-span-7";
  if (index === 2) return "lg:col-span-5";
  return "lg:col-span-6";
}

type DialogState = { project: Project; mode: DialogMode } | null;

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [dialog, setDialog] = useState<DialogState>(null);
  const closeDialog = useCallback(() => setDialog(null), []);
  const hasProjects = projects.length > 0;

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="section-pad relative overflow-hidden">
      {/* Atmosfera: brilhos ciano bem discretos, no mesmo clima do Hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.09),transparent_65%)]" />
        <div className="absolute -left-48 bottom-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.06),transparent_65%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            id="projetos-titulo"
            eyebrow="PROJETOS"
            large
            title={
              <>
                Algumas ideias que <br className="hidden sm:block" />
                transformei em experiências.
              </>
            }
          >
            <p>
              Projetos conceito e interfaces que estou desenvolvendo enquanto evoluo minhas habilidades em
              desenvolvimento web.
            </p>
          </SectionHeading>
        </Reveal>

        {hasProjects ? (
          <>
            <ul className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-8">
              {projects.map((project, index) => (
                <motion.li
                  key={project.id}
                  custom={index}
                  variants={entry}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  className={spanClass(index)}
                >
                  <ProjectCard
                    project={project}
                    index={index + 1}
                    featured={index === 0}
                    onPreview={() => setDialog({ project, mode: "preview" })}
                    onDetails={() => setDialog({ project, mode: "details" })}
                  />
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-muted">
              Todos os projetos desta seção são conceitos e demonstrações criados por mim para estudo. Não são
              trabalhos de clientes.
            </p>
          </>
        ) : (
          <Reveal className="mt-14">
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center sm:px-12 sm:py-20">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                <Hammer className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">Novos projetos estão chegando.</h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Estou construindo meu portfólio e em breve você poderá conhecer meus trabalhos por aqui.
              </p>
              <button
                type="button"
                disabled
                className="mt-8 inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-muted sm:text-base"
              >
                Em breve
              </button>
            </div>
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {dialog ? (
          <ProjectDialog
            key={dialog.project.id}
            project={dialog.project}
            initialMode={dialog.mode}
            onClose={closeDialog}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
