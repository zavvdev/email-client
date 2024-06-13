import "server-only";

import { extractSchemaErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/login/schemas";
import { setSession } from "@/domain/auth/session";
import { userRepo } from "@/infra/database/repos/UserRepo";
import { comparePasswords } from "@/infra/encryption/password";

const notFoundError = () => {
  return new Error("User not found", {
    cause: {
      process: "not_found",
    },
  });
};

export async function login(formData: FormData) {
  try {
    const validatedFields = await formDataSchema.safeParseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (validatedFields.error) {
      throw new Error("Validation Error", {
        cause: extractSchemaErrors(validatedFields),
      });
    }

    const user = await userRepo.findByEmailWithPassword(
      validatedFields.data.email,
    );

    if (!user) {
      throw notFoundError();
    }

    const passwordMatch = await comparePasswords(
      validatedFields.data.password,
      user.password,
    );

    if (!passwordMatch) {
      throw notFoundError();
    }

    setSession({ user_id: user.id });
  } catch (e: any) {
    throw new Error("Login Error", {
      cause: e.cause || {
        process: "unexpected",
      },
    });
  }
}
