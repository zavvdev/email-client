import { dir } from "i18next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/ui/globals.css";
import { PropsWithLocale } from "@/app/types/props";
import { cn } from "@/lib/utilities/styles";
import { LOCALES } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n";

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
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
