import "server-only";

import { User, userSchema } from "@/entities/User";
import { dbq } from "@/infra/database/connect";

class UserRepo {
  public async selectByEmail(email: string): Promise<User | null> {
    const result = await dbq<User[]>(
      `SELECT id, first_name, last_name, email, created_at FROM users WHERE email = ?`,
      [email],
    );

    if (result?.[0]) {
      return userSchema.parse(result[0]);
    }

    return null;
  }
}

export const userRepo = new UserRepo();
