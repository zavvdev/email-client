import "server-only";

import { z as t } from "zod";
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

  public async create(
    user: Omit<User, "id" | "created_at"> & { password: string },
  ): Promise<Pick<User, "id">> {
    const validUser = userSchema
      .omit({ id: true, created_at: true })
      .merge(t.object({ password: t.string() }))
      .parse(user);

    const result = await dbq<{ insertId: number }>(
      `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
      [
        validUser.first_name,
        validUser.last_name,
        validUser.email,
        validUser.password,
      ],
    );

    return { id: result.insertId };
  }
}

export const userRepo = new UserRepo();
