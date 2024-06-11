import { PropsWithChildren } from "react";
import { LangSwitch } from "@/app/components/molecules/lang-switch";
import { ThemeToggle } from "@/app/components/molecules/theme-toggle";
import { getI18n } from "@/app/i18n";
import { PropsWithLocale } from "@/app/types/props";

export default async function GuestLayout({
  children,
  params,
}: PropsWithChildren & PropsWithLocale) {
  const { t } = await getI18n(params.lng, "common");

  return (
    <div className="flex flex-col align-middle justify-between h-screen p-4">
      <div className="flex justify-center flex-1">{children}</div>
      <div className="flex justify-center gap-2">
        <ThemeToggle
          t={{
            light: t("theme.light"),
            dark: t("theme.dark"),
            system: t("theme.system"),
          }}
        />
        <LangSwitch />
      </div>
    </div>
  );
}
