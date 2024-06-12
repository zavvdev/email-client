"use server";

import { login } from "@/domain/auth/login";

export async function loginAction(
  _prevState: {
    errors: Record<string, string> | null;
  },
  formData: FormData,
) {
  try {
    const res = await login(formData);
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
