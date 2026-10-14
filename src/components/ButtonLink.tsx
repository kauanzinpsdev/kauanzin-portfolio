import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  icon?: ReactNode;
  /** Abre em nova aba (links externos). */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

const styles = {
  primary:
    "bg-accent text-ink shadow-[0_0_32px_-8px_rgba(34,211,238,0.65)] hover:bg-accent-soft hover:shadow-[0_0_40px_-6px_rgba(34,211,238,0.8)]",
  ghost: "glass text-white hover:border-white/30 hover:bg-white/[0.08]",
} as const;

/** Classes de botão, para reaproveitar o mesmo visual em <button>. */
export function buttonClass(variant: keyof typeof styles = "primary", className?: string): string {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 sm:px-6 sm:text-base",
    styles[variant],
    className,
  );
}

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
  className,
  ariaLabel,
  onClick,
}: ButtonLinkProps) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={buttonClass(variant, className)}
    >
      {children}
      {icon}
    </motion.a>
  );
}
