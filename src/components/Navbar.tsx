import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";
import { cn } from "../utils/cn";
import ButtonLink from "./ButtonLink";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Fundo escuro translúcido + blur depois que a página rola.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile: fecha com Esc e quando a tela cresce.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-white/[0.06] backdrop-blur-md lg:backdrop-blur-xl" : "border-transparent bg-transparent",
        solid && (open ? "bg-ink/95" : "bg-ink/70"),
      )}
    >
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Ir para o conteúdo
      </a>

      <nav aria-label="Principal" className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-extrabold tracking-[0.18em] text-white"
        >
          {SITE.name.toUpperCase()}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                    isActive ? "text-white" : "text-muted hover:text-white",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ButtonLink href="#contato" className="hidden min-h-10 px-5 py-2 text-sm sm:inline-flex">
            Vamos conversar
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 lg:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href.slice(1) ? "page" : undefined}
                    className={cn(
                      "block py-3.5 font-display text-2xl font-semibold transition-colors",
                      active === link.href.slice(1) ? "text-accent" : "text-white hover:text-accent",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <ButtonLink href="#contato" onClick={() => setOpen(false)} className="w-full">
                  Vamos conversar
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
