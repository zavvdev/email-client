import "server-only";

import { z as t } from "zod";
import { dbq } from "@/infra/database/connect";
import { Message, messageSchema } from "@/entities/Message";

const emailSelectQuery = (where: string) => `
SELECT 
  e.*, 
  ur.first_name AS recipient_first_name, 
  ur.last_name AS recipient_last_name,
  us.first_name AS sender_first_name,
  us.last_name AS sender_last_name,
  IF(s.user_id = ? AND e.id = s.email_id, TRUE, FALSE) AS starred
FROM emails AS e 
LEFT JOIN users AS ur ON e.recipient_email = ur.email
INNER JOIN users AS us ON e.sender_id = us.id
LEFT JOIN starred AS s ON s.email_id = e.id
WHERE ${where}
`;

const starredSelectQuery = () => `
SELECT 
  e.*, 
  ur.first_name AS recipient_first_name, 
  ur.last_name AS recipient_last_name,
  us.first_name AS sender_first_name,
  us.last_name AS sender_last_name,
  IF(s.user_id = ? AND e.id = s.email_id, TRUE, FALSE) AS starred
FROM starred AS s 
INNER JOIN emails AS e ON s.email_id = e.id 
LEFT JOIN users AS ur ON e.recipient_email = ur.email
INNER JOIN users AS us ON e.sender_id = us.id
WHERE s.user_id = ?`;

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

  public async getInbox(userId: number, userEmail: string): Promise<Message[]> {
    const result = await dbq<Message[]>(
      emailSelectQuery(`recipient_email = ?`),
      [userId, userEmail],
    );

    return t.array(messageSchema).parse(result);
  }

  public async getSent(userId: number): Promise<Message[]> {
    const result = await dbq<Message[]>(emailSelectQuery(`sender_id = ?`), [
      userId,
      userId,
    ]);

    return t.array(messageSchema).parse(result);
  }

  public async getStarred(userId: number): Promise<Message[]> {
    const result = await dbq<Message[]>(starredSelectQuery(), [userId, userId]);
    return t.array(messageSchema).parse(result);
  }

  public async getOne(userId: number, id: number): Promise<Message | null> {
    const result = await dbq<Message[]>(emailSelectQuery("e.id = ?"), [
      userId,
      id,
    ]);

    return result.length ? messageSchema.parse(result[0]) : null;
  }
}

export const emailsRepo = new EmailsRepo();