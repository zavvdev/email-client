import Link from "next/link";
import { Button } from "@/app/components/atoms/button";
import { Input } from "@/app/components/atoms/input";
import { getI18n } from "@/app/i18n";
import { PropsWithLocale } from "@/app/types/props";

export default async function Login({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "login");

  return (
    <div className="flex flex-col justify-center gap-5 w-full">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <form className="flex flex-col gap-2 w-[320px] max-sm:w-full self-center">
        <Input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("form.email")}
        />
        <Input
          required
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder={t("form.password")}
        />
        <Button type="submit">{t("form.submit")}</Button>
        <div className="text-center text-gray-500">
          {t("signup_text")}{" "}
          <Link
            href={`/${params.lng}/sign-up`}
            className="text-black hover:underline"
          >
            {t("signup")}
          </Link>
        </div>
      </form>
    </div>
  );
}
