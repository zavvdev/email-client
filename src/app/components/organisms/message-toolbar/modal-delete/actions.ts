"use server";

import { revalidatePath } from "next/cache";
import { deleteMessage } from "@/domain/emails";

export async function deleteMessageAction(
  _prevState: any,
  formData: FormData,
): Promise<boolean> {
  const result = await deleteMessage(formData);

  if (!result) {
    return false;
  }

  revalidatePath("/");

  return true;
}
