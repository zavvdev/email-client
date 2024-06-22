"use client";

import * as R from "remeda";
import { useParams } from "next/navigation";
import { ModalCompose } from "./modal-compose";
import { ModalDelete } from "./modal-delete";
import { MarkMessage } from "./mark-message";

interface Props {
  t: Record<string, any>;
  isStarred?: boolean;
  isNotFound?: boolean;
}

export function MessageToolbar({ t, isStarred, isNotFound }: Props) {
  const params = useParams();

  return (
    <div className="border-b dark:border-zinc-800 pb-4 flex items-center gap-1">
      <ModalCompose t={t.compose} />
      {!isNotFound && (
        <>
          {R.isNonNullish(isStarred) && <MarkMessage isStarred={isStarred} />}
          {R.isNonNullish(params.messageId) && <ModalDelete t={t.delete} />}
        </>
      )}
    </div>
  );
}
