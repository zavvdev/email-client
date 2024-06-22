import { z as t } from "zod";
import { MESSAGE_BODY_MAX_LENGTH } from "./config";

export const sendMessageSchema = t.object({
  recipient_email: t.string({ message: "required" }).email("invalid"),
  subject: t.string({ message: "required" }).min(1, "required"),
  message: t
    .string({ message: "required" })
    .min(1, "required")
    .max(MESSAGE_BODY_MAX_LENGTH, "max"),
});
