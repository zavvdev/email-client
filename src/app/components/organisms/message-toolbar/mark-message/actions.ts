"use server";

import { revalidatePath } from "next/cache";
import { markMessage } from "@/domain/emails";

export async function markMessageAction(formData: FormData): Promise<void> {
  const res = await markMessage(formData);

  if (res) {
    revalidatePath("/");
  }
}
