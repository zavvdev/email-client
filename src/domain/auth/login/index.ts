import "server-only";

import { extractSchemaErrors } from "@/domain/utils";
import { formDataSchema } from "@/domain/auth/login/schemas";
import { setSession } from "@/domain/auth/session";
import { userRepo } from "@/infra/database/repos/UserRepo";
import { comparePasswords } from "@/infra/encryption/password";

const notFoundError = () => {
  return {
    errors: {
      process: "not_found",
    },
  };
};

interface ReturnType {
  errors: Record<string, string> | null;
}

export async function login(formData: FormData): Promise<ReturnType> {
  try {
    const validatedFields = await formDataSchema.safeParseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (validatedFields.error) {
      return {
        errors: extractSchemaErrors(validatedFields),
      };
    }

    const user = await userRepo.findByEmailWithPassword(
      validatedFields.data.email,
    );

    if (!user) {
      return notFoundError();
    }

    const passwordMatch = await comparePasswords(
      validatedFields.data.password,
      user.password,
    );

    if (!passwordMatch) {
      return notFoundError();
    }

    setSession({ user_id: user.id });

    return { errors: null };
  } catch {
    return {
      errors: {
        process: "unexpected",
      },
    };
  }
}
