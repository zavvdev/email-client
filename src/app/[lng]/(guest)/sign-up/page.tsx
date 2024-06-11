import Link from "next/link";
import { Button } from "@/app/components/atoms/button";
import { Input } from "@/app/components/atoms/input";
import { getI18n } from "@/app/i18n";
import { PropsWithLocale } from "@/app/types/props";

export default async function SignUp({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "sign-up");

  return (
    <div className="flex flex-col justify-center gap-5 w-full">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <form className="flex flex-col gap-2 w-[320px] max-sm:w-full self-center">
        <div className="flex gap-2">
          <Input
            required
            name="first_name"
            placeholder={t("form.first_name")}
          />
          <Input required name="last_name" placeholder={t("form.last_name")} />
        </div>
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
        <Input
          required
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          placeholder={t("form.confirm_password")}
        />
        <Button type="submit">{t("form.submit")}</Button>
        <div className="text-center text-gray-500">
          {t("login_text")}{" "}
          <Link
            href={`/${params.lng}/login`}
            className="text-black hover:underline"
          >
            {t("login")}
          </Link>
        </div>
      </form>
    </div>
  );
}
