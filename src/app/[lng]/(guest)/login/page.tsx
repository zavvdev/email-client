import { getI18n } from "@/app/i18n";
import { PropsWithLocale } from "@/app/types/props";
import { Form } from "./form";

export default async function Login({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "login");

  return (
    <div className="flex flex-col justify-center gap-5 w-full">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <Form
        lng={params.lng}
        t={{
          form: t("form", { returnObjects: true }),
          additional: t("additional", { returnObjects: true }),
        }}
      />
    </div>
  );
}
