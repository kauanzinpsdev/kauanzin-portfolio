type ClassValue = string | false | null | undefined;

/** Junta classes condicionais em uma única string. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
