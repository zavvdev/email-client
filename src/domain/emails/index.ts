import "server-only";

import { emailsRepo } from "@/infra/database/repos/EmailsRepo";
import { getSession } from "@/domain/auth/session";
import { FOLDER_NAMES } from "@/domain/emails/config";

export async function getEmailsCountByFolder() {
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
