import { z as t } from "zod";

export const messageSchema = t.object({
  id: t.number(),
  subject: t.string(),
  body: t.string(),
  sender_id: t.number(),
  sender_first_name: t.string(),
  sender_last_name: t.string(),
  recipient_email: t.string(),
  recipient_first_name: t.string().nullable(),
  recipient_last_name: t.string().nullable(),
  created_at: t.date(),
});

export type Message = t.infer<typeof messageSchema>;
