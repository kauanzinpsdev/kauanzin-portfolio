import type { ReactNode } from "react";

/** Moldura de navegador (36px de barra + conteúdo) usada nos mockups. Tamanho lógico: 960×600. */
export default function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0c0c0e]">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/10 bg-[#0c0c0e] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-5 h-5 w-64 rounded-md bg-white/[0.07]" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
