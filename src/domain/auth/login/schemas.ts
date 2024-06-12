import { z as t } from "zod";

export const formDataSchema = t.object({
  email: t.string({ message: "required" }).email("invalid"),
  password: t.string({ message: "required" }),
});
