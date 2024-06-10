import bcrypt from "bcrypt";
import { PASSWORD_HASH_SALT_ROUNDS } from "@/lib/auth/config";

export function hashPassword(input: string): Promise<string> {
  return bcrypt.hash(input, PASSWORD_HASH_SALT_ROUNDS);
}

export function comparePasswords(
  target: string,
  hashedTarget: string,
): Promise<boolean> {
  return bcrypt.compare(target, hashedTarget);
}
