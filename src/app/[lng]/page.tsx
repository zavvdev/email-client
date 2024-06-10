import { PropsWithLocale } from "@/app/types/props";
import { getI18n } from "@/lib/i18n";

export default async function Home({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "home");

  return (
    <div>
      <h1 className="text-2xl text-red-400">{t("title")}</h1>
    </div>
  );
}
