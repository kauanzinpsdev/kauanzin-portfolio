import BrowserFrame from "./BrowserFrame";

const features = ["Design moderno", "Feito para celular", "Contato rápido"];

/** Conceito visual: landing page institucional clara, para contrastar com os outros dois mockups. */
export default function LandingMockup() {
  return (
    <BrowserFrame>
      <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(160deg,#f8fafc_0%,#e0f2fe_100%)] font-sans text-slate-900">
        <div className="flex items-center justify-between px-12 py-6">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-full bg-[linear-gradient(135deg,#22d3ee,#4f46e5)]" />
            <span className="text-[16px] font-bold">Sua Empresa</span>
          </div>
          <div className="flex gap-8 text-[12px] text-slate-500">
            <span>Início</span>
            <span>Serviços</span>
            <span>Sobre</span>
            <span>Contato</span>
          </div>
          <span className="rounded-full bg-slate-900 px-5 py-2 text-[12px] font-semibold text-white">Solicitar contato</span>
        </div>

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-10 px-12 pt-4">
          <div>
            <span className="inline-block rounded-full border border-cyan-200 bg-white px-3 py-1 text-[11px] font-semibold text-cyan-700">
              Presença digital profissional
            </span>
            <h3 className="mt-4 text-[44px] font-extrabold leading-[1.05] tracking-tight">
              Sua empresa pronta para o digital.
            </h3>
            <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-slate-600">
              Uma página clara, rápida e bonita para apresentar seus serviços e facilitar o contato.
            </p>
            <div className="mt-6 flex gap-3 text-[12px] font-semibold">
              <span className="rounded-full bg-cyan-600 px-6 py-3 text-white">Solicitar orçamento</span>
              <span className="rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-700">Ver serviços</span>
            </div>
          </div>

          <div className="relative h-[290px]">
            <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,#0891b2,#312e81)]" />
            <div className="absolute left-6 top-8 w-[190px] rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
              <span className="block h-2 w-16 rounded bg-white/70" />
              <span className="mt-3 block h-1.5 w-full rounded bg-white/40" />
              <span className="mt-2 block h-1.5 w-4/5 rounded bg-white/40" />
              <span className="mt-4 block h-7 w-24 rounded-full bg-white/80" />
            </div>
            <div className="absolute right-6 top-6 h-[250px] w-[128px] rounded-[26px] border-[5px] border-slate-900 bg-white shadow-xl">
              <span className="mx-auto mt-2 block h-1 w-10 rounded bg-slate-200" />
              <div className="m-2.5 h-[70px] rounded-xl bg-[linear-gradient(135deg,#22d3ee,#4f46e5)]" />
              <span className="mx-3 block h-1.5 w-4/5 rounded bg-slate-200" />
              <span className="mx-3 mt-2 block h-1.5 w-3/5 rounded bg-slate-200" />
              <span className="mx-3 mt-4 block h-6 rounded-full bg-cyan-600" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-12 bottom-7 grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature} className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)]">
              <span className="block h-8 w-8 rounded-lg bg-cyan-100" />
              <p className="mt-3 text-[14px] font-bold">{feature}</p>
              <span className="mt-2 block h-1.5 w-4/5 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
