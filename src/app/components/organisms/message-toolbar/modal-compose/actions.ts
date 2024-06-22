"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendMessage } from "@/domain/emails";

export async function sendMessageAction(_prevState: any, formData: FormData) {
  const lng = formData.get("lng") as string;
  const result = await sendMessage(formData);

  if (result.errors) {
    return result;
  }

  revalidatePath("/");
  redirect(`/${lng}/folder/sent/${result.messageId}?new=false`);

  return { errors: null };
}
