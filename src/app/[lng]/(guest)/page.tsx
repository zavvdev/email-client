import Link from "next/link";
import { getI18n } from "@/app/i18n";
import { PropsWithLocale } from "@/app/types/props";

const linkClasses = `
p-4 text-center rounded-md text-gray-400 transition-all
hover:bg-gray-100
hover:text-black 
dark:hover:bg-gray-800 
dark:hover:text-white `;

export default async function Home({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "home");

  return (
    <div className="flex flex-col justify-center gap-2">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <div className="flex align-middle justify-center">
        <Link href={`/${params.lng}/login`} className={linkClasses}>
          {t("login")}
        </Link>
        <Link href={`/${params.lng}/sign-up`} className={linkClasses}>
          {t("sign_up")}
        </Link>
      </div>
    </div>
  );
}
