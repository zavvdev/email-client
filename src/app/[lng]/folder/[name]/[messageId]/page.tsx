import { Empty } from "@/app/components/atoms/empty";
import { MessageToolbar } from "@/app/components/organisms/message-toolbar";
import { getI18n } from "@/app/i18n";
import { getSession } from "@/domain/auth/session";
import { getMessage } from "@/domain/emails";

interface Props {
  params: {
    messageId: string;
    lng: string;
  };
}

export default async function MessagePage({ params }: Props) {
  const { t } = await getI18n(params.lng, "common");
  const message = await getMessage(Number(params.messageId));
  const session = await getSession();

  const isSent = message?.sender_id === session?.user_id;
  const isInbox = message?.recipient_email === session?.user_email;

  const sender = `${message?.sender_first_name} ${message?.sender_last_name}`;
  const receiver = message?.recipient_first_name
    ? `${message?.recipient_first_name} ${message?.recipient_last_name}`
    : message?.recipient_email;

  return (
    <div className="h-full flex flex-col">
      <MessageToolbar
        t={t("message_toolbar", { returnObjects: true })}
        isStarred={Boolean(message?.starred)}
        isNotFound={!message}
      />
      {message ? (
        <div className="p-4 pb-0 flex flex-col flex-1 overflow-auto">
          <div className="border-b border-gray-200 dark:border-zinc-800 pb-4">
            <h2 className="text-xl font-bold">{message.subject}</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              {`${t("label.sent_from")}: ${isSent ? t("label.me") : sender}`}
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              {`${t("label.sent_to")}: ${isInbox ? t("label.me") : receiver}`}
            </p>
            <time className="text-xs text-gray-500 dark:text-zinc-400">
              {new Date(message.created_at).toLocaleString()}
            </time>
          </div>
          <div className="flex-1 overflow-scroll no-scrollbar pt-3 pb-32">
            <p>{message.body}</p>
          </div>
        </div>
      ) : (
        <Empty>{t("label.not_found_email")}</Empty>
      )}
    </div>
  );
}
