import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { InstagramIcon } from "../components/icons";
import Reveal from "../components/Reveal";
import SpotlightCard from "../components/SpotlightCard";
import { SITE, whatsappLink } from "../data/site";
import { cn } from "../utils/cn";

type FormValues = { name: string; email: string; company: string; message: string };
type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

const initialValues: FormValues = { name: "", email: "", company: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Informe seu nome.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Informe um e-mail válido, como nome@email.com.";
  if (!values.message.trim()) errors.message = "Escreva uma mensagem.";
  return errors;
}

function buildMessage({ name, email, company, message }: FormValues): string {
  const who = company.trim() ? `${name.trim()} (${company.trim()})` : name.trim();
  return `Olá, Kauan Santos! Meu nome é ${who}.\n\n${message.trim()}\n\nMeu e-mail: ${email.trim()}`;
}

const inputClass =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-accent/60";

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [openedLink, setOpenedLink] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (name === "name" || name === "email" || name === "message") clearError(name);
  };

  const clearError = (key: keyof FormErrors) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  // Ainda não há servidor de e-mail: o formulário monta a mensagem e abre o WhatsApp já preenchido.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const link = whatsappLink(buildMessage(values));
    window.open(link, "_blank", "noopener,noreferrer");
    setOpenedLink(link);
  };

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_65%)]"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <h2
              id="contato-titulo"
              className="text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Vamos criar algo juntos?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Tem uma empresa, projeto ou ideia que precisa de uma presença digital mais profissional? Vamos
              conversar.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-3">
              <li>
                <SpotlightCard>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Mail className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold">Email</span>
                      <span className="block text-sm text-muted">{SITE.email}</span>
                    </span>
                  </a>
                </SpotlightCard>
              </li>
              <li>
                <SpotlightCard>
                  <a
                    href={SITE.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <InstagramIcon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold">Instagram</span>
                      <span className="block text-sm text-muted">{SITE.instagram.handle}</span>
                    </span>
                  </a>
                </SpotlightCard>
              </li>
              <li>
                <SpotlightCard>
                  <a
                    href={SITE.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <MessageCircle className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold">WhatsApp</span>
                      <span className="block text-sm text-muted">{SITE.whatsapp.display}</span>
                    </span>
                  </a>
                </SpotlightCard>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass space-y-5 rounded-3xl p-6 shadow-[0_0_80px_-30px_rgba(34,211,238,0.35)] sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-erro" : undefined}
                placeholder="Como posso te chamar?"
                className={cn(inputClass, errors.name ? "border-red-400/70" : "border-white/10")}
              />
              {errors.name ? (
                <p id="name-erro" role="alert" className="mt-1.5 text-sm text-red-300">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-erro" : undefined}
                  placeholder="nome@email.com"
                  className={cn(inputClass, errors.email ? "border-red-400/70" : "border-white/10")}
                />
                {errors.email ? (
                  <p id="email-erro" role="alert" className="mt-1.5 text-sm text-red-300">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-semibold">
                  Empresa <span className="font-normal text-muted">(opcional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={values.company}
                  onChange={handleChange}
                  placeholder="Nome da empresa"
                  className={cn(inputClass, "border-white/10")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-erro" : undefined}
                placeholder="Conte um pouco sobre o que você precisa."
                className={cn(inputClass, "resize-y", errors.message ? "border-red-400/70" : "border-white/10")}
              />
              {errors.message ? (
                <p id="message-erro" role="alert" className="mt-1.5 text-sm text-red-300">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3 text-base font-semibold text-ink shadow-[0_0_32px_-8px_rgba(34,211,238,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft active:scale-[0.98]"
            >
              Enviar mensagem
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>

            <div aria-live="polite">
              {openedLink ? (
                <p className="text-sm leading-relaxed text-muted">
                  Abrimos o WhatsApp com a sua mensagem pronta. É só enviar por lá. Não abriu?{" "}
                  <a
                    href={openedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline underline-offset-4"
                  >
                    Abrir o WhatsApp
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
