"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import { switchPathnameLang } from "@/lib/i18n/utils";

export function LangSwitch({ lng }: { lng: string }) {
  const pathname = usePathname();

  return (
    <>
      {lng === LOCALES.en ? (
        <Link href={switchPathnameLang(pathname, LOCALES.pl)}>PL</Link>
      ) : (
        <Link href={switchPathnameLang(pathname, LOCALES.en)}>EN</Link>
      )}
    </>
  );
}
