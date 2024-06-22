"use client";

import { useParams } from "next/navigation";
import { useFormState } from "react-dom";
import * as R from "remeda";
import { parseAsBoolean, useQueryState } from "nuqs";
import { MESSAGE_BODY_MAX_LENGTH } from "@/domain/emails/config";
import { Button } from "@/app/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/atoms/dialog";
import { Input } from "@/app/components/atoms/input";
import { SubmitButton } from "@/app/components/molecules/submit-button";
import { Textarea } from "@/app/components/atoms/textarea";
import { Icons } from "@/app/components/icons";
import { FormErrors } from "@/app/components/atoms/form-errors";
import { sendMessageAction } from "./actions";

interface Props {
  t: Record<string, any>;
}

export function ModalCompose({ t }: Props) {
  const params = useParams();
  const [isOpen, setIsOpen] = useQueryState<boolean>("new", parseAsBoolean);

  const [state, action] = useFormState(sendMessageAction, {
    errors: null,
  });

  const extractErrors = (errors: Record<string, string>) =>
    R.pipe(
      errors,
      R.entries(),
      R.map(([k, v]) => t.form.errors[k][v]),
    );

  return (
    <Dialog open={Boolean(isOpen)} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-center"
        >
          <Icons.Pen width="1.1rem" />
          {t.create}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="max-h-[90%] overflow-y-auto no-scrollbar"
      >
        <DialogHeader>
          <DialogTitle>{t.form.label}</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-3">
          <Input
            required
            placeholder={t.form.recipient}
            name="recipient_email"
            type="email"
          />
          <Input
            required
            placeholder={t.form.subject}
            name="subject"
            type="text"
          />
          <Textarea
            required
            name="message"
            placeholder={t.form.message}
            className="max-h-[350px] h-60"
            maxLength={MESSAGE_BODY_MAX_LENGTH}
          />
          <input type="hidden" name="lng" value={params.lng} />
          <SubmitButton>{t.form.submit}</SubmitButton>
          {Boolean(state.errors) && (
            <FormErrors
              center
              errors={extractErrors(state.errors as Record<string, string>)}
            />
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
