import { z as t } from "zod";

export const userSchema = t.object({
  id: t.number(),
  first_name: t.string(),
  last_name: t.string(),
  email: t.string(),
  created_at: t.date(),
});

export type User = t.infer<typeof userSchema>;
