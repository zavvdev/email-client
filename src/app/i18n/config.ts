export const LOCALES = {
  en: "en",
  pl: "pl",
} as const;

export const DEFAULT_LOCALE = LOCALES.en;

export type I18nNamespace = "common" | "home" | "login";
