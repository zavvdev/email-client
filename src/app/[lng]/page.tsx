import { redirect } from "next/navigation";
import { PropsWithLocale } from "@/app/types/props";

export default async function Home({ params }: PropsWithLocale) {
  redirect(`/${params.lng}/emails`);
}
