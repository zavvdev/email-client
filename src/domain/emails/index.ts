import "server-only";

import { emailsRepo } from "@/infra/database/repos/EmailsRepo";
import { getSession } from "@/domain/auth/session";
import { FOLDER_NAMES } from "@/domain/emails/config";
import { Message } from "@/entities/Message";
import { sendMessageSchema } from "./schemas";
import { extractSchemaErrors } from "../utils";

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

export async function getMessage(id: number): Promise<Message | null> {
  const session = await getSession();
  return emailsRepo.getOne(session!.user_id, id);
}

export async function sendMessage(formData: FormData): Promise<{
  messageId?: number;
  errors: Record<string, string> | null;
}> {
  try {
    const session = await getSession();

    const validatedFields = await sendMessageSchema.safeParseAsync({
      recipient_email: formData.get("recipient_email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    if (validatedFields.error) {
      return {
        errors: extractSchemaErrors(validatedFields),
      };
    }

    const id = await emailsRepo.createOne({
      userId: session!.user_id,
      recipientEmail: validatedFields.data.recipient_email,
      subject: validatedFields.data.subject,
      message: validatedFields.data.message,
    });

    return { errors: null, messageId: id };
  } catch {
    return {
      errors: {
        process: "unexpected",
      },
    };
  }
}
