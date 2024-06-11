export const LOCALES = {
  en: "en",
  uk: "uk",
} as const;

export const DEFAULT_LOCALE = LOCALES.en;

export type I18nNamespace = "common" | "home" | "login" | "sign-up";
