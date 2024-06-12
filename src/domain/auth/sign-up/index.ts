import "server-only";

import { extractSchemaErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/sign-up/schemas";
import { userRepo } from "@/infra/database/repos/UserRepo";

export async function signUp(formData: FormData) {
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

    const user = await userRepo.selectByEmail(validatedFields.data.email);

    if (user) {
      throw new Error("User already exists", {
        cause: {
          process: "user_exists",
        },
      });
    }

    // hash password, create user, set session, return user
  } catch (e: any) {
    throw new Error("Sign Up Error", {
      cause: e.cause || {
        process: "unexpected",
      },
    });
  }
}
