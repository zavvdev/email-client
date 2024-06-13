"use server";

import { redirect } from "next/navigation";
import { appUrl } from "@/app/routes";
import { login } from "@/domain/auth/login";

export async function loginAction(
  _prevState: {
    errors: Record<string, string> | null;
  },
  formData: FormData,
) {
  try {
    await login(formData);
    // doesn't work. Need to fix. Works in finally for some reason
    redirect(appUrl("/emails"));
  } catch (e: unknown) {
    return {
      errors: (e as Error).cause as Record<string, string> | null,
    };
  }
}
