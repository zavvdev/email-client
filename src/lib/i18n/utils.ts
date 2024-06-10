import { LOCALES } from "@/lib/i18n/config";

export function switchPathnameLang(pathname: string, nextLang: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0];

  if (
    Object.values(LOCALES).includes(lang as any) &&
    Object.values(LOCALES).includes(nextLang as any)
  ) {
    return `/${nextLang}/${segments.slice(1).join("/")}`;
  }

  return pathname;
}
