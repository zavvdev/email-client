import { redirect } from "next/navigation";
import { PropsWithLocale } from "@/app/types/props";
import { getStartRoute } from "@/app/routes";

export default function FolderPage({ params }: PropsWithLocale) {
  return redirect(getStartRoute(params.lng));
}
