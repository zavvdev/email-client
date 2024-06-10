"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/ui/atoms/button";
import { LOCALES } from "@/lib/i18n/config";
import { switchPathnameLang } from "@/lib/i18n/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/atoms/dropdown-menu";
import { Icons } from "../icons";

export function LangSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(LOCALES).map((l) => (
          <DropdownMenuItem
            key={l}
            className="uppercase"
            onClick={() => router.push(switchPathnameLang(pathname, l))}
          >
            {l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
