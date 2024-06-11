"use server";

import { signUp } from "@/domain/auth/sign-up";

export async function signUpAction(
  _prevState: {
    errors: Record<string, string> | null;
  },
  formData: FormData,
) {
  try {
    const res = await signUp(formData);
    console.log(res);

    return {
      errors: null,
    };
  } catch (e: unknown) {
    return {
      errors: (e as Error).cause as Record<string, string> | null,
    };
  }
}
