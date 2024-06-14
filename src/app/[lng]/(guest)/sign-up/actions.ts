"use server";

import { redirect } from "next/navigation";
import { signUp } from "@/domain/auth/sign-up";
import { appUrl } from "@/app/routes";

export async function signUpAction(_prevState: any, formData: FormData) {
  const result = await signUp(formData);

  if (result.errors) {
    return result;
  }

  redirect(appUrl("/emails"));

  return { errors: null };
}
