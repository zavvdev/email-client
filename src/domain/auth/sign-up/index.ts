import "server-only";

import { extractSchemaErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/sign-up/schemas";
import { userRepo } from "@/infra/database/repos/UserRepo";
import { hashPassword } from "@/infra/encryption/password";
import { setSession } from "../session";

export async function signUp(formData: FormData): Promise<void> {
  try {
    const validatedFields = await formDataSchema.safeParseAsync({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });

    if (validatedFields.error) {
      throw new Error("Validation Error", {
        cause: extractSchemaErrors(validatedFields),
      });
    }

    const user = await userRepo.findByEmail(validatedFields.data.email);

    if (user) {
      throw new Error("User already exists", {
        cause: {
          process: "user_exists",
        },
      });
    }

    const hashedPassword = await hashPassword(validatedFields.data.password);

    const { id } = await userRepo.create({
      first_name: validatedFields.data.first_name,
      last_name: validatedFields.data.last_name,
      email: validatedFields.data.email,
      password: hashedPassword,
    });

    setSession({ user_id: id });
  } catch (e: any) {
    throw new Error("Sign Up Error", {
      cause: e.cause || {
        process: "unexpected",
      },
    });
  }
}
