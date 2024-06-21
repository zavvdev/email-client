import { PropsWithChildren, Suspense } from "react";
import { Sidebar } from "@/app/components/organisms/sidebar";
import FolderMessages from "@/app/components/organisms/folder-messages";

interface Props extends PropsWithChildren {
  params: { name: string; lng: string };
}

export default function FolderLayout({ children, params }: Props) {
  return (
    <div className="h-screen flex justify-between gap-2 px-4 pt-4">
      <div className="flex-1 max-w-[250px] p-2 border-r dark:border-r-zinc-700">
        <Suspense fallback={<Sidebar.Skeleton />}>
          <Sidebar lng={params.lng} />
        </Suspense>
      </div>
      <div className="flex-1 max-w-[300px] overflow-auto p-2 no-scrollbar border-r dark:border-zinc-700">
        <Suspense fallback={<FolderMessages.Skeleton />}>
          <FolderMessages name={params.name} lng={params.lng} />
        </Suspense>
      </div>
      <div className="flex-[2] p-2 pb-0">{children}</div>
    </div>
  );
}
