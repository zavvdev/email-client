import { DEFAULT_LOCALE } from "@/app/i18n/config";
import { FOLDER_NAMES } from "@/domain/emails/config";

export function isAuthRoute(pathname: string) {
  const path = pathname.split("/").slice(2).join("/");
  return ["login", "sign-up"].includes(path) || !path;
}

export function appUrl(pathname: string, lang: string | null = DEFAULT_LOCALE) {
  return `${process.env.APP_URL}${lang ? `/${lang}` : ""}${pathname}`;
}

export function getStartRoute(lang: string | null = DEFAULT_LOCALE) {
  return appUrl(`/folder/${FOLDER_NAMES.inbox}`, lang);
}
