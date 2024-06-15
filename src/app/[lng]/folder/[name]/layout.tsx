import { PropsWithChildren } from "react";
import { Sidebar } from "@/app/components/organisms/sidebar";

interface Props extends PropsWithChildren {
  params: { name: string; lng: string };
}

export default function FolderLayout({ children, params }: Props) {
  return (
    <div className="h-screen flex justify-between gap-2 px-4 pt-4">
      <div className="flex-1 max-w-[300px] p-2 border-r dark:border-r-zinc-700">
        <Sidebar lng={params.lng} />
      </div>
      <div className="flex-1 max-w-[300px] overflow-auto p-2 no-scrollbar border-r dark:border-zinc-700">
        Folder {params.name}
      </div>
      <div className="flex-[2] p-2">{children}</div>
    </div>
  );
}
