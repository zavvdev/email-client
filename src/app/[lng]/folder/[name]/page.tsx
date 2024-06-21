import { Empty } from "@/app/components/atoms/empty";
import { MessageToolbar } from "@/app/components/organisms/message-toolbar";
import { getI18n } from "@/app/i18n";
import { PropsWithLocale } from "@/app/types/props";

export default async function FolderPage({ params }: PropsWithLocale) {
  const { t } = await getI18n(params.lng, "common");

  return (
    <div>
      <MessageToolbar t={t("message_toolbar", { returnObjects: true })} />
      <Empty>{t("label.no_email")}</Empty>
    </div>
  );
}
