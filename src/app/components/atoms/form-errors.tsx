"use client";

import { cn } from "@/app/styles/utils";

interface Props {
  errors: string[];
  center?: boolean;
}

export function FormErrors({ errors, center }: Props) {
  return (
    <>
      {errors.map((error, index) => (
        <p
          key={`${error}-${index}`}
          className={cn("text-red-500 text-sm", {
            "text-center": center,
          })}
        >
          {error}
        </p>
      ))}
    </>
  );
}
