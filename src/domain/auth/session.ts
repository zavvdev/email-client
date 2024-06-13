import "server-only";

import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/domain/auth/config";
import { SessionData, sessionDataSchema } from "@/domain/auth/entities";
import { decryptToken, encryptToken } from "@/infra/encryption/jwt";
import { EXPIRATION_DURATION } from "@/infra/encryption/config";

export async function getSession(): Promise<SessionData | null> {
  const token = cookies().get(TOKEN_COOKIE_NAME)?.value;

  if (typeof token === "string") {
    const sessionData = await decryptToken(token);
    return sessionDataSchema.parse(sessionData);
  }

  return null;
}

export async function setSession(session: SessionData): Promise<void> {
  sessionDataSchema.parse(session);

  const expires = new Date(Date.now() + EXPIRATION_DURATION);
  const sessionToken = await encryptToken(session);

  cookies().set(TOKEN_COOKIE_NAME, sessionToken, {
    expires,
    httpOnly: true,
  });
}
