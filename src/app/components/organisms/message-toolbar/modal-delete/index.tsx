"use client";

import { useParams } from "next/navigation";
import { useFormState } from "react-dom";
import { Button } from "@/app/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/atoms/dialog";
import { SubmitButton } from "@/app/components/molecules/submit-button";
import { Icons } from "@/app/components/icons";
import { FormErrors } from "@/app/components/atoms/form-errors";
import { deleteMessageAction } from "./actions";

interface Props {
  t: Record<string, any>;
}

export function ModalDelete({ t }: Props) {
  const params = useParams();
  const [isError, action] = useFormState(deleteMessageAction, false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.Trash width="1.1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.confirm}</DialogTitle>
          <DialogDescription>{t.confirm_description}</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-3">
          <input type="hidden" name="id" value={params.messageId} />
          <div className="flex">
            <SubmitButton>{t.submit}</SubmitButton>
          </div>
          {isError && <FormErrors center errors={[t.error]} />}
        </form>
      </DialogContent>
    </Dialog>
  );
}
