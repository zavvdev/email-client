"use client";

import { useParams } from "next/navigation";
import { Button } from "@/app/components/atoms/button";
import { Icons } from "@/app/components/icons";
import { markMessageAction } from "./actions";

interface Props {
  isStarred: boolean;
}

export function MarkMessage({ isStarred }: Props) {
  const params = useParams();

  return (
    <form action={markMessageAction}>
      <input type="hidden" name="id" value={params.messageId} />
      <Button type="submit" variant="ghost" size="icon" className="w-10">
        {isStarred ? (
          <Icons.StarOff width="1.1rem" />
        ) : (
          <Icons.Star width="1.1rem" />
        )}
      </Button>
    </form>
  );
}
