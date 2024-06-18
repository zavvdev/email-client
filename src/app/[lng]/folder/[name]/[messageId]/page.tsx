import { MessageToolbar } from "@/app/components/organisms/message-toolbar";
import { getI18n } from "@/app/i18n";

interface Props {
  params: {
    messageId: string;
    lng: string;
  };
}

export default async function MessagePage({ params }: Props) {
  const { t } = await getI18n(params.lng, "common");

  return (
    <div>
      <MessageToolbar
        t={t("message_toolbar", { returnObjects: true })}
        isMessageStarred={true}
      />
      Message {params.messageId}
    </div>
  );
}
