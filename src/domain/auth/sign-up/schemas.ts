import { z as t } from "zod";
import { PASSWORD_MIN_LENGTH } from "./config";

export const formDataSchema = t
  .object({
    first_name: t.string({ message: "required" }),

    last_name: t.string({ message: "required" }),
    email: t.string({ message: "required" }).email("invalid"),

    password: t
      .string({ message: "required" })
      .min(PASSWORD_MIN_LENGTH, "min_length"),

    confirm_password: t
      .string({ message: "required" })
      .min(PASSWORD_MIN_LENGTH, "min_length"),
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    message: "match",
    path: ["confirm_password"],
  });
