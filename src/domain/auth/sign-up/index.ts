import "server-only";

import { extractSchemaErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/sign-up/schemas";
import { userRepo } from "@/infra/database/repos/UserRepo";
import { hashPassword } from "@/infra/encryption/password";
import { setSession } from "../session";

interface ReturnType {
  errors: Record<string, string> | null;
}

export async function signUp(formData: FormData): Promise<ReturnType> {
  try {
    const validatedFields = await formDataSchema.safeParseAsync({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });

    if (validatedFields.error) {
      return {
        errors: extractSchemaErrors(validatedFields),
      };
    }

    const user = await userRepo.findByEmail(validatedFields.data.email);

    if (user) {
      return {
        errors: {
          process: "user_exists",
        },
      };
    }

    const hashedPassword = await hashPassword(validatedFields.data.password);

    const { id } = await userRepo.create({
      first_name: validatedFields.data.first_name,
      last_name: validatedFields.data.last_name,
      email: validatedFields.data.email,
      password: hashedPassword,
    });

    setSession({ user_id: id, user_email: validatedFields.data.email });

    return { errors: null };
  } catch {
    return {
      errors: {
        process: "unexpected",
      },
    };
  }
}
