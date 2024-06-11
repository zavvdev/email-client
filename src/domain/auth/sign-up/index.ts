import { extractSchemaFormErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/sign-up/schemas";

export async function signUp(formData: FormData) {
  const validatedFields = await formDataSchema.safeParseAsync({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (validatedFields.error) {
    throw new Error("Validation Error", {
      cause: extractSchemaFormErrors(validatedFields),
    });
  }

  return validatedFields.data;
}
