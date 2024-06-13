import { DEFAULT_LOCALE } from "@/app/i18n/config";

export function isAuthRoute(pathname: string) {
  const path = pathname.split("/").slice(2).join("/");
  return ["login", "sign-up"].includes(path) || !path;
}

export function appUrl(pathname: string, lang: string | null = DEFAULT_LOCALE) {
  return `${process.env.APP_URL}${lang ? `/${lang}` : ""}${pathname}`;
}
