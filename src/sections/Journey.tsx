import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { cn } from "../utils/cn";

const steps = [
  { number: "01", title: "Começo", text: "Primeiros passos na área de Tecnologia da Informação." },
  {
    number: "02",
    title: "Aprendizado",
    text: "Estudando desenvolvimento, design, programação e novas tecnologias.",
  },
  { number: "03", title: "Projetos", text: "Transformando conhecimento em projetos reais." },
  {
    number: "04",
    title: "Próximo nível",
    text: "Construindo meu portfólio e buscando novos clientes.",
  },
] as const;

export default function Journey() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(0);

  // Progresso do scroll ao longo da timeline (0 = começo da lista, 1 = fim).
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const update = (progress: number) => {
    // O passo N acende quando o progresso chega perto da posição dele na lista.
    let count = 0;
    steps.forEach((_, index) => {
      if (progress >= index / steps.length - 0.02) count = index;
    });
    setReached(count);
  };

  useMotionValueEvent(scrollYProgress, "change", update);
  useEffect(() => update(scrollYProgress.get()), [scrollYProgress]);

  return (
    <section id="jornada" aria-labelledby="jornada-titulo" className="section-pad relative">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="jornada-titulo" title="Começando pequeno. Pensando grande." />
        </div>

        <div className="relative">
          {/* Trilho e preenchimento que cresce com o scroll */}
          <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : line }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-accent to-accent/40 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
          />

          <ol ref={listRef} className="relative space-y-14">
            {steps.map((step, index) => {
              const isReached = reduceMotion || index <= reached;
              return (
                <li key={step.number} className="relative pl-16">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border bg-ink font-display text-sm font-bold transition-all duration-500",
                      isReached
                        ? "border-accent text-accent shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]"
                        : "border-white/15 text-muted",
                    )}
                  >
                    {step.number}
                  </span>
                  <div className={cn("transition-opacity duration-500", isReached ? "opacity-100" : "opacity-40")}>
                    <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-muted sm:text-lg">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
