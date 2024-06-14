"use server";

import { redirect } from "next/navigation";
import { appUrl } from "@/app/routes";
import { login } from "@/domain/auth/login";

export async function loginAction(_prevState: any, formData: FormData) {
  const result = await login(formData);

  if (result.errors) {
    return result;
  }

  redirect(appUrl("/emails"));

  return { errors: null };
}
