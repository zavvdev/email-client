import "server-only";

import { emailsRepo } from "@/infra/database/repos/EmailsRepo";
import { getSession } from "@/domain/auth/session";
import { FOLDER_NAMES } from "@/domain/emails/config";
import { Message } from "@/entities/Message";

export async function getMessagesCountByFolder() {
  const session = await getSession();

  const amounts = await emailsRepo.getAmountInFolders({
    userId: session!.user_id,
    userEmail: session!.user_email,
  });

  return [
    { name: FOLDER_NAMES.inbox, amount: amounts.inbox_amount },
    { name: FOLDER_NAMES.sent, amount: amounts.sent_amount },
    { name: FOLDER_NAMES.starred, amount: amounts.starred_amount },
  ];
}

export async function getMessagesByFolder(folder: string): Promise<Message[]> {
  const session = await getSession();

  switch (folder) {
    case FOLDER_NAMES.inbox:
      return emailsRepo.getInbox(session!.user_id, session!.user_email);
    case FOLDER_NAMES.sent:
      return emailsRepo.getSent(session!.user_id);
    case FOLDER_NAMES.starred:
      return emailsRepo.getStarred(session!.user_id);
    default:
      return [];
  }
}
