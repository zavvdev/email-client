"use client";

import * as R from "remeda";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/atoms/button";
import { Icons } from "@/app/components/icons";

interface Props {
  t: Record<string, string>;
  isMessageStarred?: boolean;
}

export function MessageToolbar({ t, isMessageStarred }: Props) {
  const params = useParams();

  return (
    <div className="border-b dark:border-zinc-800 pb-4 flex items-center gap-1">
      <Button
        variant="ghost"
        className="flex items-center gap-2 justify-center"
      >
        <Icons.Pen width="1.1rem" />
        {t.create}
      </Button>
      {R.isNonNullish(isMessageStarred) && (
        <Button variant="ghost" size="icon" className="w-10">
          {isMessageStarred ? (
            <Icons.StarOff width="1.1rem" />
          ) : (
            <Icons.Star width="1.1rem" />
          )}
        </Button>
      )}
      {R.isNonNullish(params.messageId) && (
        <Button variant="ghost" size="icon">
          <Icons.Trash width="1.1rem" />
        </Button>
      )}
    </div>
  );
}
