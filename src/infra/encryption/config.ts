export const ENCRYPTION_ALGORITHM = "HS256";
export const EXPIRATION_TIME = "20 min from now";
export const EXPIRATION_DURATION = 20 * 60 * 1000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PASSWORD_HASH_SALT_ROUNDS = 10;
