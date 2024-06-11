import { z as t } from "zod";

export const sessionDataSchema = t.object({
  user_id: t.number(),
});

export type SessionData = t.infer<typeof sessionDataSchema>;
