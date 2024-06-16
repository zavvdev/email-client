"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOLDER_NAMES } from "@/domain/emails/config";
import { Icons } from "@/app/components/icons";
import { cn } from "@/app/styles/utils";

interface Props {
  name: string;
  children: string;
  href: string;
  count: number;
}

const iconByFolderName = {
  [FOLDER_NAMES.inbox]: <Icons.Inbox width="1.2rem" />,
  [FOLDER_NAMES.starred]: <Icons.Star width="1.2rem" />,
  [FOLDER_NAMES.sent]: <Icons.Send width="1.2rem" />,
};

export function Folder({ name, href, children, count }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex justify-between align-middle gap-2 p-2 hover:bg-gray-100 rounded dark:hover:bg-zinc-800 transition-all",
        {
          "bg-gray-100 dark:bg-zinc-800": pathname.includes(href),
        },
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        {iconByFolderName[name]}
        <span>{children}</span>
      </div>
      {count > 0 && (
        <div className="text-xs text-black bg-gray-200 dark:bg-zinc-700 dark:text-white rounded-full p-1 flex items-center justify-center max-w-6 w-6 h-6">
          <span className="truncate">{count}</span>
        </div>
      )}
    </Link>
  );
}
