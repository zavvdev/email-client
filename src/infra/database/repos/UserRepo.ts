import "server-only";

import * as R from "remeda";
import {
  User,
  UserWithPassword,
  userWithPasswordSchema,
} from "@/entities/User";
import { dbq } from "@/infra/database/connect";

class UserRepo {
  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPassword | null> {
    const result = await dbq<User[]>(
      `SELECT id, first_name, last_name, email, password, created_at FROM users WHERE email = ?`,
      [email],
    );

    if (result?.[0]) {
      return userWithPasswordSchema.parse(result[0]);
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const result = await this.findByEmailWithPassword(email);
    return result ? R.omit(result, ["password"]) : null;
  }

  public async create(
    user: Omit<UserWithPassword, "id" | "created_at">,
  ): Promise<Pick<User, "id">> {
    const validUser = userWithPasswordSchema
      .omit({ id: true, created_at: true })
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

    return userWithPasswordSchema
      .pick({ id: true })
      .parse({ id: result.insertId });
  }
}

export const userRepo = new UserRepo();
