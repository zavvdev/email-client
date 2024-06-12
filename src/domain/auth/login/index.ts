import "server-only";

import { extractSchemaErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/login/schemas";

export async function login(formData: FormData) {
  const validatedFields = await formDataSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (validatedFields.error) {
    throw new Error("Validation Error", {
      cause: extractSchemaErrors(validatedFields),
    });
  }

  return validatedFields.data;
}
