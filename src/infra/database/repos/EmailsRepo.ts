import "server-only";

import { z as t } from "zod";
import { dbq } from "@/infra/database/connect";

class EmailsRepo {
  public async getAmountInFolders({
    userId,
    userEmail,
  }: {
    userId: number;
    userEmail: string;
  }) {
    const schema = t.object({
      inbox_amount: t.number(),
      sent_amount: t.number(),
      starred_amount: t.number(),
    });

    const inbox_result = await dbq<{ amount: number }[]>(
      "SELECT COUNT(*) AS amount FROM emails WHERE recipient_email = ?",
      [userEmail],
    );

    const sent_result = await dbq<{ amount: number }[]>(
      "SELECT COUNT(*) AS amount FROM emails WHERE sender_id = ?",
      [userId],
    );

    const starred_result = await dbq<{ amount: number }[]>(
      "SELECT COUNT(*) AS amount FROM starred WHERE user_id = ?",
      [userId],
    );

    return schema.parse({
      inbox_amount: inbox_result[0].amount,
      sent_amount: sent_result[0].amount,
      starred_amount: starred_result[0].amount,
    });
  }
}

export const emailsRepo = new EmailsRepo();
