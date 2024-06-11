import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/domain/auth/config";
import { SessionData, sessionDataSchema } from "@/domain/auth/entities";
import { decryptToken, encryptToken } from "@/infra/encryption/jwt";

export async function getSession(): Promise<SessionData | null> {
  const token = cookies().get(TOKEN_COOKIE_NAME)?.value;

  if (typeof token === "string") {
    return sessionDataSchema.parse(decryptToken(token));
  }

  return null;
}

export async function setSession(session: SessionData): Promise<void> {
  sessionDataSchema.parse(session);

  const expires = new Date(Date.now() + 10 * 60 * 1000);
  const sessionToken = await encryptToken(session, "10 min from now");

  cookies().set(TOKEN_COOKIE_NAME, sessionToken, {
    expires,
    httpOnly: true,
  });
}
