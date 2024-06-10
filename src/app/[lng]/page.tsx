import { PropsWithLocale } from "@/app/types/props";
import { getI18n } from "@/lib/i18n";
import { LangSwitch } from "@/ui/molecules/lang-switch";
import { ThemeToggle } from "@/ui/molecules/theme-toggle";

export default async function Home({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "home");
  const { t: tCommon } = await getI18n(params.lng, "common");

  return (
    <div>
      <h1 className="text-4xl font-extrabold">{t("title")}</h1>
      <ThemeToggle
        t={{
          light: tCommon("theme.light"),
          dark: tCommon("theme.dark"),
          system: tCommon("theme.system"),
        }}
      />
      <LangSwitch />
    </div>
  );
}
