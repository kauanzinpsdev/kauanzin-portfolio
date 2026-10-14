import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const groups = [
  { title: "Base da web", items: ["HTML", "CSS", "JavaScript"] },
  { title: "Evoluindo com", items: ["TypeScript", "React", "Tailwind CSS"] },
  { title: "Ferramentas", items: ["Git", "GitHub", "Node.js"] },
] as const;

export default function Technologies() {
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-titulo" className="section-pad relative">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="tecnologias-titulo" title="Tecnologias que estou estudando">
            <p>Estou estudando e desenvolvendo projetos utilizando diferentes tecnologias.</p>
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.08}>
              <h3 className="text-sm font-semibold text-muted">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="glass flex items-center gap-3 rounded-xl px-5 py-4 font-display text-lg font-semibold transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.06]"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
