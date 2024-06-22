"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/atoms/button";
import { LOCALES } from "@/app/i18n/config";
import { switchPathnameLang } from "@/app/i18n/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/atoms/dropdown-menu";
import { Icons } from "@/app/components/icons";

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
