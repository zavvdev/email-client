"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/components/atoms/button";

export function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {children}
      {pending && "..."}
    </Button>
  );
}
