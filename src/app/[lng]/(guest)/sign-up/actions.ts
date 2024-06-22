"use server";

import { redirect } from "next/navigation";
import { signUp } from "@/domain/auth/sign-up";
import { getStartRoute } from "@/app/routes";

export async function signUpAction(_prevState: any, formData: FormData) {
  const result = await signUp(formData);

  if (result.errors) {
    return result;
  }

  redirect(getStartRoute(formData.get("lng") as string));

  return { errors: null };
}
