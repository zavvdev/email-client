"use client";

import { useFormState } from "react-dom";
import * as R from "remeda";
import Link from "next/link";
import { Input } from "@/app/components/atoms/input";
import { FormErrors } from "@/app/components/atoms/form-errors";
import { signUpAction } from "./actions";
import { SubmitButton } from "./submit-button";

interface Props {
  lng: string;
  t: {
    form: Record<string, any>;
    additional: Record<string, string>;
  };
}

export function Form({ lng, t }: Props) {
  const [state, action] = useFormState(signUpAction, {
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
      <div className="flex gap-2">
        <Input required name="first_name" placeholder={t.form.first_name} />
        <Input required name="last_name" placeholder={t.form.last_name} />
      </div>
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
      <Input
        required
        name="confirm_password"
        type="password"
        autoComplete="new-password"
        placeholder={t.form.confirm_password}
      />
      <input type="hidden" name="lng" value={lng} />
      <SubmitButton>{t.form.submit}</SubmitButton>
      <div className="text-center">
        <span className="opacity-55">{t.additional.login_text} </span>
        <Link
          href={`/${lng}/login`}
          className="text-black dark:text-white hover:underline"
        >
          {t.additional.login}
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
