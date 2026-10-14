import BrowserFrame from "./BrowserFrame";

const pillars = [150, 230, 300, 210];
const areas = ["Direito Civil", "Direito Empresarial", "Direito do Trabalho"];

/** Conceito visual: site institucional para escritório de advocacia. */
export default function LawFirmMockup() {
  return (
    <BrowserFrame>
      <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,#080d19_0%,#101a2e_100%)] font-serif text-[#ece6d6]">
        <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.22),transparent_65%)]" />

        <div className="relative flex items-center justify-between px-12 py-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-[#c9a45c] text-[15px] text-[#c9a45c]">A</span>
            <span className="text-[14px] uppercase tracking-[0.22em]">Advocacia Premium</span>
          </div>
          <div className="flex gap-8 font-sans text-[12px] text-white/60">
            <span>Início</span>
            <span>Áreas de atuação</span>
            <span>Equipe</span>
            <span>Contato</span>
          </div>
          <span className="border border-[#c9a45c] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.14em] text-[#c9a45c]">
            Fale conosco
          </span>
        </div>

        <div className="relative grid grid-cols-[1.15fr_0.85fr] gap-10 px-12 pt-6">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#c9a45c]">Escritório de advocacia</p>
            <h3 className="mt-5 text-[46px] font-medium leading-[1.08]">Credibilidade e atenção em cada caso.</h3>
            <p className="mt-5 max-w-[400px] font-sans text-[14px] leading-relaxed text-white/60">
              Atendimento jurídico com clareza, responsabilidade e foco na solução do seu problema.
            </p>
            <div className="mt-7 flex gap-3 font-sans text-[12px]">
              <span className="bg-[#c9a45c] px-5 py-3 font-semibold text-[#0a1020]">Agendar conversa</span>
              <span className="border border-white/25 px-5 py-3 text-white/80">Conheça as áreas</span>
            </div>
          </div>

          <div className="flex h-[300px] items-end justify-center gap-3">
            {pillars.map((height) => (
              <span
                key={height}
                className="w-14 rounded-t-[28px] border border-[#c9a45c]/20 bg-gradient-to-t from-[#c9a45c]/5 to-[#c9a45c]/40"
                style={{ height }}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-12 bottom-8 grid grid-cols-3 gap-4">
          {areas.map((area) => (
            <div key={area} className="border border-white/10 bg-white/[0.03] p-4">
              <span className="block h-[2px] w-8 bg-[#c9a45c]" />
              <p className="mt-3 text-[15px]">{area}</p>
              <span className="mt-3 block h-1.5 w-4/5 rounded bg-white/10" />
              <span className="mt-2 block h-1.5 w-3/5 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
