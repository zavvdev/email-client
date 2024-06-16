"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/styles/utils";

interface Props {
  id: number;
  name: string;
  subject: string;
  body: string;
  date: string;
  href: string;
  divide?: boolean;
}

export function Message({ name, subject, body, date, href, divide }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={href}
        className={cn(
          "flex items-start justify-between gap-2 p-4 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer rounded-lg",
          {
            "bg-gray-100 dark:bg-zinc-800": pathname.includes(href),
          },
        )}
      >
        <div className="flex flex-col gap-1 truncate">
          <h3 className="text-base font-bold truncate overflow-ellipsis">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 truncate overflow-ellipsis">
            {subject}
          </p>
          <p className="text-sm truncate overflow-ellipsis">{body}</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-zinc-500 flex justify-end self-center">
          {date}
        </div>
      </Link>
      {divide && <div className="border-b dark:border-zinc-800 w-full my-2" />}
    </>
  );
}
