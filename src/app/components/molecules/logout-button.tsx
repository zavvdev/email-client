import { redirect } from "next/navigation";
import { Button } from "@/app/components/atoms/button";
import { Icons } from "@/app/components/icons";
import { destroySession } from "@/domain/auth/session";

interface Props {
  lng: string;
}

export function LogoutButton({ lng }: Props) {
  return (
    <form
      action={async () => {
        "use server";
        destroySession();
        redirect(`/${lng}`);
      }}
    >
      <Button type="submit" variant="outline" size="icon">
        <Icons.LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </form>
  );
}
