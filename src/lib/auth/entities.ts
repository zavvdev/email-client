import { z as t } from "zod";

export const sessionDataSchema = t.object({
  id: t.number(),
  exp: t.number(),
});

export type SessionData = t.infer<typeof sessionDataSchema>;
