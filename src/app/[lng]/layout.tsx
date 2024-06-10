import { dir } from "i18next";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { PropsWithLocale } from "@/app/types/props";
import { LOCALES } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: PropsWithLocale): Promise<Metadata> {
  const { t } = await getI18n(params.lng, "common");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export async function generateStaticParams() {
  return Object.values(LOCALES).map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params: { lng },
}: Readonly<
  {
    children: React.ReactNode;
  } & PropsWithLocale
>) {
  const { t } = await getI18n(lng, "common");

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <nav className="flex justify-between align-middle p-3 border-b-gray-100 border-2">
          <ul className="flex align-middle gap-2">
            <li>
              <Link href={`/${lng}`}>{t("nav.home")}</Link>
            </li>
            <li>
              <Link href={`/${lng}/login`}>{t("nav.login")}</Link>
            </li>
          </ul>
          <LangSwitch lng={lng} />
        </nav>
        <div className="p-3">{children}</div>
      </body>
    </html>
  );
}
