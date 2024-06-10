import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { SessionData, sessionDataSchema } from "@/lib/auth/entities";
import {
  ENCRYPTION_ALGORITHM,
  EXPIRATION_TIME,
  SECRET,
} from "@/lib/auth/config";

function getSecretKey() {
  if (typeof SECRET === "string") {
    return new TextEncoder().encode(SECRET);
  }
  throw new Error("Invalid SECRET");
}

export function encryptSession(payload: SessionData): Promise<string> {
  return new SignJWT(sessionDataSchema.parse(payload) as unknown as JWTPayload)
    .setProtectedHeader({ alg: ENCRYPTION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(getSecretKey());
}

export async function decryptSession(token: string): Promise<SessionData> {
  if (typeof token === "string") {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: [ENCRYPTION_ALGORITHM],
    });
    return sessionDataSchema.parse(payload);
  }
  throw new Error("Invalid token");
}
