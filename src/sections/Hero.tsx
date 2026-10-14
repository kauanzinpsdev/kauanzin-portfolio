import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import ButtonLink from "../components/ButtonLink";
import HeroVideo from "../components/HeroVideo";
import SnowCanvas, { type PointerRef } from "../components/SnowCanvas";
import { SITE } from "../data/site";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

// Sequência de entrada: o vídeo aparece do escuro e, em seguida, os textos entram em cascata.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.55 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // Mouse só faz sentido com ponteiro preciso (desktop/notebook).
  const hasMouse = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const sectionRef = useRef<HTMLElement>(null);
  const pointer: PointerRef = useRef({ x: 0, y: 0 });

  // Parallax de scroll: a imagem se move mais devagar que a página.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollShift = reduceMotion ? "0%" : isMobile ? "5%" : "14%";
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", scrollShift]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Movimento por mouse: imagem e texto deslizam em direções opostas (profundidade).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 });
  const bgX = useTransform(smoothX, [-1, 1], [18, -18]);
  const bgMouseY = useTransform(smoothY, [-1, 1], [10, -10]);
  const textX = useTransform(smoothX, [-1, 1], [-6, 6]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!hasMouse || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
    pointer.current = { x, y };
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    pointer.current = { x: 0, y: 0 };
  };

  // O vídeo já tem neve própria: a camada de partículas é só um reforço leve de profundidade.
  const snowCount = reduceMotion ? 0 : isMobile ? 18 : isTablet ? 36 : 56;

  return (
    <section
      id="inicio"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Apresentação"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* Fundo: fade-in a partir do preto + parallax de scroll + mouse. O vídeo já traz o movimento de câmera. */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className={cn(
          // Celular: a cena ocupa a parte de cima e o texto fica embaixo, sem cobrir o esquiador.
          "absolute inset-x-0 top-0 h-[56%] lg:inset-0 lg:h-auto",
          "[-webkit-mask-image:linear-gradient(to_bottom,#000_70%,transparent)] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]",
          "lg:[-webkit-mask-image:none] lg:[mask-image:none]",
        )}
      >
        <motion.div style={{ y: bgY }} className="gpu absolute inset-[-2%]">
          <motion.div style={{ x: bgX, y: bgMouseY }} className="gpu absolute inset-0">
            <div className="gpu absolute inset-0">
              <HeroVideo />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Camadas de leitura e atmosfera */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Gradiente escuro à esquerda, onde ficam os textos */}
        <div className="absolute inset-y-0 left-0 hidden w-[70%] bg-gradient-to-r from-ink via-ink/75 to-transparent lg:block" />
        {/* Base: no celular sustenta o texto; no desktop faz a emenda com a próxima seção */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/85 to-transparent lg:h-[46%] lg:bg-[linear-gradient(to_top,#050505_0%,rgba(5,5,5,0.94)_14%,rgba(5,5,5,0.7)_38%,rgba(5,5,5,0.32)_66%,rgba(5,5,5,0)_100%)]" />
        {/* Topo: garante leitura da navbar transparente */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/70 to-transparent" />
        {/* Brilho ciano discreto atrás do esquiador */}
        <div className="absolute -right-[10%] top-[8%] h-[75%] w-[65%] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.14),transparent_65%)] mix-blend-screen" />
      </div>

      {/* A neve também "desaparece" perto da base, junto com o cenário */}
      {snowCount > 0 ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_95%)] [mask-image:linear-gradient(to_bottom,#000_60%,transparent_95%)]"
        >
          <SnowCanvas count={snowCount} pointer={pointer} />
        </div>
      ) : null}

      {/* Conteúdo */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-[100svh] items-end lg:items-center"
      >
        <div className="container-page pb-14 pt-32 lg:pb-0 lg:pt-24">
          <motion.div
            variants={container}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            style={{ x: hasMouse && !reduceMotion ? textX : 0 }}
            className="max-w-[34rem] lg:max-w-[min(36rem,44vw)]"
          >
            <motion.p
              variants={item}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent sm:text-xs sm:tracking-[0.28em]"
            >
              DESENVOLVIMENTO WEB • TECNOLOGIA • EVOLUÇÃO
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-[clamp(3.25rem,15vw,4.75rem)] font-extrabold leading-[0.9] tracking-tight text-white lg:text-[clamp(3.5rem,7.6vw,6.75rem)]"
            >
              KAUAN SANTOS
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-lg text-balance font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.1rem]"
            >
              Transformando ideias em experiências digitais.
            </motion.p>

            <motion.p variants={item} className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Estou começando minha jornada na área de TI, criando, aprendendo e evoluindo a cada projeto.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#projetos" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Ver meu trabalho
              </ButtonLink>
              <ButtonLink
                href={SITE.whatsapp.url}
                external
                variant="ghost"
                ariaLabel="Falar comigo pelo WhatsApp (abre em nova aba)"
              >
                Falar comigo
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicação de scroll */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: contentOpacity }}
        className="absolute bottom-7 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-white/15 lg:block"
      >
        <span className={cn("block h-1/2 w-full bg-accent", !reduceMotion && "animate-cue")} />
      </motion.div>
    </section>
  );
}
