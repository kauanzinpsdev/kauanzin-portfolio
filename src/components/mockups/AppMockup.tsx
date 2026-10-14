import { cn } from "../../utils/cn";
import BrowserFrame from "./BrowserFrame";

const menu = ["Otimização", "Personalização", "Configuração"];
const toggles = [
  { label: "Modo desempenho", on: true },
  { label: "Limpeza de cache", on: true },
  { label: "Texturas leves", on: false },
];
const sliders = [
  { label: "Qualidade gráfica", value: 62 },
  { label: "Distância de renderização", value: 38 },
];

/** Conceito visual: painel de uma ferramenta de otimização/configuração. Sem números ou métricas reais. */
export default function AppMockup() {
  return (
    <BrowserFrame>
      <div className="flex h-full w-full bg-[#06090e] font-sans text-white">
        <aside className="flex w-[210px] shrink-0 flex-col gap-2 border-r border-white/10 bg-[#0a0f16] p-5">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-[linear-gradient(135deg,#22d3ee,#6366f1)]" />
            <span className="text-[14px] font-bold">FiveM Optimizer</span>
          </div>
          {menu.map((item, index) => (
            <div
              key={item}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px]",
                index === 0 ? "bg-cyan-400/10 text-cyan-300" : "text-white/50",
              )}
            >
              <span className={cn("h-3.5 w-3.5 rounded-[4px]", index === 0 ? "bg-cyan-300" : "bg-white/20")} />
              {item}
            </div>
          ))}
          <div className="mt-auto rounded-xl border border-white/10 p-3">
            <span className="block h-1.5 w-3/4 rounded bg-white/15" />
            <span className="mt-2 block h-1.5 w-1/2 rounded bg-white/10" />
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-7">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[24px] font-bold">Otimização</h3>
              <p className="mt-1 text-[13px] text-white/50">Ajuste o seu ambiente com poucos cliques.</p>
            </div>
            <span className="rounded-lg bg-cyan-400 px-4 py-2 text-[12px] font-semibold text-[#06090e]">
              Aplicar ajustes
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {toggles.map((toggle) => (
              <div key={toggle.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div
                  className={cn(
                    "flex h-5 w-9 items-center rounded-full p-0.5",
                    toggle.on ? "justify-end bg-cyan-400" : "justify-start bg-white/15",
                  )}
                >
                  <span className="h-4 w-4 rounded-full bg-white" />
                </div>
                <p className="mt-4 text-[13px] font-semibold">{toggle.label}</p>
                <span className="mt-2 block h-1.5 w-4/5 rounded bg-white/10" />
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[12px] font-semibold text-white/60">Uso de recursos</p>
              <svg viewBox="0 0 300 100" className="mt-3 h-[120px] w-full" preserveAspectRatio="none">
                <path
                  d="M0 80 C30 70 50 40 80 48 S130 85 160 55 S220 15 250 30 S285 45 300 25 L300 100 L0 100 Z"
                  fill="rgba(34,211,238,0.12)"
                />
                <path
                  d="M0 80 C30 70 50 40 80 48 S130 85 160 55 S220 15 250 30 S285 45 300 25"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="space-y-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              {sliders.map((slider) => (
                <div key={slider.label}>
                  <p className="text-[12px] font-semibold text-white/60">{slider.label}</p>
                  <div className="relative mt-3 h-1.5 rounded-full bg-white/10">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-cyan-400" style={{ width: `${slider.value}%` }} />
                    <span
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-300 bg-[#06090e]"
                      style={{ left: `${slider.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
