import "server-only";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import {
  ENCRYPTION_ALGORITHM,
  EXPIRATION_TIME,
  JWT_SECRET,
} from "@/infra/encryption/config";

function getSecretKey() {
  if (typeof JWT_SECRET === "string") {
    return new TextEncoder().encode(JWT_SECRET);
  }
  throw new Error("Invalid SECRET");
}

export function encryptToken<T>(data: T, exp?: string): Promise<string> {
  return new SignJWT(data as unknown as JWTPayload)
    .setProtectedHeader({ alg: ENCRYPTION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(exp || EXPIRATION_TIME)
    .sign(getSecretKey());
}

export async function decryptToken<T>(token: string): Promise<T> {
  if (typeof token === "string") {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: [ENCRYPTION_ALGORITHM],
    });
    return payload as T;
  }

  throw new Error("Invalid token");
}
