import { BookOpen, Code, Rocket } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SpotlightCard from "../components/SpotlightCard";
import heroPoster from "../assets/hero-poster.jpg";

const paragraphs = [
  "Meu nome é Kauan Santos e estou começando agora minha jornada na área de Tecnologia da Informação.",
  "Estou constantemente estudando, aprendendo novas tecnologias e colocando meus conhecimentos em prática através de projetos reais.",
  "Atualmente estou começando a desenvolver sites para empresas e profissionais que querem melhorar sua presença na internet.",
  "Meu objetivo é evoluir cada vez mais, criar projetos melhores e construir uma carreira sólida na área de tecnologia.",
];

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="section-pad relative">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading id="sobre-titulo" title="Quem está por trás dos projetos?" />
          </Reveal>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {paragraphs.map((text, index) => (
              <Reveal key={text} delay={index * 0.08}>
                <p className={index === 0 ? "text-white" : undefined}>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Reveal className="col-span-2">
            <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 sm:h-64">
              <img
                src={heroPoster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[75%_50%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                Evoluindo a cada projeto.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SpotlightCard className="h-full p-5 sm:p-6">
              <BookOpen className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold">Aprendendo</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Estudo desenvolvimento web e novas tecnologias.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.16}>
            <SpotlightCard className="h-full p-5 sm:p-6">
              <Code className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold">Praticando</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Coloco o que aprendo em projetos.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal className="col-span-2" delay={0.24}>
            <SpotlightCard className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <Rocket className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-semibold">Começando a atender clientes</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    Desenvolvendo sites para empresas e profissionais que querem melhorar sua presença na internet.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
