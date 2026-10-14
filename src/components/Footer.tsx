import { Mail, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/site";
import { InstagramIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-extrabold tracking-[0.18em]">{SITE.name.toUpperCase()}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{SITE.tagline}</p>
          </div>

          <nav aria-label="Rodapé">
            <p className="text-sm font-semibold text-white">Navegação</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold text-white">Fale comigo</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-muted">
          © 2026 Kauan Santos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
