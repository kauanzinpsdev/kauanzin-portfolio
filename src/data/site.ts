export const SITE = {
  name: "Kauan Santos",
  tagline: "Desenvolvimento Web • Tecnologia • Evolução",
  email: "kauansantosdevl@gmail.com",
  instagram: {
    handle: "@kauanzinps",
    url: "https://instagram.com/kauanzinps",
  },
  whatsapp: {
    display: "(19) 99677-4656",
    number: "5519996774656",
    url: "https://wa.me/5519996774656",
  },
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;

/** Monta o link do WhatsApp com uma mensagem já preenchida. */
export function whatsappLink(message: string): string {
  return `${SITE.whatsapp.url}?text=${encodeURIComponent(message)}`;
}
