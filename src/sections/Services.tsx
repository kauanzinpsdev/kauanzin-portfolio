import { Briefcase, Building2, LayoutTemplate, SlidersHorizontal, type LucideIcon } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SpotlightCard from "../components/SpotlightCard";

type Service = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    number: "01",
    title: "Sites Institucionais",
    text: "Sites profissionais para empresas apresentarem seus serviços e fortalecerem sua presença digital.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Landing Pages",
    text: "Páginas modernas focadas em apresentar produtos, serviços ou campanhas.",
    icon: LayoutTemplate,
  },
  {
    number: "03",
    title: "Portfólios",
    text: "Sites para profissionais mostrarem seus trabalhos, projetos e experiência.",
    icon: Briefcase,
  },
  {
    number: "04",
    title: "Sites Personalizados",
    text: "Projetos desenvolvidos de acordo com as necessidades de cada cliente.",
    icon: SlidersHorizontal,
  },
];

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="section-pad relative">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="servicos-titulo" title="O que posso criar para você?" />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ number, title, text, icon: Icon }, index) => (
            <li key={title}>
              <Reveal delay={index * 0.08} className="h-full">
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="font-display text-sm font-semibold text-white/30">
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-semibold leading-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
