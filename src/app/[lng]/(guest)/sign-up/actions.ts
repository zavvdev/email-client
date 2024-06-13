"use server";

import { redirect } from "next/navigation";
import { signUp } from "@/domain/auth/sign-up";
import { appUrl } from "@/app/routes";

export async function signUpAction(
  _prevState: {
    errors: Record<string, string> | null;
  },
  formData: FormData,
) {
  try {
    await signUp(formData);
  } catch (e: unknown) {
    return {
      errors: (e as Error).cause as Record<string, string> | null,
    };
  } finally {
    redirect(appUrl("/emails"));
  }
}
