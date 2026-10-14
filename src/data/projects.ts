export type ProjectKind = "Projeto conceito" | "Demonstração" | "Estudo de interface";

/** Qual mockup desenhado em código representa o projeto (usado enquanto não há screenshot real). */
export type MockupKey = "law" | "app" | "landing";

export type Project = {
  id: string;
  title: string;
  category: string;
  /** Deixa claro que NÃO é trabalho de cliente. */
  kind: ProjectKind;
  description: string;
  tags: string[];
  /** Pontos de foco do projeto (aparecem em "Detalhes"). */
  focus: string[];
  /** Mockup desenhado em código. Ignorado quando `image` existe. */
  mockup?: MockupKey;
  /** Screenshot real do projeto (opcional). Coloque o arquivo em src/assets e importe aqui. */
  image?: string;
  /** Link do projeto no ar (opcional). Se existir, "Ver projeto" abre esse link em nova aba. */
  url?: string;
  /** Link do repositório no GitHub (opcional). */
  repo?: string;
};

/**
 * Os três projetos abaixo são conceitos e demonstrações. Nenhum é trabalho de cliente.
 *
 * Quando um projeto tiver screenshot ou site publicado, basta adicionar `image` e/ou `url`:
 *
 * import capa from "../assets/advocacia.jpg";
 * { ...projeto, image: capa, url: "https://..." }
 */
export const projects: Project[] = [
  {
    id: "advocacia-premium",
    title: "Advocacia Premium",
    category: "Site Institucional",
    kind: "Projeto conceito",
    description:
      "Conceito de site moderno para escritório de advocacia, desenvolvido com foco em credibilidade, apresentação dos serviços e geração de contatos.",
    tags: ["React", "TypeScript", "Tailwind"],
    focus: ["Credibilidade", "Apresentação dos serviços", "Geração de contatos"],
    mockup: "law",
  },
  {
    id: "fivem-optimizer",
    title: "FiveM Optimizer",
    category: "Aplicação Web",
    kind: "Estudo de interface",
    description:
      "Interface conceitual para uma ferramenta focada em otimização, personalização e configuração do FiveM.",
    tags: ["React", "TypeScript", "UI/UX"],
    focus: ["Otimização", "Personalização", "Configuração"],
    mockup: "app",
  },
  {
    id: "business-landing-page",
    title: "Business Landing Page",
    category: "Landing Page",
    kind: "Demonstração",
    description:
      "Landing page criada como demonstração para empresas que buscam uma presença digital moderna e profissional.",
    tags: ["React", "Tailwind", "Framer Motion"],
    focus: ["Presença digital moderna", "Visual profissional"],
    mockup: "landing",
  },
];
