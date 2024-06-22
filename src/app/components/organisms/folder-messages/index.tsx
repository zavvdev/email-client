import { Empty } from "@/app/components/atoms/empty";
import { getSession } from "@/domain/auth/session";
import { FOLDER_NAMES } from "@/domain/emails/config";
import { getI18n } from "@/app/i18n";
import { getMessagesByFolder } from "@/domain/emails";
import { Message } from "./message";
import { Skeleton } from "./skeleton";

interface Props {
  name: string;
  lng: string;
}

export default async function FolderMessages({ name, lng }: Props) {
  const session = await getSession();
  const { t } = await getI18n(lng, "common");
  const messages = await getMessagesByFolder(name);

  const getName = (
    folderName: string,
    sender: {
      id: number;
      firstName: string;
      lastName: string;
    },
    recipient: {
      firstName: string | null;
      lastName: string | null;
      email: string;
    },
  ) => {
    const receiver = recipient.firstName
      ? `${recipient.firstName} ${recipient.lastName}`
      : recipient.email;

    switch (folderName) {
      case FOLDER_NAMES.inbox:
        return `${sender.firstName} ${sender.lastName}`;

      case FOLDER_NAMES.sent:
        return `${t("label.sent_to")}: ${receiver}`;

      case FOLDER_NAMES.starred:
        if (session!.user_id === sender.id) {
          return `${t("label.me")}, ${receiver}`;
        }
        return `${sender.firstName} ${sender.lastName}, ${t("label.me")}`;

      default:
        throw new Error("Invalid folder name");
    }
  };

  return (
    <div className="pb-24">
      {messages.length === 0 ? (
        <Empty>{t("label.no_messages")}</Empty>
      ) : (
        messages.map((m, i) => (
          <Message
            key={m.id}
            id={m.id}
            name={getName(
              name,
              {
                id: m.sender_id,
                firstName: m.sender_first_name,
                lastName: m.sender_last_name,
              },
              {
                firstName: m.recipient_first_name,
                lastName: m.recipient_last_name,
                email: m.recipient_email,
              },
            )}
            subject={m.subject}
            body={m.body}
            date={new Date(m.created_at).toLocaleDateString()}
            href={`/${lng}/folder/${name}/${m.id}`}
            divide={i !== messages.length - 1}
          />
        ))
      )}
    </div>
  );
}

FolderMessages.Skeleton = Skeleton;
