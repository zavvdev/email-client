import { SafeParseError } from "zod";

export function extractSchemaErrors<T>(parsed: SafeParseError<T>) {
  return parsed.error.errors.reduce(
    (acc, error) => ({ ...acc, [error.path[0]]: error.message }),
    {},
  );
}
