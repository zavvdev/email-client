import { dir } from "i18next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { PropsWithLocale } from "@/app/types/props";
import { cn } from "@/app/styles/utils";
import { LOCALES } from "@/app/i18n/config";
import { getI18n } from "@/app/i18n";

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
    <html suppressHydrationWarning={true} lang={lng} dir={dir(lng)}>
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
