import { SafeParseError } from "zod";

export function extractSchemaFormErrors<T>(validatedFields: SafeParseError<T>) {
  return validatedFields.error.errors.reduce(
    (acc, error) => ({ ...acc, [error.path[0]]: error.message }),
    {},
  );
}
