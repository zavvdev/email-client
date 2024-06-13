"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import * as R from "remeda";
import { FormErrors } from "@/app/components/atoms/form-errors";
import { Input } from "@/app/components/atoms/input";
import { SubmitButton } from "./submit-button";
import { loginAction } from "./actions";

interface Props {
  lng: string;
  t: {
    form: Record<string, any>;
    additional: Record<string, string>;
  };
}

export function Form({ lng, t }: Props) {
  const [state, action] = useFormState(loginAction, {
    errors: null,
  });

  const extractErrors = (errors: Record<string, string>) =>
    R.pipe(
      errors,
      R.entries(),
      R.map(([k, v]) => t.form.errors[k][v]),
    );

  return (
    <form
      className="flex flex-col gap-2 w-[320px] max-sm:w-full self-center"
      action={action}
    >
      <Input
        required
        name="email"
        type="email"
        autoComplete="email"
        placeholder={t.form.email}
      />
      <Input
        required
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder={t.form.password}
      />
      <SubmitButton>{t.form.submit}</SubmitButton>
      <div className="text-center">
        <span className="opacity-55">{t.additional.signup_text} </span>
        <Link
          href={`/${lng}/sign-up`}
          className="text-black dark:text-white hover:underline"
        >
          {t.additional.signup}
        </Link>
      </div>
      {Boolean(state.errors) && (
        <FormErrors
          center
          errors={extractErrors(state.errors as Record<string, string>)}
        />
      )}
    </form>
  );
}
