import { z as t } from "zod";
import { MESSAGE_BODY_MAX_LENGTH } from "./config";

export const sendMessageSchema = t.object({
  recipient_email: t.string().email(),
  subject: t.string(),
  message: t.string().max(MESSAGE_BODY_MAX_LENGTH),
});
