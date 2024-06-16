import { z as t } from "zod";

export const sessionDataSchema = t.object({
  user_id: t.number(),
  user_email: t.string(),
});

export type SessionData = t.infer<typeof sessionDataSchema>;
