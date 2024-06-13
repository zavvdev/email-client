import { z as t } from "zod";

export const userSchema = t.object({
  id: t.number(),
  first_name: t.string(),
  last_name: t.string(),
  email: t.string(),
  created_at: t.date(),
});

export const userWithPasswordSchema = userSchema.merge(
  t.object({ password: t.string() }),
);

export type UserWithPassword = t.infer<typeof userWithPasswordSchema>;

export type User = t.infer<typeof userSchema>;
