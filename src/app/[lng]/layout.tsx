import { dir } from "i18next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { PropsWithLocale } from "@/app/types/props";
import { cn } from "@/app/styles/utils";
import { LOCALES } from "@/app/i18n/config";
import { getI18n } from "@/app/i18n";
import ErrorBoundary from "../components/molecules/error-boundary";

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
    <html suppressHydrationWarning={true} lang={lng} dir={dir(lng)}>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ErrorBoundary text={t("critical_client_error")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
